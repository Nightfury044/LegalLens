import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Brain, 
  FileText, 
  Shield, 
  Zap, 
  Target, 
  Clock, 
  Eye, 
  CheckCircle,
  TrendingUp,
  Users,
  Lock,
  Lightbulb
} from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning algorithms analyze complex legal documents with unprecedented accuracy and speed.",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20"
  },
  {
    icon: FileText,
    title: "Plain Language Translation",
    description: "Convert complex legalese into clear, understandable language that anyone can comprehend.",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20"
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    description: "Identify potential risks, liabilities, and unfavorable terms before you sign anything.",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20"
  },
  {
    icon: Zap,
    title: "Instant Processing",
    description: "Get comprehensive analysis in seconds, not hours. Upload and receive insights immediately.",
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20"
  },
  {
    icon: Target,
    title: "Key Point Extraction",
    description: "Automatically identify and highlight the most important terms, dates, and obligations.",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20"
  },
  {
    icon: Lightbulb,
    title: "Smart Recommendations",
    description: "Receive actionable suggestions for negotiation points and contract improvements.",
    color: "from-cyan-500 to-cyan-600",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20"
  }
];

const stats = [
  { icon: Clock, value: "99.9%", label: "Time Saved", color: "text-purple-400" },
  { icon: Eye, value: "10K+", label: "Documents Analyzed", color: "text-blue-400" },
  { icon: CheckCircle, value: "99.8%", label: "Accuracy Rate", color: "text-green-400" },
  { icon: Users, value: "1K+", label: "Happy Users", color: "text-yellow-400" }
];

export function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/30 text-white">
            <TrendingUp className="w-4 h-4 mr-2" />
            Advanced Capabilities
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            Powerful Features for
            <span className="block text-purple-400">Legal Intelligence</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Harness the power of AI to transform how you understand and interact with legal documents
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`${feature.bgColor} border ${feature.borderColor} backdrop-blur-sm hover:scale-105 transition-all duration-300 group`}>
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 backdrop-blur-sm border border-white/10 rounded-3xl p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Trusted by Legal Professionals</h3>
            <p className="text-gray-400">Real results from real users worldwide</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-full">
            <Lock className="w-5 h-5 text-green-400 mr-3" />
            <span className="text-green-300">Bank-level security • SOC 2 compliant • GDPR ready</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}