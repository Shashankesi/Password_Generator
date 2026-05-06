import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import { usePasswordStore } from '../store/passwordStore'
import { generatePassword } from '../utils/passwordUtils'

const PasswordSettings = () => {
  const {
    passwordLength,
    setPasswordLength,
    includeUppercase,
    setIncludeUppercase,
    includeLowercase,
    setIncludeLowercase,
    includeNumbers,
    setIncludeNumbers,
    includeSymbols,
    setIncludeSymbols,
    excludeSimilar,
    setExcludeSimilar,
    avoidAmbiguous,
    setAvoidAmbiguous,
    customSymbols,
    setCustomSymbols,
    memorableMode,
    setMemorableMode,
    passphraseMode,
    setPassphraseMode,
    pinMode,
    setPinMode,
    isDarkMode,
    setPassword,
    addToHistory,
  } = usePasswordStore()

  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    advanced: false,
    modes: false,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleSettingChange = (setter, value) => {
    setter(value)
    // Auto-generate new password on settings change
    setTimeout(() => {
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
    }, 50)
  }

  const CheckboxToggle = ({ label, checked, onChange, tooltip }) => (
    <motion.label
      whileHover={{ translateX: 2 }}
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors group ${
        isDarkMode
          ? 'hover:bg-dark-700/50'
          : 'hover:bg-primary-100/50'
      }`}
      title={tooltip}
    >
      <div className="relative flex items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-5 h-5 cursor-pointer accent-primary-500"
        />
      </div>
      <span className={`text-sm font-medium flex-1 transition-colors ${
        isDarkMode
          ? 'text-gray-300 group-hover:text-primary-400'
          : 'text-gray-800 group-hover:text-primary-600'
      }`}>
        {label}
      </span>
      {tooltip && <span className={`text-xs ${
        isDarkMode ? 'text-gray-500' : 'text-gray-400'
      }`}>?</span>}
    </motion.label>
  )

  const SectionHeader = ({ title, section }) => (
    <motion.button
      onClick={() => toggleSection(section)}
      className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
        isDarkMode
          ? 'bg-dark-800/50 hover:bg-dark-700'
          : 'bg-white/50 hover:bg-white border border-primary-400/20'
      }`}
    >
      <h3 className={`text-lg font-semibold ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>{title}</h3>
      <motion.div
        animate={{ rotate: expandedSections[section] ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <FiChevronDown size={20} />
      </motion.div>
    </motion.button>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`rounded-2xl p-6 md:p-8 space-y-4 border-2 transition-all ${
        isDarkMode
          ? 'glass bg-dark-800/40 border-primary-500/20'
          : 'bg-white/80 border-primary-400/30 shadow-lg'
      }`}
    >
      <h2 className={`text-2xl font-bold mb-6 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>Password Settings</h2>

      {/* Length Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className={`text-sm font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>Password Length</label>
          <div className={`px-3 py-1 rounded-full text-sm font-bold ${
            isDarkMode ? 'bg-primary-600/20 text-primary-300' : 'bg-primary-100 text-primary-700'
          }`}>
            {passwordLength}
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <input
            type="range"
            min="4"
            max="50"
            value={passwordLength}
            onChange={(e) => handleSettingChange(setPasswordLength, parseInt(e.target.value))}
            className="flex-1"
          />
          <input
            type="number"
            min="4"
            max="50"
            value={passwordLength}
            onChange={(e) => handleSettingChange(setPasswordLength, parseInt(e.target.value))}
            className="w-16"
          />
        </div>
      </div>

      {/* Basic Settings Section */}
      <motion.div
        initial={false}
        animate={{ marginBottom: expandedSections.basic ? 16 : 0 }}
        className="space-y-2"
      >
        <SectionHeader title="Character Types" section="basic" />

        <AnimatePresence>
          {expandedSections.basic && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2 overflow-hidden"
            >
              <CheckboxToggle
                label="Uppercase (A-Z)"
                checked={includeUppercase}
                onChange={(val) => handleSettingChange(setIncludeUppercase, val)}
                tooltip="Include uppercase letters"
              />
              <CheckboxToggle
                label="Lowercase (a-z)"
                checked={includeLowercase}
                onChange={(val) => handleSettingChange(setIncludeLowercase, val)}
                tooltip="Include lowercase letters"
              />
              <CheckboxToggle
                label="Numbers (0-9)"
                checked={includeNumbers}
                onChange={(val) => handleSettingChange(setIncludeNumbers, val)}
                tooltip="Include numeric digits"
              />
              <CheckboxToggle
                label="Symbols (!@#$%)"
                checked={includeSymbols}
                onChange={(val) => handleSettingChange(setIncludeSymbols, val)}
                tooltip="Include special characters"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Advanced Settings Section */}
      <motion.div
        initial={false}
        animate={{ marginBottom: expandedSections.advanced ? 16 : 0 }}
        className="space-y-2"
      >
        <SectionHeader title="Advanced Options" section="advanced" />

        <AnimatePresence>
          {expandedSections.advanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 overflow-hidden"
            >
              <CheckboxToggle
                label="Exclude Similar Characters"
                checked={excludeSimilar}
                onChange={(val) => handleSettingChange(setExcludeSimilar, val)}
                tooltip="Exclude O, 0, l, I to avoid confusion"
              />
              <CheckboxToggle
                label="Avoid Ambiguous Symbols"
                checked={avoidAmbiguous}
                onChange={(val) => handleSettingChange(setAvoidAmbiguous, val)}
                tooltip="Exclude {}, [], (), <>, etc."
              />

              {/* Custom Symbols */}
              <div className="space-y-2">
                <label className={`text-sm font-medium block ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Custom Symbols</label>
                <input
                  type="text"
                  value={customSymbols}
                  onChange={(e) => handleSettingChange(setCustomSymbols, e.target.value)}
                  placeholder="!@#$%^&*"
                  maxLength="20"
                  className={`w-full px-3 py-2 rounded-lg outline-none text-sm transition-all ${
                    isDarkMode
                      ? 'bg-dark-800 border border-primary-600/30 text-white focus:border-primary-600'
                      : 'bg-white border border-primary-400/40 text-gray-900 shadow-sm focus:border-primary-600 focus:shadow-md'
                  }`}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Special Modes Section */}
      <motion.div
        initial={false}
        animate={{ marginBottom: expandedSections.modes ? 16 : 0 }}
        className="space-y-2"
      >
        <SectionHeader title="Special Modes" section="modes" />

        <AnimatePresence>
          {expandedSections.modes && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2 overflow-hidden"
            >
              <CheckboxToggle
                label="Memorable Mode"
                checked={memorableMode}
                onChange={(val) => handleSettingChange(setMemorableMode, val)}
                tooltip="Generate pronounceable passwords"
              />
              <CheckboxToggle
                label="Passphrase Mode"
                checked={passphraseMode}
                onChange={(val) => handleSettingChange(setPassphraseMode, val)}
                tooltip="Generate word-based passphrases"
              />
              <CheckboxToggle
                label="PIN Mode"
                checked={pinMode}
                onChange={(val) => handleSettingChange(setPinMode, val)}
                tooltip="Generate numeric PINs"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Active Modes Indicator */}
      {(memorableMode || passphraseMode || pinMode) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`p-3 rounded-lg text-sm ${
            isDarkMode ? 'bg-secondary-600/20 text-secondary-300' : 'bg-secondary-100 text-secondary-700'
          }`}
        >
          🎯 Special mode active:
          <span className="font-semibold ml-2">
            {memorableMode && 'Memorable '}
            {passphraseMode && 'Passphrase '}
            {pinMode && 'PIN'}
          </span>
        </motion.div>
      )}
    </motion.div>
  )
}

export default PasswordSettings
