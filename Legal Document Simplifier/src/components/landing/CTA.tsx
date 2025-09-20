import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface CTAProps {
  onGetStarted: () => void;
}

export function CTA({ onGetStarted }: CTAProps) {
  return (
    <section className="py-24 bg-gradient-to-r from-purple-900 via-slate-900 to-purple-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-500/20 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Badge className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/30 text-white backdrop-blur-sm text-lg">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Your Free Analysis
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-8 leading-tight"
          >
            Ready to Demystify
            <span className="block text-purple-400">Legal Documents?</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Join thousands of professionals who trust LegalLens to analyze their contracts, 
            identify risks, and make informed decisions.
          </motion.p>

          {/* Benefits Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <div className="flex items-center px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
              <Zap className="w-5 h-5 text-yellow-400 mr-3" />
              <span className="text-white">Instant Results</span>
            </div>
            <div className="flex items-center px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
              <Shield className="w-5 h-5 text-green-400 mr-3" />
              <span className="text-white">Secure & Private</span>
            </div>
            <div className="flex items-center px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
              <Sparkles className="w-5 h-5 text-purple-400 mr-3" />
              <span className="text-white">AI-Powered</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-12 py-6 text-xl shadow-2xl shadow-purple-500/25 border-0 group"
            >
              Start Free Analysis
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-sm text-gray-400">No credit card required • 5-minute setup • Cancel anytime</p>
            
            <div className="flex justify-center items-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm">SOC 2 Compliant</span>
              </div>
              <div className="w-px h-4 bg-gray-600" />
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-sm">GDPR Ready</span>
              </div>
              <div className="w-px h-4 bg-gray-600" />
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-400" />
                <span className="text-sm">256-bit Encryption</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-10 left-10 opacity-10"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-20 h-20 text-purple-400" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-10 right-10 opacity-10"
          animate={{
            y: [0, 30, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Shield className="w-16 h-16 text-cyan-400" />
        </motion.div>
      </div>
    </section>
  );
}