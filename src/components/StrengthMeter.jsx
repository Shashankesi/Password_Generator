import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import { usePasswordStore } from '../store/passwordStore'
import {
  calculatePasswordStrength,
  calculateEntropy,
  estimateCrackTime,
  analyzeCharacterDistribution,
  detectWeakPatterns,
} from '../utils/passwordUtils'

const StrengthMeter = () => {
  const { password, isDarkMode, setSecurityScore, setStrengthLevel, setEstimatedCrackTime, setCharacterCount, setCharacterDistribution } = usePasswordStore()
  const [analysis, setAnalysis] = useState({
    strength: 'Weak',
    score: 0,
    entropy: 0,
    crackTime: '0s',
    distribution: {},
    patterns: [],
  })

  useEffect(() => {
    if (password) {
      const { strength, score, color } = calculatePasswordStrength(password)
      const entropy = calculateEntropy(password)
      const crackTime = estimateCrackTime(password)
      const distribution = analyzeCharacterDistribution(password)
      const patterns = detectWeakPatterns(password)

      setAnalysis({
        strength,
        score,
        entropy,
        crackTime,
        distribution,
        patterns,
      })

      // Update store
      setSecurityScore(score)
      setStrengthLevel(strength)
      setEstimatedCrackTime(crackTime)
      setCharacterCount(password.length)
      setCharacterDistribution(distribution)
    }
  }, [password])

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 'Very Strong':
        return 'from-green-500 to-emerald-500'
      case 'Strong':
        return 'from-lime-500 to-green-500'
      case 'Medium':
        return 'from-yellow-500 to-orange-500'
      default:
        return 'from-red-500 to-rose-500'
    }
  }

  const getStrengthTextColor = (strength) => {
    switch (strength) {
      case 'Very Strong':
        return 'text-green-400'
      case 'Strong':
        return 'text-lime-400'
      case 'Medium':
        return 'text-yellow-400'
      default:
        return 'text-red-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`rounded-2xl p-6 md:p-8 space-y-6 border-2 transition-all ${
        isDarkMode
          ? 'glass bg-dark-800/40 border-primary-500/20'
          : 'bg-white/80 border-primary-400/30 shadow-lg'
      }`}
    >
      <h2 className={`text-2xl font-bold ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>Security Analysis</h2>

      {/* Strength Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Overall Strength</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-lg font-bold ${getStrengthTextColor(analysis.strength)}`}
          >
            {analysis.strength}
          </motion.span>
        </div>
        <div className={`w-full h-3 rounded-full overflow-hidden ${
          isDarkMode ? 'bg-dark-700' : 'bg-gray-200'
        }`}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${analysis.score}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full bg-gradient-to-r ${getStrengthColor(analysis.strength)}`}
          />
        </div>
        <div className={`flex justify-between text-xs ${
          isDarkMode ? 'text-gray-500' : 'text-gray-600'
        }`}>
          <span>Weak</span>
          <span>Medium</span>
          <span>Strong</span>
        </div>
      </div>

      {/* Grid of Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Score', value: `${analysis.score}%`, icon: '📊' },
          { label: 'Entropy', value: `${analysis.entropy} bits`, icon: '🔢' },
          { label: 'Length', value: password.length, icon: '📏' },
          { label: 'Crack Time', value: analysis.crackTime, icon: '⏱️' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ translateY: -4 }}
            className={`rounded-lg p-4 text-center border transition-all ${
              isDarkMode
                ? 'bg-dark-800/50 border-primary-600/20'
                : 'bg-white/50 border-primary-400/20 shadow-sm'
            }`}
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className={`text-xs mb-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>{stat.label}</div>
            <div className="font-bold text-primary-400 truncate">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Character Distribution */}
      <div>
        <h3 className={`text-sm font-semibold mb-3 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>Character Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: 'Uppercase', count: analysis.distribution.uppercase, color: 'from-blue-500 to-blue-600' },
            { name: 'Lowercase', count: analysis.distribution.lowercase, color: 'from-green-500 to-green-600' },
            { name: 'Numbers', count: analysis.distribution.numbers, color: 'from-purple-500 to-purple-600' },
            { name: 'Symbols', count: analysis.distribution.symbols, color: 'from-pink-500 to-pink-600' },
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`rounded-lg p-3 bg-gradient-to-br ${item.color} text-white text-center`}
            >
              <div className="text-sm font-medium">{item.name}</div>
              <div className="text-2xl font-bold">{item.count}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Weak Patterns */}
      {analysis.patterns.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
            <FiAlertCircle className="text-yellow-500" /> Potential Weaknesses
          </h3>
          <div className="space-y-2">
            {analysis.patterns.map((pattern, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-3 rounded-lg flex items-center gap-2 ${
                  isDarkMode ? 'bg-yellow-600/20 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                <FiAlertCircle size={16} />
                {pattern}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {analysis.score >= 80 ? (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={`p-4 rounded-lg flex items-center gap-3 ${
            isDarkMode ? 'bg-green-600/20 text-green-300' : 'bg-green-100 text-green-800'
          }`}
        >
          <FiCheckCircle size={20} />
          <div>
            <p className="font-semibold">Excellent password strength!</p>
            <p className="text-sm opacity-80">This password is very secure for most use cases.</p>
          </div>
        </motion.div>
      ) : analysis.score >= 40 ? (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={`p-4 rounded-lg ${
            isDarkMode ? 'bg-yellow-600/20 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          <p className="font-semibold">💡 Tip: Add more character types or increase length</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={`p-4 rounded-lg flex items-center gap-3 ${
            isDarkMode ? 'bg-red-600/20 text-red-300' : 'bg-red-100 text-red-800'
          }`}
        >
          <FiAlertCircle size={20} />
          <div>
            <p className="font-semibold">⚠️ Weak password!</p>
            <p className="text-sm opacity-80">Consider using more characters and variety.</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default StrengthMeter
