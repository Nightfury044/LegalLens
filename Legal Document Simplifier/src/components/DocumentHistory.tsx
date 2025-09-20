import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { FileText, Calendar, Eye, Trash2, History, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { motion, AnimatePresence } from 'motion/react';

interface DocumentHistoryProps {
  analyses: any[];
  onSelectAnalysis: (analysis: any) => void;
  onDeleteAnalysis: (id: string) => void;
  isLoading?: boolean;
}

export function DocumentHistory({ analyses, onSelectAnalysis, onDeleteAnalysis, isLoading = false }: DocumentHistoryProps) {
  const getComplexityColor = (complexity: string) => {
    switch (complexity.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="h-full">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-lg">
              <History className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recent Analysis</h3>
              <p className="text-sm text-muted-foreground">Loading your document history...</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-white/30 dark:bg-slate-700/30 rounded-xl border border-slate-200/30 dark:border-slate-600/30">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2 mb-2" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (analyses.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-lg">
              <History className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recent Analysis</h3>
              <p className="text-sm text-muted-foreground">Your document history</p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex items-center justify-center"
        >
          <div className="text-center space-y-4 py-8">
            <div className="p-4 bg-slate-100/50 dark:bg-slate-800/50 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">No Documents Yet</h4>
              <p className="text-sm text-muted-foreground">
                Upload your first legal document to start analyzing and it will appear here.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-lg">
            <History className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recent Analysis</h3>
            <p className="text-sm text-muted-foreground">{analyses.length} document{analyses.length !== 1 ? 's' : ''} analyzed</p>
          </div>
        </div>
      </motion.div>

      {/* Document List */}
      <div className="flex-1 space-y-3 overflow-y-auto">
        <AnimatePresence>
          {analyses.map((analysis, index) => (
            <motion.div
              key={analysis.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-white/30 dark:bg-slate-700/30 backdrop-blur-sm border border-slate-200/30 dark:border-slate-600/30 rounded-xl hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all duration-200 cursor-pointer group"
              onClick={() => onSelectAnalysis(analysis)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  {/* File Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-blue-500/10 rounded-lg">
                      <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="font-medium text-slate-900 dark:text-slate-100 truncate text-sm">
                      {analysis.fileName}
                    </h4>
                  </div>

                  {/* Document Type & Complexity */}
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {analysis.documentType}
                    </Badge>
                    <Badge className={`${getComplexityColor(analysis.complexity)} text-xs`}>
                      {analysis.complexity}
                    </Badge>
                    {analysis.analysis?.risks?.length > 0 && (
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-500" />
                        <span className="text-xs text-amber-600 dark:text-amber-400">
                          {analysis.analysis.risks.length} risk{analysis.analysis.risks.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {formatDate(analysis.uploadDate)}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectAnalysis(analysis);
                    }}
                    className="h-8 w-8 p-0 hover:bg-blue-500/10"
                  >
                    <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteAnalysis(analysis.id);
                    }}
                    className="h-8 w-8 p-0 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}