import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { FileText, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';

interface DocumentAnalysisProps {
  analysis: any;
}

export function DocumentAnalysis({ analysis }: DocumentAnalysisProps) {
  const getComplexityColor = (complexity: string) => {
    switch (complexity.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Document Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Document Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">File Name</p>
              <p>{analysis.fileName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Document Type</p>
              <p>{analysis.documentType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Complexity Level</p>
              <Badge className={getComplexityColor(analysis.complexity)}>
                {analysis.complexity}
              </Badge>
            </div>
          </div>
          <Separator className="my-4" />
          <div>
            <p className="text-sm text-muted-foreground mb-2">Summary</p>
            <p>{analysis.summary}</p>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Content */}
      <Tabs defaultValue="plain-language" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="plain-language">Plain Language</TabsTrigger>
          <TabsTrigger value="key-points">Key Points</TabsTrigger>
          <TabsTrigger value="risks">Risks & Concerns</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="plain-language" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Plain Language Explanation</CardTitle>
              <CardDescription>
                Complex legal language translated into everyday terms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-2">What This Document Is About</h4>
                <p className="text-muted-foreground">{analysis.plainLanguage.overview}</p>
              </div>
              <Separator />
              <div>
                <h4 className="mb-2">Your Responsibilities</h4>
                <p className="text-muted-foreground">{analysis.plainLanguage.yourObligations}</p>
              </div>
              <Separator />
              <div>
                <h4 className="mb-2">Their Responsibilities</h4>
                <p className="text-muted-foreground">{analysis.plainLanguage.theirObligations}</p>
              </div>
              <Separator />
              <div>
                <h4 className="mb-2">How to End This Agreement</h4>
                <p className="text-muted-foreground">{analysis.plainLanguage.exitTerms}</p>
              </div>
              <Separator />
              <div>
                <h4 className="mb-2">Important Dates & Timing</h4>
                <p className="text-muted-foreground">{analysis.plainLanguage.importantDates}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="key-points" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Key Points & Terms
              </CardTitle>
              <CardDescription>
                The most important elements you need to know
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {analysis.keyPoints.map((point: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Potential Risks & Concerns
              </CardTitle>
              <CardDescription>
                Areas that may require careful consideration or negotiation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {analysis.risks.map((risk: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
              <Alert className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  These are potential concerns identified by AI analysis. Consider consulting with a legal professional for complex matters.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Recommended Actions
              </CardTitle>
              <CardDescription>
                Suggested steps to protect your interests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {analysis.recommendations.map((recommendation: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}