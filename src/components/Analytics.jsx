import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { usePasswordStore } from '../store/passwordStore'
import { calculatePasswordStrength, analyzeCharacterDistribution } from '../utils/passwordUtils'

const Analytics = () => {
  const { history, savedPasswords, isDarkMode, password } = usePasswordStore()

  // Calculate statistics
  const stats = useMemo(() => {
    const allPasswords = [...history.map((h) => h.password), ...savedPasswords.map((s) => s.password)]

    if (allPasswords.length === 0) {
      return {
        avgLength: 0,
        avgStrength: 0,
        strongCount: 0,
        mediumCount: 0,
        weakCount: 0,
        lengthDistribution: [],
        strengthTrend: [],
      }
    }

    // Average calculations
    const avgLength = Math.round(allPasswords.reduce((sum, p) => sum + p.length, 0) / allPasswords.length)

    // Strength distribution
    const strengthCounts = { 'Very Strong': 0, Strong: 0, Medium: 0, Weak: 0 }
    const strengthScores = []

    allPasswords.forEach((p) => {
      const { strength, score } = calculatePasswordStrength(p)
      strengthCounts[strength]++
      strengthScores.push(score)
    })

    const avgStrength = Math.round(strengthScores.reduce((a, b) => a + b, 0) / strengthScores.length)

    // Length distribution
    const lengthGroups = { '4-8': 0, '9-16': 0, '17-24': 0, '25+': 0 }
    allPasswords.forEach((p) => {
      if (p.length <= 8) lengthGroups['4-8']++
      else if (p.length <= 16) lengthGroups['9-16']++
      else if (p.length <= 24) lengthGroups['17-24']++
      else lengthGroups['25+']++
    })

    return {
      avgLength,
      avgStrength,
      strongCount: strengthCounts['Very Strong'] + strengthCounts.Strong,
      mediumCount: strengthCounts.Medium,
      weakCount: strengthCounts.Weak,
      lengthDistribution: Object.entries(lengthGroups).map(([name, value]) => ({ name, value })),
      strengthDistribution: [
        { name: 'Very Strong', value: strengthCounts['Very Strong'], fill: '#22c55e' },
        { name: 'Strong', value: strengthCounts.Strong, fill: '#84cc16' },
        { name: 'Medium', value: strengthCounts.Medium, fill: '#eab308' },
        { name: 'Weak', value: strengthCounts.Weak, fill: '#ef4444' },
      ].filter((d) => d.value > 0),
    }
  }, [history, savedPasswords])

  // Strength trend (last 10 passwords)
  const strengthTrend = useMemo(() => {
    const recentPasswords = history.slice(0, 10).reverse()
    return recentPasswords.map((p, index) => ({
      index: index + 1,
      strength: calculatePasswordStrength(p.password).score,
    }))
  }, [history])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg. Length', value: stats.avgLength, icon: '📏' },
          { label: 'Avg. Strength', value: `${stats.avgStrength}%`, icon: '💪' },
          { label: 'Strong Passwords', value: stats.strongCount, icon: '✅' },
          { label: 'Total Generated', value: history.length + savedPasswords.length, icon: '🔐' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ translateY: -4 }}
            className={`rounded-xl p-4 text-center border transition-all ${
              isDarkMode
                ? 'glass bg-dark-800/40 border-primary-500/20'
                : 'bg-white/80 border-primary-400/30 shadow-md'
            }`}
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {stat.label}
            </div>
            <div className={`text-2xl font-bold ${
              isDarkMode ? 'text-primary-400' : 'text-primary-600'
            }`}>{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strength Trend */}
        {strengthTrend.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`rounded-xl p-6 border transition-all ${
              isDarkMode
                ? 'glass bg-dark-800/40 border-primary-500/20'
                : 'bg-white/80 border-primary-400/30 shadow-lg'
            }`}
          >
            <h3 className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Strength Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={strengthTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#495057' : '#dee2e6'} />
                <XAxis stroke={isDarkMode ? '#6c757d' : '#adb5bd'} />
                <YAxis stroke={isDarkMode ? '#6c757d' : '#adb5bd'} />
                <Tooltip contentStyle={{
                  backgroundColor: isDarkMode ? '#1a1d23' : '#ffffff',
                  border: `1px solid ${isDarkMode ? '#6a9dff' : '#6a9dff'}`,
                  borderRadius: '8px',
                }} />
                <Line
                  type="monotone"
                  dataKey="strength"
                  stroke="#6a9dff"
                  strokeWidth={2}
                  dot={{ fill: '#6a9dff', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Length Distribution */}
        {stats.lengthDistribution.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`rounded-xl p-6 border transition-all ${
              isDarkMode
                ? 'glass bg-dark-800/40 border-primary-500/20'
                : 'bg-white/80 border-primary-400/30 shadow-lg'
            }`}
          >
            <h3 className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Length Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.lengthDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#495057' : '#dee2e6'} />
                <XAxis stroke={isDarkMode ? '#6c757d' : '#adb5bd'} />
                <YAxis stroke={isDarkMode ? '#6c757d' : '#adb5bd'} />
                <Tooltip contentStyle={{
                  backgroundColor: isDarkMode ? '#1a1d23' : '#ffffff',
                  border: `1px solid ${isDarkMode ? '#6a9dff' : '#6a9dff'}`,
                  borderRadius: '8px',
                }} />
                <Bar dataKey="value" fill="#c76aff" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </div>

      {/* Strength Distribution Pie Chart */}
      {stats.strengthDistribution.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-xl p-6 border transition-all ${
            isDarkMode
              ? 'glass bg-dark-800/40 border-primary-500/20'
              : 'bg-white/80 border-primary-400/30 shadow-lg'
          }`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Strength Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.strengthDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {stats.strengthDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={{
                backgroundColor: isDarkMode ? '#1a1d23' : '#ffffff',
                border: `1px solid ${isDarkMode ? '#6a9dff' : '#6a9dff'}`,
                borderRadius: '8px',
              }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Recommendations */}
      {history.length === 0 && savedPasswords.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`glass rounded-xl p-6 text-center space-y-3`}
        >
          <p className="text-lg font-semibold">No Data Available</p>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Start generating passwords to see analytics
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Analytics
