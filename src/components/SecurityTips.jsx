import React from 'react'
import { motion } from 'framer-motion'
import { FiAlertCircle, FiCheckCircle, FiLock, FiEye } from 'react-icons/fi'
import { usePasswordStore } from '../store/passwordStore'

const SecurityTips = () => {
  const { isDarkMode } = usePasswordStore()

  const tips = [
    {
      icon: <FiLock className="w-6 h-6" />,
      title: 'Use Unique Passwords',
      description: 'Create different passwords for each online account to minimize damage if one is compromised.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: <FiEye className="w-6 h-6" />,
      title: 'Never Share Your Passwords',
      description: 'Legitimate services never ask for your password. Never share it via email, chat, or phone.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: <FiAlertCircle className="w-6 h-6" />,
      title: 'Avoid Common Patterns',
      description: 'Don\'t use birthdays, names, or sequential characters. Avoid dictionary words and keyboard patterns.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: <FiCheckCircle className="w-6 h-6" />,
      title: 'Use a Password Manager',
      description: 'Store generated passwords securely using a reputable password manager like Bitwarden or 1Password.',
      color: 'from-pink-500 to-pink-600',
    },
    {
      icon: <FiLock className="w-6 h-6" />,
      title: 'Enable Two-Factor Authentication',
      description: 'Add an extra security layer with 2FA using authenticator apps like Google Authenticator or Authy.',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: <FiCheckCircle className="w-6 h-6" />,
      title: 'Minimum 12 Characters',
      description: 'Use at least 12 characters combining uppercase, lowercase, numbers, and symbols for strong passwords.',
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      icon: <FiEye className="w-6 h-6" />,
      title: 'Regular Password Updates',
      description: 'Change your passwords every 3-6 months, and immediately after a service breach.',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: <FiAlertCircle className="w-6 h-6" />,
      title: 'Beware of Phishing',
      description: 'Check URLs carefully. Phishers create fake login pages to steal passwords. Verify SSL certificates.',
      color: 'from-indigo-500 to-indigo-600',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="text-center space-y-2 mb-8">
        <h2 className={`text-3xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Password Security Tips</h2>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          Learn best practices for creating and protecting your passwords
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((tip, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ translateY: -8 }}
            className={`rounded-xl p-6 space-y-3 group cursor-pointer border transition-all ${
              isDarkMode
                ? 'glass bg-dark-800/40 border-primary-500/20'
                : 'bg-white/80 border-primary-400/30 shadow-lg hover:shadow-xl'
            }`}
          >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tip.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
              {tip.icon}
            </div>
            <h3 className={`text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>{tip.title}</h3>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              {tip.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Password Checklist */}
      <motion.div
        variants={itemVariants}
        className={`rounded-xl p-6 space-y-4 mt-8 border transition-all ${
          isDarkMode
            ? 'glass bg-dark-800/40 border-primary-500/20'
            : 'bg-white/80 border-primary-400/30 shadow-lg'
        }`}
      >
        <h3 className={`text-2xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Strong Password Checklist</h3>
        <div className="space-y-2">
          {[
            '✅ At least 12 characters long',
            '✅ Contains uppercase letters (A-Z)',
            '✅ Contains lowercase letters (a-z)',
            '✅ Contains numbers (0-9)',
            '✅ Contains special symbols (!@#$%^&*)',
            '✅ No personal information',
            '✅ No dictionary words',
            '✅ No keyboard patterns (qwerty, asdf)',
            '✅ No repeated characters',
            '✅ Unique across different accounts',
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-2 rounded ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Password Strength Timeline */}
      <motion.div
        variants={itemVariants}
        className={`glass rounded-xl p-6 space-y-4 mt-8`}
      >
        <h3 className="text-2xl font-bold">Password Strength Reference</h3>
        <div className="space-y-4">
          {[
            {
              level: 'Weak',
              examples: 'password123, Password, Admin2024',
              crackTime: '< 1 second',
              color: 'from-red-500 to-red-600',
            },
            {
              level: 'Medium',
              examples: 'P@ssw0rd123, MyDog2024!',
              crackTime: '1 minute to 1 day',
              color: 'from-yellow-500 to-yellow-600',
            },
            {
              level: 'Strong',
              examples: 'Tr0pic@lThund3r!, Quantum@2024X',
              crackTime: '1 week to 1 year',
              color: 'from-lime-500 to-lime-600',
            },
            {
              level: 'Very Strong',
              examples: 'C0mpl3x#P@ssw0rd$2024!, ZephyrNova@Quantum$7X9',
              crackTime: '> 100 years',
              color: 'from-green-500 to-green-600',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border-l-4 border-gradient-to-r ${item.color}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{item.level}</h4>
                <span className={`text-xs font-medium px-2 py-1 rounded bg-gradient-to-r ${item.color} text-white`}>
                  {item.crackTime}
                </span>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Example: <code className="font-mono text-primary-300">{item.examples}</code>
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default SecurityTips
