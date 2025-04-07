import { Document } from '@/types';
import { notifyUsers } from './notificationService';

interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  fileUrl: string;
  changes: string;
  createdBy: string;
  createdAt: Date;
}

interface DocumentWithVersions extends Document {
  versions: DocumentVersion[];
  title: string;
  clientId: string;
  processId: string;
}

class DocumentService {
  private documents: Map<string, DocumentWithVersions> = new Map();
  private versions: Map<string, DocumentVersion[]> = new Map();

  async createDocument(document: Partial<Document>, userId: string): Promise<Document> {
    if (!document.name || !document.url || !document.clientId || !document.processId) {
      throw new Error('Nome, URL, ID do cliente e ID do processo são obrigatórios');
    }
    
    const newDocument = {
      ...document,
      id: crypto.randomUUID(),
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      name: document.name,
      url: document.url,
      size: document.size || 0,
      type: document.type || '',
      createdBy: userId
    } as Document;

    const version: DocumentVersion = {
      id: crypto.randomUUID(),
      documentId: newDocument.id,
      version: 1,
      fileUrl: newDocument.fileUrl,
      changes: 'Documento criado',
      createdBy: userId,
      createdAt: new Date(),
      clientId: document.clientId,
      processId: document.processId
    };

    this.versions.set(newDocument.id, [version]);
    this.documents.set(newDocument.id, { ...newDocument, versions: [version] });

    // Notificar usuários relevantes
    await this.notifyDocumentChange(newDocument, 'created');

    return newDocument;
  }

  async updateDocument(id: string, updates: Partial<Document>, userId: string, changes: string): Promise<Document> {
    const document = this.documents.get(id);
    if (!document) {
      throw new Error('Documento não encontrado');
    }

    const updatedDocument = {
      ...document,
      ...updates,
      version: document.version + 1,
      updatedAt: new Date()
    };

    const version: DocumentVersion = {
      id: crypto.randomUUID(),
      documentId: id,
      version: updatedDocument.version,
      fileUrl: updatedDocument.fileUrl,
      changes,
      createdBy: userId,
      createdAt: new Date(),
      clientId: document.clientId,
      processId: document.processId
    };

    const documentVersions = this.versions.get(id) || [];
    this.versions.set(id, [...documentVersions, version]);
    this.documents.set(id, { ...updatedDocument, versions: [...documentVersions, version] });

    // Notificar usuários relevantes
    await this.notifyDocumentChange(updatedDocument, 'updated');

    return updatedDocument;
  }

  async getDocumentVersions(id: string): Promise<DocumentVersion[]> {
    return this.versions.get(id) || [];
  }

  async restoreVersion(documentId: string, versionId: string, userId: string): Promise<Document> {
    const document = this.documents.get(documentId);
    const versions = this.versions.get(documentId);

    if (!document || !versions) {
      throw new Error('Documento não encontrado');
    }

    const versionToRestore = versions.find(v => v.id === versionId);
    if (!versionToRestore) {
      throw new Error('Versão não encontrada');
    }

    return this.updateDocument(
      documentId,
      { fileUrl: versionToRestore.fileUrl },
      userId,
      `Restaurada versão ${versionToRestore.version}`
    );
  }

  private async notifyDocumentChange(document: Document, action: 'created' | 'updated') {
    const clientName = await this.getClientName(document.clientId);
    const processTitle = await this.getProcessTitle(document.processId);
    
    const message = action === 'created'
      ? `Novo documento criado para ${clientName} no processo ${processTitle}: ${document.name}`
      : `Documento atualizado para ${clientName} no processo ${processTitle}: ${document.name} (Versão ${document.version})`;

    const notification = {
      title: 'Atualização de Documento',
      message,
      type: 'document',
      data: {
        documentId: document.id,
        version: document.version,
        clientId: document.clientId,
        processId: document.processId
      }
    };

    await notifyUsers(notification);
  }
}

export const documentService = new DocumentService();