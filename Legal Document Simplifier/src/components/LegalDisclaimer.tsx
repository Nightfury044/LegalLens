import { Alert, AlertDescription } from './ui/alert';
import { AlertTriangle, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export function LegalDisclaimer() {
  return (
    <Card className="border-orange-200 bg-orange-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-800">
          <AlertTriangle className="w-5 h-5" />
          Important Legal Disclaimer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>This tool provides informational analysis only and does not constitute legal advice.</strong>
          </AlertDescription>
        </Alert>
        
        <div className="space-y-3 text-sm text-muted-foreground">
          <div>
            <strong>AI Analysis Limitations:</strong>
            <ul className="mt-1 ml-4 list-disc space-y-1">
              <li>AI may miss nuanced legal interpretations</li>
              <li>Analysis is based on general legal principles</li>
              <li>Cannot replace professional legal consultation</li>
            </ul>
          </div>
          
          <div>
            <strong>Recommendations:</strong>
            <ul className="mt-1 ml-4 list-disc space-y-1">
              <li>Always consult with a qualified attorney for legal matters</li>
              <li>Use this analysis as a starting point for understanding</li>
              <li>Verify any concerns with legal professionals</li>
            </ul>
          </div>
          
          <div>
            <strong>Data Security:</strong>
            <ul className="mt-1 ml-4 list-disc space-y-1">
              <li>Documents are processed temporarily and not permanently stored</li>
              <li>Do not upload documents containing sensitive personal information</li>
              <li>This tool is not suitable for confidential legal matters</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}