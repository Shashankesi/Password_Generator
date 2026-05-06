import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiLock, FiZap, FiShield } from 'react-icons/fi'
import { usePasswordStore } from '../store/passwordStore'
import { generatePassword, calculatePasswordStrength } from '../utils/passwordUtils'

const Hero = () => {
  const { isDarkMode, setPassword, password, addToHistory } = usePasswordStore()

  // Generate initial password on mount
  useEffect(() => {
    const initialPassword = generatePassword({
      length: 16,
      useUppercase: true,
      useLowercase: true,
      useNumbers: true,
      useSymbols: true,
    })
    setPassword(initialPassword)
  }, [])

  const handleQuickGenerate = () => {
    const newPassword = generatePassword({
      length: 16,
      useUppercase: true,
      useLowercase: true,
      useNumbers: true,
      useSymbols: true,
    })
    setPassword(newPassword)
    addToHistory(newPassword)
  }

  const { strength, score } = calculatePasswordStrength(password)

  const features = [
    {
      icon: <FiLock className="w-6 h-6" />,
      title: 'Military Grade',
      description: 'AES-256 level security with local-only generation',
    },
    {
      icon: <FiZap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Instant password generation with advanced algorithms',
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: '100% Safe',
      description: 'No data storage, no tracking, fully open-source',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="hero" className="py-12 md:py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center space-y-8"
      >
        {/* Main Title */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="text-gradient bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
              Generate Unbreakable
            </span>
            <br />
            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Passwords in Seconds</span>
          </h1>
          <p
            className={`text-lg md:text-xl max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Experience the ultimate password generator with military-grade security, advanced features, and a stunning modern interface.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleQuickGenerate}
            className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-primary-600/50 hover:shadow-xl hover:shadow-primary-600/60 transition-all"
          >
            Generate Now <FiArrowRight />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-3 rounded-lg font-semibold border-2 transition-all ${
              isDarkMode
                ? 'border-primary-600 text-primary-400 hover:bg-primary-600/10'
                : 'border-primary-500 text-primary-600 hover:bg-primary-50'
            }`}
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          variants={itemVariants}
          className={`rounded-2xl p-6 md:p-8 max-w-3xl mx-auto border-2 transition-all ${
            isDarkMode
              ? 'glass bg-dark-800/40 border-primary-500/20'
              : 'bg-gradient-to-br from-white/90 to-gray-50/90 border-primary-400/30 shadow-lg'
          }`}
        >
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary-500">256-bit</div>
              <p className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-700'
              }`}>
                Encryption
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-secondary-500">Instant</div>
              <p className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-700'
              }`}>
                Generation
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent-500">Local</div>
              <p className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-700'
              }`}>
                Processing
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ translateY: -5 }}
              className={`rounded-xl p-6 text-center border-2 transition-all ${
                isDarkMode
                  ? 'glass bg-dark-800/40 border-primary-500/20 hover:border-primary-500/50'
                  : 'bg-white/70 border-primary-400/30 hover:border-primary-400/50 shadow-md hover:shadow-lg'
              }`}
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center text-white shadow-lg">
                  {feature.icon}
                </div>
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{feature.title}</h3>
              <p className={`${
                isDarkMode ? 'text-gray-400' : 'text-gray-700'
              }`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
