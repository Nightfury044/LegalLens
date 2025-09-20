import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Scale, ArrowRight, Sparkles, Zap, Shield, Star, Users, Globe, CheckCircle, TrendingUp, Brain, Lock, FileText, Sun, Moon, Monitor } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../../contexts/ThemeContext';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  const { theme, setTheme } = useTheme();
  
  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun className="w-4 h-4" />;
      case 'dark': return <Moon className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'system'] as const;
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Primary gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/30 via-purple-600/25 to-indigo-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1.1, 1],
            opacity: [0.4, 0.7, 0.5, 0.4],
            x: [0, 30, -20, 0],
            y: [0, -20, 10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/3 w-[500px] h-[500px] bg-gradient-to-tl from-cyan-500/25 via-blue-500/20 to-purple-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.4, 1.2],
            opacity: [0.3, 0.6, 0.4, 0.3],
            x: [0, -40, 25, 0],
            y: [0, 15, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-violet-500/20 via-purple-500/15 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.25, 0.5, 0.35, 0.25],
            rotate: [0, 120, 240, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Secondary accent orbs */}
        <motion.div
          className="absolute top-1/3 right-1/6 w-[200px] h-[200px] bg-gradient-to-br from-emerald-400/15 to-teal-500/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/6 w-[300px] h-[300px] bg-gradient-to-tr from-orange-400/10 via-amber-400/8 to-yellow-400/6 rounded-full blur-2xl"
          animate={{
            scale: [1.1, 1, 1.3, 1.1],
            opacity: [0.15, 0.3, 0.2, 0.15],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Enhanced Grid Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
      </div>

      {/* Floating Legal Icons */}
      <motion.div
        className="absolute top-20 left-16 opacity-10"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Scale className="w-20 h-20 text-blue-400" />
      </motion.div>
      
      <motion.div
        className="absolute top-32 right-20 opacity-8"
        animate={{
          y: [0, 25, 0],
          rotate: [0, -8, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Brain className="w-16 h-16 text-purple-400" />
      </motion.div>

      <motion.div
        className="absolute bottom-24 right-16 opacity-12"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Lock className="w-14 h-14 text-cyan-400" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-20 opacity-10"
        animate={{
          y: [0, 20, 0],
          x: [0, 10, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Sparkles className="w-18 h-18 text-indigo-400" />
      </motion.div>
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-6xl mx-auto"
        >
          {/* Enhanced Badge with Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="mb-12"
          >
            {/* Trust metrics */}
            <div className="flex items-center justify-center gap-8 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span>50K+ Users</span>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-400" />
                <span>Global Enterprise</span>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            className="mb-12"
          >
            <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-bold leading-none mb-8">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Legal
              </span>
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Lens
              </span>
            </h1>
            
            <div className="flex items-center justify-center mb-8">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl backdrop-blur-sm border border-white/10 mr-6"
              >
                <Scale className="w-12 h-12 text-blue-400" />
              </motion.div>
              <div className="text-left">
                <h2 className="text-3xl md:text-4xl font-semibold text-white/90 mb-2">
                  AI-Powered Legal Intelligence
                </h2>
                <p className="text-xl text-white/60">
                  Transform legal complexity into strategic clarity
                </p>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
            className="mb-16"
          >
            <p className="text-2xl md:text-3xl text-white/80 mb-8 max-w-5xl mx-auto leading-relaxed font-light">
              Revolutionize legal document analysis with enterprise-grade AI that delivers
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-medium"> instant insights</span>,
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-medium"> identifies critical risks</span>, and
              <span className="text-transparent bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text font-medium"> empowers confident decisions</span>.
            </p>
            
            <p className="text-lg text-white/60 max-w-3xl mx-auto">
              Trusted by Fortune 500 companies, law firms, and legal professionals worldwide to streamline contract analysis and accelerate deal velocity.
            </p>
          </motion.div>

          {/* Enhanced Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto"
          >
            {[
              { icon: Zap, label: "Instant Analysis", description: "AI processes documents in seconds", color: "from-yellow-400 to-orange-500" },
              { icon: Shield, label: "Risk Detection", description: "Identifies critical legal risks", color: "from-green-400 to-emerald-500" },
              { icon: Brain, label: "Smart Insights", description: "Plain language explanations", color: "from-blue-400 to-purple-500" }
            ].map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <div className="relative p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:border-white/20">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.label}</h3>
                  <p className="text-sm text-white/60">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 1, ease: "easeOut" }}
            className="mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={onGetStarted}
                size="lg"
                className="relative px-12 py-8 text-xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white border-0 rounded-2xl shadow-2xl shadow-blue-500/25 group overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="relative z-10 flex items-center">
                  Start Free Analysis
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Button>
            </motion.div>
            
            <p className="text-white/50 mt-4 text-sm">
              No credit card required • Enterprise security • Instant results
            </p>
          </motion.div>

          {/* Enhanced Trust Indicators & Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="space-y-8"
          >
            <p className="text-white/40 text-sm uppercase tracking-wider">
              Trusted by Legal Professionals Worldwide
            </p>
            
            {/* Enhanced Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { value: "2M+", label: "Documents Analyzed", icon: FileText },
                { value: "500K+", label: "Hours Saved", icon: TrendingUp },
                { value: "99.8%", label: "Accuracy Rate", icon: CheckCircle },
                { value: "50+", label: "Countries", icon: Globe }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7 + index * 0.1, duration: 0.8 }}
                  className="text-center group"
                >
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:bg-white/10 transition-colors duration-300">
                      <stat.icon className="w-5 h-5 text-white/60" />
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/50 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Professional Certifications */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-8 opacity-40">
              {['SOC 2 Type II', 'GDPR Compliant', 'ISO 27001', 'Enterprise Security'].map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 2 + index * 0.1 }}
                  className="flex items-center gap-2 text-white/60 text-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{cert}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}