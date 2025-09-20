import { useState, useEffect } from 'react';
import { LandingPage } from './components/landing/LandingPage';
import { Header } from './components/Header';
import { DocumentUpload } from './components/DocumentUpload';
import { DocumentAnalysis } from './components/DocumentAnalysis';
import { DocumentHistory } from './components/DocumentHistory';
import { LegalDisclaimer } from './components/LegalDisclaimer';
import { ThemeProvider } from './contexts/ThemeContext';
import { Button } from './components/ui/button';
import { ArrowLeft, FileText, Clock, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { projectId, publicAnonKey } from './utils/supabase/info';

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [currentAnalysis, setCurrentAnalysis] = useState<any>(null);
  const [documentHistory, setDocumentHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'analysis' | 'history'>('dashboard');

  // Load document history when entering the app
  useEffect(() => {
    if (!showLanding) {
      loadDocumentHistory();
    }
  }, [showLanding]);

  const loadDocumentHistory = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-630be9b7/document-analyses/demo-user`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setDocumentHistory(data.analyses || []);
      }
    } catch (error) {
      console.error('Error loading document history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  const handleBackToLanding = () => {
    setShowLanding(true);
    setCurrentAnalysis(null);
    setCurrentView('dashboard');
  };

  const handleDocumentAnalyzed = (analysis: any) => {
    setCurrentAnalysis(analysis);
    setDocumentHistory(prev => [analysis, ...prev]);
    setCurrentView('analysis');
  };

  const handleSelectAnalysis = (analysis: any) => {
    setCurrentAnalysis(analysis);
    setCurrentView('analysis');
  };

  const handleDeleteAnalysis = async (id: string) => {
    try {
      await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-630be9b7/document-analysis/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      
      setDocumentHistory(prev => prev.filter(doc => doc.id !== id));
      if (currentAnalysis?.id === id) {
        setCurrentAnalysis(null);
        setCurrentView('dashboard');
      }
    } catch (error) {
      console.error('Error deleting analysis:', error);
    }
  };

  const handleBackToUpload = () => {
    setCurrentAnalysis(null);
    setCurrentView('dashboard');
  };

  const handleViewChange = (view: 'dashboard' | 'analysis' | 'history') => {
    setCurrentView(view);
    if (view === 'dashboard') {
      setCurrentAnalysis(null);
    } else if (view === 'history' && documentHistory.length > 0) {
      // Optionally select the most recent analysis when switching to history view
      // setCurrentAnalysis(documentHistory[0]);
    }
  };

  // Show landing page
  if (showLanding) {
    return (
      <ThemeProvider>
        <LandingPage onGetStarted={handleGetStarted} />
      </ThemeProvider>
    );
  }

  // Dashboard statistics
  const stats = [
    {
      icon: FileText,
      label: "Documents Analyzed",
      value: documentHistory.length.toString(),
      trend: "+12% this month"
    },
    {
      icon: Clock,
      label: "Average Processing Time",
      value: "2.3s",
      trend: "-15% faster"
    },
    {
      icon: TrendingUp,
      label: "Risk Alerts Identified",
      value: documentHistory.reduce((acc, doc) => acc + (doc.analysis?.risks?.length || 0), 0).toString(),
      trend: "3 high priority"
    }
  ];

  // Show main application
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        <Header 
          currentView={currentView}
          onViewChange={handleViewChange}
        />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Button 
                variant="ghost" 
                onClick={handleBackToLanding}
                className="mb-4 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </motion.div>

            <AnimatePresence mode="wait">
              {currentView === 'dashboard' && !currentAnalysis ? (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  {/* Header Section */}
                  <div className="text-center space-y-4">
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent"
                    >
                      Legal Document Intelligence
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-lg text-muted-foreground max-w-3xl mx-auto"
                    >
                      Upload your legal documents for AI-powered analysis, risk assessment, and plain-language explanations
                    </motion.p>
                  </div>

                  {/* Statistics Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                  >
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-xl">
                            <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                            {stat.trend}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            {stat.value}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {stat.label}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Legal Disclaimer */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <LegalDisclaimer />
                  </motion.div>
                  
                  {/* Main Content Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="grid grid-cols-1 xl:grid-cols-5 gap-8"
                  >
                    {/* Upload Section */}
                    <motion.div 
                      className="xl:col-span-3"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-8 shadow-xl">
                        <DocumentUpload onDocumentAnalyzed={handleDocumentAnalyzed} />
                      </div>
                    </motion.div>
                    
                    {/* History Section */}
                    <motion.div 
                      className="xl:col-span-2"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-6 shadow-xl h-full">
                        <DocumentHistory 
                          analyses={documentHistory}
                          onSelectAnalysis={handleSelectAnalysis}
                          onDeleteAnalysis={handleDeleteAnalysis}
                          isLoading={isLoading}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ) : currentView === 'history' ? (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  {/* Header Section */}
                  <div className="text-center space-y-4">
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent"
                    >
                      Document History
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-lg text-muted-foreground max-w-3xl mx-auto"
                    >
                      Review and manage your previously analyzed legal documents
                    </motion.p>
                  </div>

                  {/* Full History View */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-8 shadow-xl"
                  >
                    <DocumentHistory 
                      analyses={documentHistory}
                      onSelectAnalysis={handleSelectAnalysis}
                      onDeleteAnalysis={handleDeleteAnalysis}
                      isLoading={isLoading}
                    />
                  </motion.div>
                </motion.div>
              ) : currentAnalysis ? (
                <motion.div
                  key="analysis"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  {/* Back Button */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Button 
                      variant="ghost" 
                      onClick={handleBackToUpload}
                      className="mb-4 text-muted-foreground hover:text-foreground"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Dashboard
                    </Button>
                  </motion.div>
                  
                  {/* Analysis Results */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-8 shadow-xl"
                  >
                    <DocumentAnalysis analysis={currentAnalysis} />
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </main>
        
        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="border-t border-slate-200/50 dark:border-slate-700/50 mt-16 py-8 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm"
        >
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>© 2025 LegalLens. This tool is for informational purposes only and does not provide legal advice.</p>
            <p className="mt-2">Always consult with qualified legal professionals for important legal matters.</p>
          </div>
        </motion.footer>
      </div>
    </ThemeProvider>
  );
}