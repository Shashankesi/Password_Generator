import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTrash2, FiCopy, FiSave } from 'react-icons/fi'
import { usePasswordStore } from '../store/passwordStore'
import { toast } from 'react-toastify'

const HistoryPanel = ({ expandedView = false }) => {
  const { history, clearHistory, isDarkMode, savePassword } = usePasswordStore()
  const [expandedItems, setExpandedItems] = useState({})

  const handleCopyPassword = (password) => {
    navigator.clipboard.writeText(password)
    toast.success('Password copied!', { autoClose: 2000 })
  }

  const handleSaveFromHistory = (password) => {
    savePassword(password, `Password from history`)
    toast.success('Added to saved passwords!', { autoClose: 2000 })
  }

  const toggleItem = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  if (history.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`rounded-2xl p-6 text-center space-y-4 border-2 transition-all ${
          isDarkMode
            ? 'glass bg-dark-800/40 border-primary-500/20'
            : 'bg-white/80 border-primary-400/30 shadow-lg'
        }`}
      >
        <h3 className={`text-lg font-semibold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>No History</h3>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          Generated passwords will appear here
        </p>
      </motion.div>
    )
  }

  const displayedHistory = expandedView ? history : history.slice(0, 5)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`rounded-2xl p-6 space-y-4 border-2 transition-all ${
        isDarkMode
          ? 'glass bg-dark-800/40 border-primary-500/20'
          : 'bg-white/80 border-primary-400/30 shadow-lg'
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className={`text-lg font-semibold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          📋 {expandedView ? 'Password History' : 'Recent History'}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          isDarkMode ? 'bg-primary-600/20 text-primary-300' : 'bg-primary-100 text-primary-700'
        }`}>
          {history.length}
        </span>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {displayedHistory.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-lg p-3 space-y-2 border transition-all ${
                isDarkMode
                  ? 'bg-dark-800/50 border-primary-600/20 hover:bg-dark-700'
                  : 'bg-white/50 border-primary-400/20 hover:bg-white shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <code className="text-sm text-primary-400 truncate font-mono">
                    {item.password}
                  </code>
                </div>
                <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  {item.timestamp.split(',')[1]?.trim() || item.timestamp}
                </span>
              </div>

              {/* Action Buttons */}
              <div className={`flex gap-2 pt-2 border-t ${
                isDarkMode ? 'border-dark-700' : 'border-gray-300'
              }`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopyPassword(item.password)}
                  className="flex-1 px-2 py-1 rounded text-xs font-medium bg-primary-600/20 text-primary-300 hover:bg-primary-600/30 transition-colors flex items-center justify-center gap-1"
                >
                  <FiCopy size={12} />
                  <span className="hidden sm:inline">Copy</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSaveFromHistory(item.password)}
                  className="flex-1 px-2 py-1 rounded text-xs font-medium bg-secondary-600/20 text-secondary-300 hover:bg-secondary-600/30 transition-colors flex items-center justify-center gap-1"
                >
                  <FiSave size={12} />
                  <span className="hidden sm:inline">Save</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {history.length > 5 && !expandedView && (
        <p className={`text-xs text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          ... and {history.length - 5} more
        </p>
      )}

      {/* Clear History Button */}
      {expandedView && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={clearHistory}
          className="w-full px-4 py-2 rounded-lg text-sm font-medium bg-red-600/20 text-red-300 hover:bg-red-600/30 transition-colors flex items-center justify-center gap-2"
        >
          <FiTrash2 size={16} />
          Clear All History
        </motion.button>
      )}
    </motion.div>
  )
}

export default HistoryPanel
