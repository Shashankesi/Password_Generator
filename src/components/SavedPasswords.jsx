import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTrash2, FiCopy, FiDownload, FiLock } from 'react-icons/fi'
import { usePasswordStore } from '../store/passwordStore'
import { exportAsCSV, exportAsTXT } from '../utils/passwordUtils'
import { toast } from 'react-toastify'

const SavedPasswords = ({ expandedView = false }) => {
  const { savedPasswords, unsavePassword, isDarkMode } = usePasswordStore()
  const [showPassword, setShowPassword] = useState({})

  const handleCopy = (password) => {
    navigator.clipboard.writeText(password)
    toast.success('Copied to clipboard!', { autoClose: 2000 })
  }

  const handleDelete = (id) => {
    unsavePassword(id)
    toast.success('Password removed!', { autoClose: 2000 })
  }

  const handleExportCSV = () => {
    if (savedPasswords.length === 0) {
      toast.error('No saved passwords to export', { autoClose: 2000 })
      return
    }
    const csv = exportAsCSV(savedPasswords)
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv))
    element.setAttribute('download', 'saved-passwords.csv')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success('Exported as CSV!', { autoClose: 2000 })
  }

  const handleExportTXT = () => {
    if (savedPasswords.length === 0) {
      toast.error('No saved passwords to export', { autoClose: 2000 })
      return
    }
    const txt = exportAsTXT(savedPasswords)
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(txt))
    element.setAttribute('download', 'saved-passwords.txt')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success('Exported as TXT!', { autoClose: 2000 })
  }

  if (savedPasswords.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`glass rounded-2xl p-6 text-center space-y-4`}
      >
        <div className="text-4xl">💾</div>
        <h3 className="text-lg font-semibold">No Saved Passwords</h3>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          Save your favorite passwords to access them later
        </p>
      </motion.div>
    )
  }

  const displayedPasswords = expandedView ? savedPasswords : savedPasswords.slice(0, 3)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className={`glass rounded-2xl p-6 space-y-4`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span className="text-xl">💾</span>
          {expandedView ? 'All Saved Passwords' : 'Saved Passwords'}
        </h3>
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
          isDarkMode ? 'bg-secondary-600/20 text-secondary-300' : 'bg-secondary-100 text-secondary-700'
        }`}>
          {savedPasswords.length}
        </span>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {displayedPasswords.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-lg p-3.5 space-y-2 group border transition-all ${
                isDarkMode
                  ? 'bg-dark-800/50 border-dark-700 hover:border-primary-500/50 hover:bg-dark-700/70'
                  : 'bg-white/50 border-primary-200/50 hover:border-primary-400/50 hover:bg-white/70'
              }`}
            >
              {/* Label and Time */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{item.label}</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {item.savedAt}
                  </p>
                </div>
                <FiLock className={`flex-shrink-0 w-4 h-4 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} />
              </div>

              {/* Password Display */}
              <div className="flex items-center gap-2">
                <code className={`text-xs font-mono flex-1 truncate px-2 py-1.5 rounded ${
                  isDarkMode ? 'bg-dark-900/50' : 'bg-white'
                }`}>
                  {showPassword[item.id] ? item.password : '••••••••••••'}
                </code>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-1.5 pt-2 border-t border-dark-700/50">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopy(item.password)}
                  className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-all ${
                    isDarkMode
                      ? 'bg-primary-600/20 text-primary-300 hover:bg-primary-600/30'
                      : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                  }`}
                  title="Copy password"
                >
                  <FiCopy size={12} className="inline mr-1" />
                  Copy
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPassword({ ...showPassword, [item.id]: !showPassword[item.id] })}
                  className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-all ${
                    isDarkMode
                      ? 'bg-secondary-600/20 text-secondary-300 hover:bg-secondary-600/30'
                      : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                  }`}
                  title={showPassword[item.id] ? 'Hide' : 'Show'}
                >
                  {showPassword[item.id] ? '👁️ Hide' : '👁️ Show'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(item.id)}
                  className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-all ${
                    isDarkMode
                      ? 'bg-red-600/20 text-red-300 hover:bg-red-600/30'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                  title="Delete"
                >
                  <FiTrash2 size={12} className="inline mr-1" />
                  Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {savedPasswords.length > 3 && !expandedView && (
        <p className={`text-xs text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          ... and {savedPasswords.length - 3} more
        </p>
      )}

      {/* Export Buttons */}
      {expandedView && (
        <div className="flex gap-2 pt-4 border-t border-dark-700/50">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExportCSV}
            className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              isDarkMode
                ? 'bg-primary-600/20 text-primary-300 hover:bg-primary-600/30'
                : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
            }`}
          >
            <FiDownload size={14} />
            CSV
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExportTXT}
            className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              isDarkMode
                ? 'bg-secondary-600/20 text-secondary-300 hover:bg-secondary-600/30'
                : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
            }`}
          >
            <FiDownload size={14} />
            TXT
          </motion.button>
        </div>
      )}
    </motion.div>
  )
}

export default SavedPasswords
