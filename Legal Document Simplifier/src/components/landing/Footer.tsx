import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  Scale, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Github,
  Shield,
  Lock,
  Award,
  Globe,
  ArrowRight,
  FileText,
  Users,
  Zap,
  Brain
} from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    product: {
      title: "Product",
      links: [
        { name: "Document Analysis", href: "#" },
        { name: "Risk Assessment", href: "#" },
        { name: "Plain Language", href: "#" },
        { name: "API Access", href: "#" },
        { name: "Integrations", href: "#" },
        { name: "Pricing", href: "#" }
      ]
    },
    solutions: {
      title: "Solutions",
      links: [
        { name: "For Law Firms", href: "#" },
        { name: "For Enterprises", href: "#" },
        { name: "For Individuals", href: "#" },
        { name: "Contract Review", href: "#" },
        { name: "Due Diligence", href: "#" },
        { name: "Compliance", href: "#" }
      ]
    },
    resources: {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "Help Center", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Case Studies", href: "#" },
        { name: "Webinars", href: "#" },
        { name: "Legal Templates", href: "#" }
      ]
    },
    company: {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Partners", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Security", href: "#" }
      ]
    }
  };

  const legalLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "Data Processing", href: "#" },
    { name: "Legal Disclaimer", href: "#" },
    { name: "Compliance", href: "#" }
  ];

  const certifications = [
    { name: "SOC 2 Type II", icon: Shield },
    { name: "GDPR Compliant", icon: Lock },
    { name: "ISO 27001", icon: Award },
    { name: "CCPA Ready", icon: Globe }
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="flex items-center gap-3">
                <Scale className="w-8 h-8 text-purple-400" />
                <div>
                  <h3 className="text-2xl font-bold">LegalLens</h3>
                  <p className="text-sm text-gray-400">AI-Powered Legal Intelligence</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                Empowering legal professionals and individuals with AI-driven document analysis, 
                risk assessment, and plain-language translations. Making legal documents accessible to everyone.
              </p>

              {/* Newsletter Signup */}
              <div className="space-y-3">
                <h4 className="font-semibold">Stay Updated</h4>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-purple-400"
                  />
                  <Button 
                    size="sm" 
                    className="bg-purple-600 hover:bg-purple-700 px-4"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-400">
                  Get updates on new features and legal tech insights
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10">
                  <Github className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>

            {/* Navigation Sections */}
            {Object.entries(footerSections).map(([key, section], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h4 className="font-semibold text-white">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p>contact@legallens.ai</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Address</p>
                <p>San Francisco, CA</p>
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <h4 className="font-semibold mb-6 text-center">Security & Compliance</h4>
            <div className="flex flex-wrap justify-center gap-6">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg"
                >
                  <cert.icon className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">{cert.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <Separator className="bg-white/10" />

        {/* Bottom Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <p className="text-gray-400 text-sm">
                © {currentYear} LegalLens AI, Inc. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                This tool is for informational purposes only and does not constitute legal advice.
              </p>
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-6"
            >
              {legalLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>

            {/* Status Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-gray-400">All systems operational</span>
              </div>
              <Badge variant="outline" className="border-green-500/30 text-green-400">
                v2.1.0
              </Badge>
            </motion.div>
          </div>
        </div>

        {/* Additional Features Banner */}
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-t border-white/10">
          <div className="container mx-auto px-4 py-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400"
            >
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-400" />
                <span>AI-Powered Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span>10,000+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-green-400" />
                <span>1M+ Documents Analyzed</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}