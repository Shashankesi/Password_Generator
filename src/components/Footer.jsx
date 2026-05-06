import React from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiTwitter, FiMail, FiHeart } from 'react-icons/fi'
import { usePasswordStore } from '../store/passwordStore'

const Footer = () => {
  const { isDarkMode } = usePasswordStore()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      icon: <FiGithub size={24} />,
      label: 'GitHub',
      href: 'https://github.com',
      color: 'hover:text-gray-400',
    },
    {
      icon: <FiTwitter size={24} />,
      label: 'Twitter',
      href: 'https://twitter.com',
      color: 'hover:text-blue-400',
    },
    {
      icon: <FiMail size={24} />,
      label: 'Email',
      href: 'mailto:hello@securepass.com',
      color: 'hover:text-red-400',
    },
  ]

  const footerLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Security', href: '#' },
    { label: 'Documentation', href: '#' },
  ]

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className={`mt-20 py-12 border-t ${
        isDarkMode ? 'border-dark-700' : 'border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center">
                <span className="text-white font-bold">🔐</span>
              </div>
              <span className="text-lg font-bold text-gradient bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                SecurePass
              </span>
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              The premium password generator for modern security.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="space-y-4"
          >
            <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Product</h4>
            <ul className="space-y-2">
              {[
                { label: 'Generator', href: '#' },
                { label: 'Features', href: '#' },
                { label: 'Pricing', href: '#' },
                { label: 'Blog', href: '#' },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className={`text-sm transition-colors hover:text-primary-500 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Company</h4>
            <ul className="space-y-2">
              {[
                { label: 'About', href: '#' },
                { label: 'Security', href: '#' },
                { label: 'Contact', href: '#' },
                { label: 'Careers', href: '#' },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className={`text-sm transition-colors hover:text-primary-500 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="space-y-4"
          >
            <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Legal</h4>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className={`text-sm transition-colors hover:text-primary-500 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className={`my-8 border-t ${isDarkMode ? 'border-dark-700' : 'border-gray-200'}`} />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}
          >
            © {currentYear} SecurePass. All rights reserved.
            <br className="md:hidden" />
            Made with{' '}
            <span className="inline-flex items-center gap-1">
              <FiHeart size={14} className="text-red-500" />
              for security
            </span>
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-6"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                whileHover={{ scale: 1.2, translateY: -3 }}
                whileTap={{ scale: 0.95 }}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                } ${link.color}`}
                title={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full ${
              isDarkMode
                ? 'bg-green-600/20 text-green-300'
                : 'bg-green-100 text-green-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            All Systems Operational
          </motion.div>
        </div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className={`mt-8 p-4 rounded-lg text-center text-xs ${
            isDarkMode ? 'bg-primary-600/10 text-primary-300' : 'bg-primary-100 text-primary-700'
          }`}
        >
          🔒 SecurePass is a client-side application. All passwords are generated locally in your browser and never sent to any server.
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer
