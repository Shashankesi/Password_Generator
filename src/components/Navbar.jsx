import React, { useState } from 'react'
import { FiMenu, FiX, FiMoon, FiSun, FiGithub, FiDownload } from 'react-icons/fi'
import { usePasswordStore } from '../store/passwordStore'
import { motion } from 'framer-motion'

const Navbar = () => {
  const { isDarkMode, setIsDarkMode } = usePasswordStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
        isDarkMode
          ? 'bg-dark-900/70 border-primary-500/20 shadow-lg shadow-primary-500/10'
          : 'bg-white/70 border-primary-400/20 shadow-lg shadow-primary-400/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2.5 cursor-pointer flex-shrink-0"
            onClick={() => scrollToSection('hero')}
          >
            <div className="w-10 h-10 md:w-9 md:h-9 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center shadow-lg shadow-primary-600/40">
              <span className="text-white font-bold text-lg">🔐</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-lg font-bold bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
                SecurePass
              </h1>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Premium Generator
              </p>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {['Generator', 'Features', 'FAQ'].map((item, index) => (
              <motion.a
                key={index}
                whileHover={{ backgroundColor: isDarkMode ? 'rgba(106, 157, 255, 0.1)' : 'rgba(106, 157, 255, 0.08)' }}
                href={`#${item.toLowerCase()}`}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-primary-400'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* GitHub Button */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all ${
                isDarkMode
                  ? 'bg-dark-800 text-gray-300 hover:bg-dark-700 border border-primary-500/20'
                  : 'bg-white/50 text-gray-700 hover:bg-white border border-primary-400/20'
              }`}
              title="View on GitHub"
            >
              <FiGithub size={16} />
              <span className="hidden lg:inline">GitHub</span>
            </motion.a>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-lg transition-all ${
                isDarkMode
                  ? 'bg-primary-600/20 text-yellow-400 hover:bg-primary-600/30 border border-primary-500/30'
                  : 'bg-primary-100 text-amber-500 hover:bg-primary-200 border border-primary-300/50'
              }`}
              title={isDarkMode ? 'Light mode' : 'Dark mode'}
            >
              {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2.5 rounded-lg transition-all ${
                isDarkMode
                  ? 'bg-dark-800 hover:bg-dark-700 border border-primary-500/20'
                  : 'bg-white/50 hover:bg-white border border-primary-400/20'
              }`}
            >
              {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`md:hidden overflow-hidden border-t ${
          isDarkMode ? 'border-primary-500/20 bg-dark-900/50' : 'border-primary-400/20 bg-white/30'
        }`}
      >
        <div className="px-4 py-4 space-y-2">
          {[
            { label: 'Generator', href: '#generator' },
            { label: 'Features', href: '#features' },
            { label: 'Security Tips', href: '#tips' },
            { label: 'FAQ', href: '#faq' },
          ].map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              whileHover={{ paddingLeft: 24 }}
              className={`block px-4 py-2.5 rounded-lg font-medium transition-all ${
                isDarkMode
                  ? 'text-gray-300 hover:text-primary-400 hover:bg-primary-600/20'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-primary-100/50'
              }`}
            >
              {item.label}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  )
}

export default Navbar
