import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import { usePasswordStore } from '../store/passwordStore'

const FAQ = () => {
  const { isDarkMode } = usePasswordStore()
  const [expandedIndex, setExpandedIndex] = useState(null)

  const faqs = [
    {
      question: 'Is my password data stored on your servers?',
      answer:
        'No, absolutely not. This is a client-side application. All password generation happens locally in your browser. We never store, collect, or transmit any passwords you generate. Your data stays on your device.',
    },
    {
      question: 'How secure are the passwords generated?',
      answer:
        'Very secure. Our generator uses the browser\'s native random number generation (crypto.getRandomValues()) which is cryptographically secure. Combined with a large character set and adjustable length, generated passwords are extremely difficult to crack.',
    },
    {
      question: 'Can I use these passwords for all my accounts?',
      answer:
        'Yes, you can use SecurePass-generated passwords for any online account. We recommend using unique passwords for each service. If one account is compromised, your other accounts remain safe.',
    },
    {
      question: 'What if I forgot a saved password?',
      answer:
        'Saved passwords are stored in your browser\'s localStorage. If you clear your browser data or cookies, saved passwords will be deleted. We recommend using a dedicated password manager like Bitwarden, 1Password, or KeePass as a backup.',
    },
    {
      question: 'How do I backup my passwords?',
      answer:
        'You can export your saved passwords as CSV or TXT files using the export feature. Store these files in a secure location. For long-term storage, consider using a professional password manager with cloud backup.',
    },
    {
      question: 'What\'s the difference between memorable and passphrase modes?',
      answer:
        'Memorable mode generates pronounceable passwords (e.g., "habusetu"). Passphrase mode generates word-based passwords with hyphens (e.g., "cyber-phoenix-tiger-2024"). Passphrases are easier to remember but slightly weaker than random passwords.',
    },
    {
      question: 'How does the strength meter work?',
      answer:
        'The strength meter analyzes multiple factors: length, character variety, entropy, and patterns. It detects weak patterns like repeated characters, dictionary words, and keyboard patterns. A score of 60+ is considered strong.',
    },
    {
      question: 'Can I use this offline?',
      answer:
        'Yes! After the initial page load, this app works completely offline. All password generation happens in your browser without needing an internet connection.',
    },
    {
      question: 'What are "Similar Characters" and "Ambiguous Symbols"?',
      answer:
        'Similar characters like O/0 and l/I can be confused visually. Ambiguous symbols like {} [] () <> can look unclear in certain fonts. Excluding these prevents confusion when writing down or manually entering passwords.',
    },
    {
      question: 'Is there a mobile app?',
      answer:
        'SecurePass is a responsive web app that works on mobile browsers. You can add it to your home screen for quick access. We\'re considering native mobile apps in the future.',
    },
    {
      question: 'Can I import passwords from another generator?',
      answer:
        'Yes, if you export passwords from another generator as CSV or TXT, you can copy-paste them into SecurePass and save them. We also support importing settings from exported JSON files.',
    },
    {
      question: 'Is SecurePass open source?',
      answer:
        'SecurePass is built with modern web technologies (React, Tailwind CSS, Zustand). The source code is available on GitHub. You can review it, contribute, or self-host it.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-4xl mx-auto"
    >
      <div className="text-center space-y-2 mb-8">
        <h2 className={`text-3xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Frequently Asked Questions</h2>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          Find answers to common questions about SecurePass
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`rounded-xl overflow-hidden border transition-all ${
              isDarkMode
                ? 'glass bg-dark-800/40 border-primary-500/20'
                : 'bg-white/80 border-primary-400/30 shadow-md'
            }`}
          >
            <motion.button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className={`w-full px-6 py-4 flex items-center justify-between transition-colors ${
                isDarkMode
                  ? 'hover:bg-dark-700/50'
                  : 'hover:bg-primary-100/50'
              }`}
            >
              <h3 className={`text-lg font-semibold text-left ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{faq.question}</h3>
              <motion.div
                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={`flex-shrink-0 ml-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                <FiChevronDown size={20} />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`px-6 py-4 border-t ${
                    isDarkMode
                      ? 'border-dark-700/50 text-gray-300'
                      : 'border-primary-400/20 text-gray-700'
                  }`}
                >
                  <p className="leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      {/* Still Have Questions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`rounded-xl p-8 text-center space-y-4 mt-12 border transition-all ${
          isDarkMode
            ? 'glass bg-dark-800/40 border-primary-500/20'
            : 'bg-white/80 border-primary-400/30 shadow-lg'
        }`}
      >
        <h3 className="text-2xl font-bold">Still have questions?</h3>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          Feel free to reach out to us on GitHub or Twitter
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-lg font-semibold bg-primary-600 text-white hover:shadow-lg"
          >
            GitHub
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-2 rounded-lg font-semibold border-2 transition-all ${
              isDarkMode
                ? 'border-primary-600 text-primary-400 hover:bg-primary-600/10'
                : 'border-primary-500 text-primary-600 hover:bg-primary-50'
            }`}
          >
            Twitter
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default FAQ
