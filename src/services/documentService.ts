import { Document } from '@/types';
import { notifyUsers } from './notificationService';
import { validateUUID } from '../lib/utils';

interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  fileUrl: string;
  changes: string;
  createdBy: string;
  createdAt: Date;
  clientId: string;
  processId: string;
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
    
    if (!validateUUID(userId) || !validateUUID(document.clientId) || !validateUUID(document.processId)) {
      throw new Error('IDs inválidos');
    }
    
    const newDocument: DocumentWithVersions = {
      id: crypto.randomUUID(),
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: document.name.trim(),
      url: document.url.trim(),
      size: document.size || 0,
      type: ((document.type || 'document') as "document" | "action" | "precedent" | "strategy"),
      createdBy: userId,
      title: document.name.trim(),
      versions: [],
      // Explicitly assign these required properties
      clientId: document.clientId,
      processId: document.processId,
      // Include any other required properties from Document
      fileUrl: document.fileUrl || document.url.trim()
    };

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
    if (!id || !validateUUID(id)) {
      throw new Error('ID do documento inválido');
    }
    
    if (!userId || !validateUUID(userId)) {
      throw new Error('ID do usuário inválido');
    }
    
    if (!changes?.trim()) {
      throw new Error('Descrição das alterações é obrigatória');
    }
    
    const document = this.documents.get(id);
    if (!document) {
      throw new Error('Documento não encontrado');
    }

    // In updateDocument method
    const updatedDocument = {
      ...document,
      ...updates,
      version: document.version + 1,
      updatedAt: new Date(), // Changed back to Date object
      name: updates.name ? updates.name.trim() : document.name,
      url: updates.url ? updates.url.trim() : document.url,
      type: updates.type ? 
        (updates.type as "document" | "action" | "precedent" | "strategy") : 
        document.type
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
    if (!documentId || !versionId || !userId || 
        !validateUUID(documentId) || !validateUUID(versionId) || !validateUUID(userId)) {
      throw new Error('IDs inválidos');
    }
    
    const document = this.documents.get(documentId);
    const versions = this.versions.get(documentId);

    if (!document || !versions) {
      throw new Error('Documento não encontrado');
    }

    const versionToRestore = versions.find(v => v.id === versionId);
    if (!versionToRestore) {
      throw new Error('Versão não encontrada');
    }

    if (!versionToRestore.fileUrl) {
      throw new Error('URL do arquivo da versão não está disponível');
    }

    return this.updateDocument(
      documentId,
      { fileUrl: versionToRestore.fileUrl },
      userId,
      `Restaurada versão ${versionToRestore.version}`
    );
  }

  private async getClientName(clientId: string): Promise<string> {
    // TODO: Implement actual client name lookup
    return `Client-${clientId.substring(0, 8)}`;
  }

  private async getProcessTitle(processId: string): Promise<string> {
    // TODO: Implement actual process title lookup
    return `Process-${processId.substring(0, 8)}`;
  }

  private async notifyDocumentChange(document: Document, action: 'created' | 'updated') {
    if (!document?.id || !document.clientId || !document.processId) {
      console.error('Dados do documento incompletos para notificação');
      return;
    }
    
    try {
      const clientName = await this.getClientName(document.clientId);
      const processTitle = await this.getProcessTitle(document.processId);
      
      const message = action === 'created'
        ? `Novo documento criado para ${clientName} no processo ${processTitle}: ${document.name}`
        : `Documento atualizado para ${clientName} no processo ${processTitle}: ${document.name} (Versão ${document.version})`;

      const notification = {
        title: 'Atualização de Documento',
        message,
        type: 'document' as 'document', // Explicitly type as literal 'document'
        data: {
          documentId: document.id,
          version: document.version,
          clientId: document.clientId,
          processId: document.processId
        }
      };

      await notifyUsers(notification);
    } catch (error) {
      console.error('Falha ao enviar notificação:', error);
    }
  }

  async getDocuments(): Promise<Document[]> {
    return Array.from(this.documents.values());
  }
}

export const documentService = new DocumentService();

// Add a named export for getDocuments that uses the instance method
export const getDocuments = (): Promise<Document[]> => {
  return documentService.getDocuments();
};