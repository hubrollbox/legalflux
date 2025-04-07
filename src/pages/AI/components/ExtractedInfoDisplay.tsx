import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExtractedInfo } from '../hooks/useDocumentExtraction';

interface ExtractedInfoDisplayProps {
  extractedInfo: ExtractedInfo;
}

const ExtractedInfoDisplay = ({ extractedInfo }: ExtractedInfoDisplayProps) => {
  if (!extractedInfo) return null;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">
            {extractedInfo.documentType}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Partes envolvidas */}
          {extractedInfo.parties.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Partes envolvidas</h3>
              <ul className="list-disc pl-5 space-y-1">
                {extractedInfo.parties.map((party, index) => (
                  <li key={index} className="text-sm">{party}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Datas importantes */}
          {extractedInfo.dates.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Datas importantes</h3>
              <div className="flex flex-wrap gap-2">
                {extractedInfo.dates.map((date, index) => (
                  <Badge key={index} variant="outline">{date}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Termos-chave */}
          {extractedInfo.keyTerms.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Termos-chave</h3>
              <div className="flex flex-wrap gap-2">
                {extractedInfo.keyTerms.map((term, index) => (
                  <Badge key={index} variant="secondary">{term}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Obrigações principais */}
          {extractedInfo.obligations.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Obrigações principais</h3>
              <ul className="list-disc pl-5 space-y-1">
                {extractedInfo.obligations.map((obligation, index) => (
                  <li key={index} className="text-sm">{obligation}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Riscos potenciais */}
          {extractedInfo.risks.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Riscos potenciais</h3>
              <ul className="list-disc pl-5 space-y-1">
                {extractedInfo.risks.map((risk, index) => (
                  <li key={index} className="text-sm text-destructive">{risk}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExtractedInfoDisplay;