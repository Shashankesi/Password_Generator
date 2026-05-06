import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Password Generator Store using Zustand
export const usePasswordStore = create(
  persist(
    (set, get) => ({
      // Core password state
      password: '',
      passwordLength: 16,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
      
      // Advanced settings
      excludeSimilar: false,
      avoidAmbiguous: false,
      customSymbols: '!@#$%^&*',
      memorableMode: false,
      passphraseMode: false,
      pinMode: false,
      
      // Theme
      isDarkMode: true,
      
      // History and saved
      history: [],
      savedPasswords: [],
      
      // UI state
      showPassword: false,
      isGenerating: false,
      clipboardMessage: '',
      selectedTab: 'generator',
      
      // Analytics
      securityScore: 0,
      strengthLevel: 'medium',
      estimatedCrackTime: '0s',
      characterCount: 0,
      characterDistribution: {
        uppercase: 0,
        lowercase: 0,
        numbers: 0,
        symbols: 0,
      },
      
      // Actions
      setPassword: (password) => set({ password }),
      setPasswordLength: (length) => set({ passwordLength: length }),
      setIncludeUppercase: (include) => set({ includeUppercase: include }),
      setIncludeLowercase: (include) => set({ includeLowercase: include }),
      setIncludeNumbers: (include) => set({ includeNumbers: include }),
      setIncludeSymbols: (include) => set({ includeSymbols: include }),
      setExcludeSimilar: (exclude) => set({ excludeSimilar: exclude }),
      setAvoidAmbiguous: (avoid) => set({ avoidAmbiguous: avoid }),
      setCustomSymbols: (symbols) => set({ customSymbols: symbols }),
      setMemorableMode: (mode) => set({ memorableMode: mode }),
      setPassphraseMode: (mode) => set({ passphraseMode: mode }),
      setPinMode: (mode) => set({ pinMode: mode }),
      setIsDarkMode: (isDark) => set({ isDarkMode: isDark }),
      setShowPassword: (show) => set({ showPassword: show }),
      setIsGenerating: (isGenerating) => set({ isGenerating }),
      setClipboardMessage: (message) => set({ clipboardMessage: message }),
      setSelectedTab: (tab) => set({ selectedTab: tab }),
      
      // Analytics actions
      setSecurityScore: (score) => set({ securityScore: score }),
      setStrengthLevel: (level) => set({ strengthLevel: level }),
      setEstimatedCrackTime: (time) => set({ estimatedCrackTime: time }),
      setCharacterCount: (count) => set({ characterCount: count }),
      setCharacterDistribution: (distribution) => set({ characterDistribution: distribution }),
      
      // History actions
      addToHistory: (pass) => set((state) => ({
        history: [
          { id: Date.now(), password: pass, timestamp: new Date().toLocaleString() },
          ...state.history.slice(0, 49), // Keep last 50
        ],
      })),
      
      clearHistory: () => set({ history: [] }),
      
      // Saved passwords actions
      savePassword: (pass, label) => set((state) => ({
        savedPasswords: [
          ...state.savedPasswords,
          { id: Date.now(), password: pass, label, savedAt: new Date().toLocaleString() },
        ],
      })),
      
      unsavePassword: (id) => set((state) => ({
        savedPasswords: state.savedPasswords.filter((p) => p.id !== id),
      })),
      
      clearSavedPasswords: () => set({ savedPasswords: [] }),
      
      // Reset to defaults
      resetToDefaults: () => set({
        password: '',
        passwordLength: 16,
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: true,
        excludeSimilar: false,
        avoidAmbiguous: false,
        memorableMode: false,
        passphraseMode: false,
        pinMode: false,
        showPassword: false,
      }),
      
      // Import/Export
      exportSettings: () => {
        const state = get()
        return {
          passwordLength: state.passwordLength,
          includeUppercase: state.includeUppercase,
          includeLowercase: state.includeLowercase,
          includeNumbers: state.includeNumbers,
          includeSymbols: state.includeSymbols,
          excludeSimilar: state.excludeSimilar,
          avoidAmbiguous: state.avoidAmbiguous,
          customSymbols: state.customSymbols,
          memorableMode: state.memorableMode,
          passphraseMode: state.passphraseMode,
          pinMode: state.pinMode,
        }
      },
      
      importSettings: (settings) => set(settings),
    }),
    {
      name: 'password-generator-store',
      partialize: (state) => ({
        passwordLength: state.passwordLength,
        includeUppercase: state.includeUppercase,
        includeLowercase: state.includeLowercase,
        includeNumbers: state.includeNumbers,
        includeSymbols: state.includeSymbols,
        excludeSimilar: state.excludeSimilar,
        avoidAmbiguous: state.avoidAmbiguous,
        customSymbols: state.customSymbols,
        memorableMode: state.memorableMode,
        passphraseMode: state.passphraseMode,
        pinMode: state.pinMode,
        isDarkMode: state.isDarkMode,
        history: state.history,
        savedPasswords: state.savedPasswords,
      }),
    }
  )
)
