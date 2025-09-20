import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Upload, Brain, FileText, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Document",
    description: "Simply drag and drop your legal document or browse to select files. We support PDF, DOC, DOCX, and TXT formats.",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20"
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Analysis",
    description: "Our advanced AI engine processes your document, analyzing structure, terms, risks, and key obligations in seconds.",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20"
  },
  {
    number: "03",
    icon: FileText,
    title: "Get Insights",
    description: "Receive comprehensive analysis including plain language summaries, risk assessments, and actionable recommendations.",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20"
  }
];

const benefits = [
  "Save hours of manual document review",
  "Identify risks before they become problems",
  "Understand complex terms in plain language",
  "Get negotiation recommendations",
  "Track important dates and deadlines",
  "Access analysis history anytime"
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
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
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-blue-500/20 to-green-500/20 border-blue-500/30 text-white">
            <ArrowRight className="w-4 h-4 mr-2" />
            Simple Process
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Transform complex legal documents into actionable insights in just three simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className={`${step.bgColor} border ${step.borderColor} backdrop-blur-sm hover:scale-105 transition-all duration-300 group`}>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <step.icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-3xl font-bold text-gray-500">{step.number}</span>
                          <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                        </div>
                        <p className="text-gray-400 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex justify-center my-4">
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-8 h-8 text-gray-500 rotate-90" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:pl-8"
          >
            <div className="bg-gradient-to-r from-slate-900/80 to-purple-900/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h3 className="text-3xl font-bold text-white mb-8">Why Choose LegalLens?</h3>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA in Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl"
              >
                <h4 className="text-xl font-bold text-white mb-2">Ready to get started?</h4>
                <p className="text-gray-400 mb-4">Join thousands of professionals who trust LegalLens</p>
                <div className="flex items-center text-purple-400">
                  <span>Start analyzing documents now</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Demo Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">See It In Action</h3>
            <p className="text-gray-400 mb-6">Watch how LegalLens transforms a complex contract into clear insights</p>
            
            {/* Mock Interface Preview */}
            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                  <h4 className="text-purple-400 font-bold mb-2">Document Type</h4>
                  <p className="text-gray-300 text-sm">Service Agreement</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                  <h4 className="text-blue-400 font-bold mb-2">Complexity</h4>
                  <p className="text-gray-300 text-sm">High</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                  <h4 className="text-green-400 font-bold mb-2">Analysis Time</h4>
                  <p className="text-gray-300 text-sm">2.3 seconds</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}