import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Clock } from 'lucide-react';
import { CLINIC_INFO, ROUTES } from '../../utils/constants';
import Button from '../common/Button';
import Logo from '../common/Logo';

const Hero: React.FC = () => {
  const features = [
    {
      icon: <Star className="w-5 h-5" />,
      text: 'Professional Service',
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: 'Safe & Hygienic',
    },
    {
      icon: <Clock className="w-5 h-5" />,
      text: 'Quick & Efficient',
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-pink-50 via-white to-purple-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
            >
              Your Beauty,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                Our Priority
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl"
            >
              Experience professional laser body shaving and beauty treatments in a 
              luxurious, hygienic environment. Book your appointment today and discover 
              the difference quality care makes.
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6"
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-sm text-gray-600"
                >
                  <div className="text-pink-500">{feature.icon}</div>
                  <span>{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to={ROUTES.SIGNUP}>
                <Button size="lg" className="group">
                  Book Appointment
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="#services">
                <Button variant="outline" size="lg">
                  View Services
                </Button>
              </Link>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-8 text-sm text-gray-500"
            >
              <p>Call us: {CLINIC_INFO.PHONE}</p>
              <p>Email: {CLINIC_INFO.EMAIL}</p>
            </motion.div>
          </motion.div>

          {/* Right Content - Logo and Branding */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative z-10">
              {/* Main Logo Display */}
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl p-12 shadow-2xl">
                <div className="flex flex-col items-center justify-center space-y-6">
                  {/* Large Animated Logo */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 1, type: "spring", stiffness: 200, delay: 0.5 }}
                  >
                    <Logo size="xl" animated={true} />
                  </motion.div>
                  
                  {/* Clinic Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="text-center"
                  >
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                      {CLINIC_INFO.NAME}
                    </h2>
                    <p className="text-lg text-pink-600 font-medium mb-1">
                      {CLINIC_INFO.TAGLINE}
                    </p>
                    <p className="text-sm text-gray-600">
                      Professional Beauty Clinic
                    </p>
                  </motion.div>
                  
                  {/* Decorative Elements */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="flex space-x-4"
                  >
                    <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                  </motion.div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg"
              >
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg"
              >
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-pink-500 fill-current" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 