import React, { useEffect, useState } from 'react'
import { FiCopy, FiEye, FiEyeOff, FiRefreshCw, FiDownload } from 'react-icons/fi'
import { MdIosShare } from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'
import { usePasswordStore } from '../store/passwordStore'
import { generatePassword } from '../utils/passwordUtils'
import { toast } from 'react-toastify'

const PasswordCard = () => {
  const {
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isDarkMode,
    addToHistory,
    savePassword,
    passwordLength,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    excludeSimilar,
    avoidAmbiguous,
    customSymbols,
    memorableMode,
    passphraseMode,
    pinMode,
  } = usePasswordStore()

  const [copied, setCopied] = useState(false)
  const [clipboardTimeout, setClipboardTimeout] = useState(null)
  const [saveLabel, setSaveLabel] = useState('')
  const [showSaveModal, setShowSaveModal] = useState(false)

  // Auto-hide password after some time
  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setShowPassword(false)
    }, 60000) // 1 minute

    return () => clearTimeout(hideTimer)
  }, [showPassword, setShowPassword])

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true)
      toast.success('Password copied to clipboard!', {
        position: 'bottom-right',
        autoClose: 2000,
      })

      // Clear after 3 seconds
      const timeout = setTimeout(() => {
        setCopied(false)
      }, 3000)

      setClipboardTimeout(timeout)

      // Auto-clear clipboard after 30 seconds
      setTimeout(() => {
        navigator.clipboard.writeText('')
      }, 30000)
    })
  }

  const handleRegenerate = () => {
    const newPassword = generatePassword({
      length: passwordLength,
      useUppercase: includeUppercase,
      useLowercase: includeLowercase,
      useNumbers: includeNumbers,
      useSymbols: includeSymbols,
      excludeSimilar,
      avoidAmbiguous,
      customSymbols,
      memorable: memorableMode,
      passphrase: passphraseMode,
      pin: pinMode,
    })
    setPassword(newPassword)
    addToHistory(newPassword)
    toast.success('New password generated!', { autoClose: 2000 })
  }

  const handleSave = () => {
    if (saveLabel.trim()) {
      savePassword(password, saveLabel)
      setSaveLabel('')
      setShowSaveModal(false)
      toast.success('Password saved!', { autoClose: 2000 })
    }
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(password)
    )
    element.setAttribute('download', 'password.txt')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success('Password downloaded!', { autoClose: 2000 })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Secure Password',
          text: 'I generated a secure password using SecurePass',
        })
      } catch (error) {
        console.log('Share cancelled')
      }
    } else {
      toast.info('Share API not supported', { autoClose: 2000 })
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-6 md:p-8 space-y-6 border-2 transition-all ${
          isDarkMode
            ? 'glass bg-dark-800/40 border-primary-500/20'
            : 'bg-white/80 border-primary-400/30 shadow-lg'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Generated Password</h2>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            isDarkMode ? 'bg-primary-600/20 text-primary-300' : 'bg-primary-100 text-primary-700'
          }`}>
            {password.length} characters
          </div>
        </div>

        {/* Password Display */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`relative w-full px-6 py-4 rounded-xl border-2 transition-all ${
              isDarkMode
                ? 'bg-dark-800/50 border-primary-600/30 focus-within:border-primary-600'
                : 'bg-white border-primary-400/40 shadow-md focus-within:border-primary-600 focus-within:shadow-lg'
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                readOnly
                className="flex-1 bg-transparent outline-none text-lg md:text-2xl font-mono font-bold truncate"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 rounded-lg transition-colors hover:bg-primary-600/20 text-primary-500"
              >
                {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Password Length Indicator */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1 rounded-full overflow-hidden bg-dark-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(password.length / 50) * 100}%` }}
              className="h-full bg-gradient-to-r from-primary-600 to-secondary-600"
            />
          </div>
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {password.length}/50
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopyToClipboard}
            className={`px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
              copied
                ? 'bg-green-600 text-white'
                : 'bg-primary-600 text-white hover:shadow-lg hover:shadow-primary-600/50'
            }`}
          >
            <FiCopy size={18} />
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRegenerate}
            className="px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 bg-secondary-600 text-white hover:shadow-lg hover:shadow-secondary-600/50 transition-all"
          >
            <FiRefreshCw size={18} />
            <span className="hidden sm:inline">Regenerate</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSaveModal(true)}
            className="px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 bg-accent-600 text-white hover:shadow-lg hover:shadow-accent-600/50 transition-all"
          >
            💾
            <span className="hidden sm:inline">Save</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className={`px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
              isDarkMode
                ? 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <FiDownload size={18} />
            <span className="hidden sm:inline">Download</span>
          </motion.button>
        </div>

        {/* Info Text */}
        <p className={`text-sm text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          🔒 Password is generated locally and never stored on any server
        </p>
      </motion.div>

      {/* Save Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowSaveModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`glass rounded-2xl p-6 max-w-sm w-full space-y-4`}
            >
              <h3 className="text-xl font-bold">Save Password</h3>
              <input
                type="text"
                placeholder="Enter a label (e.g., GitHub, Email)"
                value={saveLabel}
                onChange={(e) => setSaveLabel(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-dark-800 border border-primary-600/30 outline-none focus:border-primary-600"
                onKeyPress={(e) => e.key === 'Enter' && handleSave()}
              />
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 rounded-lg font-semibold bg-primary-600 text-white hover:shadow-lg"
                >
                  Save
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSaveModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold ${
                    isDarkMode
                      ? 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default PasswordCard
