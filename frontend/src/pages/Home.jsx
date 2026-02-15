import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Target, Trophy, BarChart3, ArrowRight, Github, Mail, CheckCircle, Lock } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Target className="w-8 h-8 text-brand-teal" />,
      title: "Phishing Simulations",
      description: "Launch realistic campaigns to test and improve vigilance."
    },
    {
      icon: <Shield className="w-8 h-8 text-brand-teal" />,
      title: "Interactive Training",
      description: "Engaging modules that make security awareness rigorous and fun."
    },
    {
      icon: <Trophy className="w-8 h-8 text-brand-teal" />,
      title: "Gamified Progress",
      description: "Earn badges, climb leaderboards, and become a Security Champion."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-brand-teal" />,
      title: "Advanced Analytics",
      description: "Real-time insights into your organization's security posture."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-light font-sans text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-brand-dark/95 backdrop-blur-md z-50 border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-brand-teal" />
            <span className="text-2xl font-bold text-white tracking-tight">SafeSphere</span>
          </div>
          <div className="flex gap-4 items-center">
            <Link to="/login" className="px-5 py-2 text-gray-300 hover:text-white transition-colors font-medium">
              Login
            </Link>
            <Link to="/signup" className="px-5 py-2 bg-brand-teal text-white rounded-lg hover:bg-teal-500 transition-all hover:shadow-[0_0_20px_rgba(0,191,166,0.3)] font-semibold">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-brand-dark via-[#051a42] to-brand-dark text-white relative overflow-hidden">
        {/* AntiGravity Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-teal/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-brand-teal text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
              </span>
              Next-Gen Security Training
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Secure Your Future with <span className="text-brand-teal">Intelligent Awareness</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-lg">
              Empower your workforce to detect, deny, and defeat cyber threats through gamified simulations and AI-driven insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup" className="px-8 py-4 bg-brand-teal text-white rounded-xl font-bold hover:bg-teal-500 transition-all hover:-translate-y-1 hover:shadow-xl shadow-teal-500/20 text-center flex items-center justify-center gap-2">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/login" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all hover:-translate-y-1 text-center">
                View Demo
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
            >
              {/* Mockup Interface */}
              <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-32 bg-brand-dark/50 rounded-lg flex items-center justify-center border border-white/5">
                  <BarChart3 className="w-16 h-16 text-brand-teal/50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-brand-dark/50 rounded-lg animate-pulse"></div>
                  <div className="h-24 bg-brand-dark/50 rounded-lg animate-pulse delay-75"></div>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-12 -right-12 bg-white p-4 rounded-xl shadow-xl z-20 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Training Complete</p>
                  <p className="text-sm text-gray-500">+500 XP Earned</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-8 -left-8 bg-white p-4 rounded-xl shadow-xl z-20 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Shield className="w-6 h-6 text-brand-dark" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">System Secure</p>
                  <p className="text-sm text-gray-500">No threats detected</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-brand-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">Complete Security Arsenal</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Everything you need to transform your organization's human risk factor into its strongest defense.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-brand-light rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-teal/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] opacity-10 bg-cover bg-center" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to fortify your team?</h2>
          <p className="text-xl text-gray-300 mb-10">Join almost unlimited organizations trusting SafeSphere for their security awareness training.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="px-10 py-4 bg-brand-teal text-white rounded-xl font-bold hover:bg-teal-500 transition-all hover:-translate-y-1 shadow-lg shadow-teal-500/20">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#051a42] text-white py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-brand-teal" />
              <span className="text-xl font-bold">SafeSphere</span>
            </div>
            <p className="text-gray-400 max-w-sm">
              Empowering organizations to build a resilient security culture through data-driven training and simulation.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="#" className="hover:text-brand-teal">Phishing Simulator</Link></li>
              <li><Link to="#" className="hover:text-brand-teal">Content Library</Link></li>
              <li><Link to="#" className="hover:text-brand-teal">Reporting & Analytics</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="#" className="hover:text-brand-teal">About Us</Link></li>
              <li><Link to="#" className="hover:text-brand-teal">Careers</Link></li>
              <li><Link to="#" className="hover:text-brand-teal">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© 2024 SafeSphere Security. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-white">Privacy Policy</Link>
            <Link to="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
