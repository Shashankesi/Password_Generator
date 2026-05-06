// Utility functions for password generation and analysis

export const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
export const NUMBERS = '0123456789'
export const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'
export const SIMILAR_CHARS = 'OI0il1'

// Wordlist for memorable passwords
const WORDLIST = [
  'cyber', 'secure', 'quantum', 'digital', 'network', 'crypto', 'matrix', 'neural',
  'cloud', 'swift', 'rapid', 'dynamic', 'bright', 'swift', 'phoenix', 'titan',
  'apex', 'zenith', 'nexus', 'aurora', 'nova', 'stellar', 'cosmic', 'solar',
  'lunar', 'fusion', 'prism', 'echo', 'pulse', 'surge', 'wave', 'storm',
]

/**
 * Generates a random password based on specified criteria
 */
export const generatePassword = ({
  length = 16,
  useUppercase = true,
  useLowercase = true,
  useNumbers = true,
  useSymbols = true,
  excludeSimilar = false,
  avoidAmbiguous = false,
  customSymbols = '',
  memorable = false,
  passphrase = false,
  pin = false,
} = {}) => {
  if (pin) {
    return generatePin(length)
  }

  if (passphrase) {
    return generatePassphrase(length)
  }

  if (memorable) {
    return generateMemorable(length)
  }

  let characters = ''
  
  if (useUppercase) characters += excludeSimilar ? UPPERCASE.replace(/[OI]/g, '') : UPPERCASE
  if (useLowercase) characters += excludeSimilar ? LOWERCASE.replace(/[il]/g, '') : LOWERCASE
  if (useNumbers) characters += excludeSimilar ? NUMBERS.replace(/[01]/g, '') : NUMBERS
  if (useSymbols) characters += customSymbols || (avoidAmbiguous ? SYMBOLS.replace(/[<>()]/g, '') : SYMBOLS)

  if (!characters) characters = LOWERCASE

  let password = ''
  const charArray = characters.split('')

  for (let i = 0; i < length; i++) {
    password += charArray[Math.floor(Math.random() * charArray.length)]
  }

  return password
}

/**
 * Generates a memorable/pronounceable password
 */
export const generateMemorable = (length = 16) => {
  const consonants = 'bcdfghjkmnpqrstvwxyz'
  const vowels = 'aeiou'
  let password = ''

  for (let i = 0; i < length; i++) {
    if (i % 2 === 0) {
      password += consonants[Math.floor(Math.random() * consonants.length)]
    } else {
      password += vowels[Math.floor(Math.random() * vowels.length)]
    }
  }

  return password
}

/**
 * Generates a passphrase from wordlist
 */
export const generatePassphrase = (wordCount = 4) => {
  const words = []
  for (let i = 0; i < wordCount; i++) {
    words.push(WORDLIST[Math.floor(Math.random() * WORDLIST.length)])
  }
  return words.join('-') + Math.floor(Math.random() * 100)
}

/**
 * Generates a numeric PIN
 */
export const generatePin = (length = 4) => {
  let pin = ''
  for (let i = 0; i < length; i++) {
    pin += Math.floor(Math.random() * 10)
  }
  return pin
}

/**
 * Calculates password strength
 */
export const calculatePasswordStrength = (password) => {
  if (!password) return { strength: 'Weak', score: 0, color: 'red' }

  let score = 0
  let feedback = []

  // Length scoring
  if (password.length >= 8) score += 20
  if (password.length >= 12) score += 10
  if (password.length >= 16) score += 10
  if (password.length >= 20) score += 10

  // Character variety
  if (/[a-z]/.test(password)) score += 15
  if (/[A-Z]/.test(password)) score += 15
  if (/[0-9]/.test(password)) score += 15
  if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) score += 15

  // Patterns (reduce score for weak patterns)
  if (/(.)\1{2,}/.test(password)) score -= 10 // Repeated characters
  if (/^[a-z]+$/i.test(password)) score -= 10 // Only letters
  if (/^\d+$/.test(password)) score -= 15 // Only numbers
  if (/^[a-z0-9]*$/i.test(password)) score -= 5 // No symbols

  // Common patterns
  if (/^[a-z]{1,3}[0-9]{1,3}$/i.test(password)) score -= 15
  if (/(?:123|234|345|456|567|678|789|890|012)/.test(password)) score -= 10

  score = Math.max(0, Math.min(100, score))

  let strength = 'Weak'
  let color = 'text-red-500'

  if (score >= 80) {
    strength = 'Very Strong'
    color = 'text-green-500'
  } else if (score >= 60) {
    strength = 'Strong'
    color = 'text-lime-500'
  } else if (score >= 40) {
    strength = 'Medium'
    color = 'text-yellow-500'
  }

  return { strength, score, color }
}

/**
 * Calculates password entropy
 */
export const calculateEntropy = (password) => {
  let charset = 0

  if (/[a-z]/.test(password)) charset += 26
  if (/[A-Z]/.test(password)) charset += 26
  if (/[0-9]/.test(password)) charset += 10
  if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) charset += 32

  const entropy = Math.log2(Math.pow(charset, password.length))
  return entropy.toFixed(2)
}

/**
 * Estimates how long it would take to crack the password
 * Assuming 10^10 guesses per second
 */
export const estimateCrackTime = (password) => {
  const entropy = Math.log2(
    Math.pow(
      getCharsetSize(password),
      password.length
    )
  )
  
  const guessesPerSecond = 1e10
  const secondsToCrack = Math.pow(2, entropy) / 2 / guessesPerSecond

  if (secondsToCrack < 1) return '< 1 second'
  if (secondsToCrack < 60) return `${Math.round(secondsToCrack)} seconds`
  if (secondsToCrack < 3600) return `${Math.round(secondsToCrack / 60)} minutes`
  if (secondsToCrack < 86400) return `${Math.round(secondsToCrack / 3600)} hours`
  if (secondsToCrack < 2592000) return `${Math.round(secondsToCrack / 86400)} days`
  if (secondsToCrack < 31536000) return `${Math.round(secondsToCrack / 2592000)} months`
  return `${Math.round(secondsToCrack / 31536000)} years`
}

/**
 * Gets the charset size for a password
 */
const getCharsetSize = (password) => {
  let charset = 0

  if (/[a-z]/.test(password)) charset += 26
  if (/[A-Z]/.test(password)) charset += 26
  if (/[0-9]/.test(password)) charset += 10
  if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) charset += 32

  return Math.max(charset, 1)
}

/**
 * Analyzes character distribution in password
 */
export const analyzeCharacterDistribution = (password) => {
  return {
    uppercase: (password.match(/[A-Z]/g) || []).length,
    lowercase: (password.match(/[a-z]/g) || []).length,
    numbers: (password.match(/[0-9]/g) || []).length,
    symbols: (password.match(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/g) || []).length,
  }
}

/**
 * Detects weak patterns in password
 */
export const detectWeakPatterns = (password) => {
  const patterns = []

  if (/(.)\1{2,}/.test(password)) patterns.push('Repeated characters detected')
  if (/^[a-z]+$/i.test(password)) patterns.push('Only letters')
  if (/^\d+$/.test(password)) patterns.push('Only numbers')
  if (/(?:123|234|345|456|567|678|789|890|012)/.test(password)) patterns.push('Sequential characters')
  if (/(?:qwerty|asdf|zxcv)/i.test(password)) patterns.push('Keyboard pattern')

  return patterns
}

/**
 * Generates username suggestions based on common patterns
 */
export const generateUsernamesuggestions = (count = 5) => {
  const adjectives = ['cyber', 'digital', 'quantum', 'swift', 'bright', 'dynamic']
  const nouns = ['phoenix', 'tiger', 'eagle', 'wolf', 'bear', 'dragon']
  const suggestions = []

  for (let i = 0; i < count; i++) {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
    const noun = nouns[Math.floor(Math.random() * nouns.length)]
    const num = Math.floor(Math.random() * 9999)
    suggestions.push(`${adj}${noun}${num}`)
  }

  return suggestions
}

/**
 * Exports passwords as CSV
 */
export const exportAsCSV = (passwords) => {
  let csv = 'Password,Label,Saved At\n'
  
  passwords.forEach((pass) => {
    csv += `"${pass.password}","${pass.label || 'Untitled'}","${pass.savedAt}"\n`
  })

  return csv
}

/**
 * Exports passwords as TXT
 */
export const exportAsTXT = (passwords) => {
  let txt = 'SAVED PASSWORDS\n'
  txt += '================\n'
  txt += `Generated on: ${new Date().toLocaleString()}\n\n`

  passwords.forEach((pass, index) => {
    txt += `${index + 1}. ${pass.label || 'Untitled'}\n`
    txt += `   Password: ${pass.password}\n`
    txt += `   Saved: ${pass.savedAt}\n\n`
  })

  return txt
}

/**
 * Generates QR code data
 */
export const generateQRCodeData = (password) => {
  return `otpauth://totp/SecurePass?secret=${btoa(password)}&issuer=SecurePass`
}

/**
 * Validates password strength
 */
export const isPasswordStrong = (password) => {
  const { score } = calculatePasswordStrength(password)
  return score >= 60
}
