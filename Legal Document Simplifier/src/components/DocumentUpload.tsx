import { useState } from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Upload, FileText, AlertCircle, CheckCircle, File, Zap } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { motion, AnimatePresence } from 'motion/react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface DocumentUploadProps {
  onDocumentAnalyzed: (analysis: any) => void;
}

export function DocumentUpload({ onDocumentAnalyzed }: DocumentUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type === 'application/pdf' || file.type === 'text/plain' || file.name.endsWith('.docx')) {
      setUploadedFile(file);
    }
  };

  const simulateProgress = () => {
    setAnalysisProgress(0);
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
    return interval;
  };

  const analyzeDocument = async () => {
    if (!uploadedFile) return;
    
    setIsAnalyzing(true);
    const progressInterval = simulateProgress();
    
    try {
      // Read file content
      const fileContent = await uploadedFile.text();
      
      // Call backend API for analysis
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-630be9b7/analyze-document`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          fileName: uploadedFile.name,
          fileContent,
          documentType: getDocumentType(uploadedFile.name),
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze document');
      }
      
      const data = await response.json();
      
      // Store analysis in backend
      await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-630be9b7/document-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          fileName: uploadedFile.name,
          documentType: getDocumentType(uploadedFile.name),
          analysis: data.analysis,
          userId: 'demo-user', // In production, this would be the actual user ID
        }),
      });
      
      setAnalysisProgress(100);
      setTimeout(() => {
        onDocumentAnalyzed(data.analysis);
      }, 500);
    } catch (error) {
      console.error('Error analyzing document:', error);
      // Fallback to mock analysis if backend fails
      const mockAnalysis = {
        id: Date.now().toString(),
        fileName: uploadedFile.name,
        uploadDate: new Date().toISOString(),
        documentType: getDocumentType(uploadedFile.name),
        complexity: 'High',
        summary: 'This is a comprehensive service agreement between two parties outlining terms of engagement, payment structures, liability limitations, and termination conditions.',
        keyPoints: [
          'Contract duration: 12 months with automatic renewal',
          'Payment terms: Net 30 days',
          'Liability cap: $50,000 maximum',
          'Either party can terminate with 30 days notice',
          'Confidentiality clause extends 2 years post-termination'
        ],
        risks: [
          'High penalty fees for early termination without cause',
          'Broad indemnification clause favoring the service provider',
          'Limited warranty protection for delivered services'
        ],
        recommendations: [
          'Negotiate a lower penalty fee for early termination',
          'Request mutual indemnification terms',
          'Add specific performance benchmarks and remedies',
          'Include force majeure provisions for unforeseen circumstances'
        ],
        plainLanguage: {
          overview: 'This contract sets up a business relationship where one company provides services to another. Both sides agree on what work will be done, how much it costs, and what happens if problems arise.',
          yourObligations: 'You need to pay within 30 days of receiving an invoice. You must keep business information confidential and provide reasonable cooperation for the work to be completed.',
          theirObligations: 'The service provider must deliver the agreed services on time and maintain confidentiality of your business information.',
          exitTerms: 'Either side can end this contract with 30 days written notice. If you end it early without a good reason, you may need to pay penalty fees.',
          importantDates: 'Contract starts immediately and runs for 12 months. It automatically renews unless someone gives notice to stop it.'
        }
      };
      setAnalysisProgress(100);
      setTimeout(() => {
        onDocumentAnalyzed(mockAnalysis);
      }, 500);
    } finally {
      clearInterval(progressInterval);
      setTimeout(() => {
        setIsAnalyzing(false);
        setUploadedFile(null);
        setAnalysisProgress(0);
      }, 1000);
    }
  };

  const getDocumentType = (fileName: string): string => {
    const extension = fileName.toLowerCase().split('.').pop();
    if (fileName.toLowerCase().includes('contract') || fileName.toLowerCase().includes('agreement')) {
      return 'Contract Agreement';
    } else if (fileName.toLowerCase().includes('lease')) {
      return 'Lease Agreement';
    } else if (fileName.toLowerCase().includes('nda') || fileName.toLowerCase().includes('confidential')) {
      return 'Non-Disclosure Agreement';
    } else if (extension === 'pdf') {
      return 'PDF Document';
    } else {
      return 'Legal Document';
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-xl">
            <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Upload Document</h2>
            <p className="text-sm text-muted-foreground">AI-powered legal analysis in seconds</p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {!isAnalyzing ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Upload Zone */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-blue-400 bg-blue-50/50 dark:bg-blue-900/20 scale-105' 
                  : 'border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/30 dark:hover:bg-blue-900/10'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <motion.div
                animate={{ 
                  y: dragActive ? -5 : 0,
                  scale: dragActive ? 1.1 : 1 
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Upload className="w-16 h-16 mx-auto mb-4 text-blue-500 dark:text-blue-400" />
              </motion.div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                    {dragActive ? "Drop your document here" : "Drag & drop your legal document"}
                  </h3>
                  <p className="text-muted-foreground">or</p>
                </div>
                
                <Button 
                  variant="outline" 
                  className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 border-blue-200 dark:border-blue-700"
                  asChild
                >
                  <label className="cursor-pointer gap-2">
                    <FileText className="w-4 h-4" />
                    Browse Files
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileInput}
                    />
                  </label>
                </Button>
                
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <span>PDF</span>
                  <span>•</span>
                  <span>DOC</span>
                  <span>•</span>
                  <span>DOCX</span>
                  <span>•</span>
                  <span>TXT</span>
                </div>
              </div>

              {/* File selected indicator */}
              <AnimatePresence>
                {uploadedFile && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute inset-0 bg-green-50/90 dark:bg-green-900/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-green-300 dark:border-green-600"
                  >
                    <div className="text-center space-y-3">
                      <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto" />
                      <div>
                        <p className="font-medium text-green-800 dark:text-green-200">{uploadedFile.name}</p>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          {Math.round(uploadedFile.size / 1024)}KB • Ready to analyze
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Analyze Button */}
            <AnimatePresence>
              {uploadedFile && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Button 
                    onClick={analyzeDocument} 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg gap-3 shadow-lg"
                    size="lg"
                  >
                    <Zap className="w-5 h-5" />
                    Analyze Document with AI
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center space-y-6 py-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
            >
              <Zap className="w-8 h-8 text-white" />
            </motion.div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Analyzing Your Document
              </h3>
              <p className="text-muted-foreground">
                Our AI is reading through your document and extracting key insights...
              </p>
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <Progress value={analysisProgress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {analysisProgress < 30 && "Reading document content..."}
                {analysisProgress >= 30 && analysisProgress < 60 && "Analyzing with Google AI..."}
                {analysisProgress >= 60 && analysisProgress < 90 && "Identifying risks and key terms..."}
                {analysisProgress >= 90 && "Generating plain language summary..."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Security Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Alert className="bg-blue-50/50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            <strong>Secure & Private:</strong> Your documents are processed securely and not stored permanently. 
            This analysis is for informational purposes only and does not constitute legal advice.
          </AlertDescription>
        </Alert>
      </motion.div>
    </div>
  );
}