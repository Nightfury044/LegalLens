import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Scale, FileText, Lightbulb, Shield, Bell, Settings, User, LogOut, UserCircle, CreditCard, HelpCircle, Moon, Sun, Monitor, Check, AlertCircle, Info, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  currentView?: 'dashboard' | 'analysis' | 'history';
  onViewChange?: (view: 'dashboard' | 'analysis' | 'history') => void;
}

export function Header({ currentView = 'dashboard', onViewChange }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Analysis Complete',
      message: 'Your service agreement has been successfully analyzed.',
      time: '2 min ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'High Risk Detected',
      message: 'Found 3 high-priority risks in your contract.',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'New Feature Available',
      message: 'Try our enhanced plain language summaries.',
      time: '1 day ago',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <Check className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case 'info': return <Info className="w-4 h-4 text-blue-500" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun className="w-4 h-4" />;
      case 'dark': return <Moon className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const featurePills = [
    { 
      id: 'analysis', 
      icon: FileText, 
      label: 'Analysis', 
      color: 'blue',
      description: 'Comprehensive document analysis',
      view: 'dashboard' as const
    },
    { 
      id: 'simplify', 
      icon: Lightbulb, 
      label: 'Simplify', 
      color: 'yellow',
      description: 'Plain language explanations',
      view: 'analysis' as const
    },
    { 
      id: 'protect', 
      icon: Shield, 
      label: 'Protect', 
      color: 'green',
      description: 'Risk assessment and protection',
      view: 'history' as const
    }
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="border-b border-slate-200/50 dark:border-slate-700/50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-3">
              <motion.div 
                className="p-2 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Scale className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">LegalLens</h1>
                <p className="text-xs text-muted-foreground">AI-Powered Legal Intelligence</p>
              </div>
            </div>
            <Badge 
              variant="secondary" 
              className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 text-blue-700 dark:text-blue-300 border-blue-200/50 dark:border-blue-700/50"
            >
              v2.1
            </Badge>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-6"
          >
            {/* Feature Pills - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-2">
              {featurePills.map((pill, index) => (
                <motion.button
                  key={pill.id}
                  onClick={() => onViewChange?.(pill.view)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm transition-all duration-200 ${
                    currentView === pill.view
                      ? 'bg-white/80 dark:bg-slate-800/80 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 shadow-sm'
                      : 'bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50 text-muted-foreground hover:text-foreground hover:bg-white/70 dark:hover:bg-slate-800/70'
                  }`}
                >
                  <pill.icon className={`w-4 h-4 ${
                    pill.color === 'blue' ? 'text-blue-500' :
                    pill.color === 'yellow' ? 'text-yellow-500' :
                    'text-green-500'
                  }`} />
                  <span>{pill.label}</span>
                </motion.button>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="relative text-muted-foreground hover:text-foreground"
                  >
                    <Bell className="w-4 h-4" />
                    <AnimatePresence>
                      {unreadCount > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                        >
                          {unreadCount}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-96">
                  <SheetHeader>
                    <div className="flex items-center justify-between">
                      <SheetTitle>Notifications</SheetTitle>
                      {unreadCount > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={markAllAsRead}
                          className="text-xs"
                        >
                          Mark all read
                        </Button>
                      )}
                    </div>
                    <SheetDescription>
                      Stay updated with your document analysis progress
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="mt-6 space-y-4">
                    <AnimatePresence>
                      {notifications.map((notification, index) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-4 rounded-lg border transition-all duration-200 ${
                            notification.read
                              ? 'bg-slate-50/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm'
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm text-slate-900 dark:text-slate-100">
                                {notification.title}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Settings */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>
                      Customize your LegalLens experience
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6 py-4">
                    {/* Theme Settings */}
                    <div className="space-y-3">
                      <h4 className="font-medium">Appearance</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getThemeIcon()}
                          <span className="text-sm">Theme</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {['light', 'dark', 'system'].map((t) => (
                            <Button
                              key={t}
                              variant={theme === t ? 'default' : 'ghost'}
                              size="sm"
                              onClick={() => setTheme(t as any)}
                              className="text-xs px-2"
                            >
                              {t}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Analysis Settings */}
                    <div className="space-y-3">
                      <h4 className="font-medium">Analysis Preferences</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm">Auto-save analyses</span>
                            <p className="text-xs text-muted-foreground">Automatically save document analyses</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm">Email notifications</span>
                            <p className="text-xs text-muted-foreground">Get notified when analysis completes</p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm">High-risk alerts</span>
                            <p className="text-xs text-muted-foreground">Immediate alerts for high-risk terms</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Privacy Settings */}
                    <div className="space-y-3">
                      <h4 className="font-medium">Privacy & Security</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm">Analytics tracking</span>
                            <p className="text-xs text-muted-foreground">Help improve our services</p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm">Auto-delete documents</span>
                            <p className="text-xs text-muted-foreground">Delete uploads after 30 days</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* User Account */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div>
                      <p className="font-medium">Demo User</p>
                      <p className="text-xs text-muted-foreground">demo@legallens.ai</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem className="gap-2">
                    <UserCircle className="w-4 h-4" />
                    Profile Settings
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem className="gap-2">
                    <CreditCard className="w-4 h-4" />
                    Billing & Plans
                    <Badge variant="secondary" className="ml-auto text-xs">
                      Pro
                    </Badge>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem className="gap-2">
                    <Zap className="w-4 h-4" />
                    API Access
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem className="gap-2">
                    <HelpCircle className="w-4 h-4" />
                    Help & Support
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem className="gap-2 text-red-600 dark:text-red-400">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}