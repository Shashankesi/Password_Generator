import React, { useEffect, useRef } from 'react'
import { usePasswordStore } from './store/passwordStore'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PasswordCard from './components/PasswordCard'
import StrengthMeter from './components/StrengthMeter'
import PasswordSettings from './components/PasswordSettings'
import Analytics from './components/Analytics'
import HistoryPanel from './components/HistoryPanel'
import SavedPasswords from './components/SavedPasswords'
import SecurityTips from './components/SecurityTips'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const {
    isDarkMode,
    setIsDarkMode,
    selectedTab,
    setSelectedTab,
  } = usePasswordStore()

  const appRef = useRef(null)

  // Handle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      document.body.classList.remove('light')
    } else {
      document.documentElement.classList.remove('dark')
      document.body.classList.add('light')
    }
  }, [isDarkMode])

  return (
    <div
      ref={appRef}
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-dark-900 text-gray-100' : 'bg-light-bg text-gray-900'
      }`}
    >
      {/* Animated Background */}
      <div className="animated-bg" />
      <ParticleBackground />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <Hero />

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 justify-center my-8">
          {['generator', 'saved', 'analytics', 'history', 'tips', 'faq'].map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 md:px-6 py-2 rounded-lg font-medium transition-all capitalize text-sm md:text-base ${
                selectedTab === tab
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg shadow-primary-600/50'
                  : isDarkMode
                  ? 'bg-dark-700/50 text-gray-300 hover:bg-dark-600 border border-dark-600'
                  : 'bg-white/50 text-gray-700 hover:bg-white border border-gray-200'
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        {/* Generator Tab */}
        {selectedTab === 'generator' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6 animate-fade-in"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Password Display */}
                <PasswordCard />

                {/* Strength Meter */}
                <StrengthMeter />

                {/* Settings */}
                <PasswordSettings />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <HistoryPanel />
              </div>
            </div>
          </motion.div>
        )}

        {/* Saved Passwords Tab */}
        {selectedTab === 'saved' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="animate-fade-in"
          >
            <div className={`glass rounded-2xl p-6`}>
              <SavedPasswords expandedView={true} />
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {selectedTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="animate-fade-in"
          >
            <Analytics />
          </motion.div>
        )}

        {/* History Tab */}
        {selectedTab === 'history' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="animate-fade-in"
          >
            <div className={`glass rounded-lg p-6`}>
              <HistoryPanel expandedView={true} />
            </div>
          </motion.div>
        )}

        {/* Security Tips Tab */}
        {selectedTab === 'tips' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="animate-fade-in"
          >
            <SecurityTips />
          </motion.div>
        )}

        {/* FAQ Tab */}
        {selectedTab === 'faq' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="animate-fade-in"
          >
            <FAQ />
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? 'dark' : 'light'}
      />
    </div>
  )
}

import { motion } from 'framer-motion'
export default App
