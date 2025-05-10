import React, { useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

interface DocumentTabProps {
  documents: any[];
}

const DocumentTab: React.FC<DocumentTabProps> = ({ documents }) => {
  const messagesEndRef = useRef<HTMLDivElement>(document.createElement('div'));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [documents]);

  return (
    <div className="flex flex-col h-full">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Documentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input type="text" placeholder="Pesquisar documentos..." className="flex-1" />
            <Button variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Pesquisar
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="overflow-y-auto flex-1">
        {documents.map((document) => (
          <Card key={document.id} className="mb-4">
            <CardHeader>
              <CardTitle>{document.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{document.description}</p>
            </CardContent>
          </Card>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default DocumentTab;
