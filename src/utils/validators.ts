import type { FieldValidation } from '../types/formTypes'

/**
 * Validates a value based on the field's validation rules.
 * @param value The input value from the form field
 * @param rules The validation rules from the field schema
 * @returns An error message string if validation fails, otherwise null
 */
export function validateValue(value: any, rules?: FieldValidation): string | null {
  if (!rules) return null

  // Required / Not empty
  if (rules.notEmpty) {
    if (value === null || value === undefined || value === '') {
      return 'This field is required'
    }
  }

  // Minimum length
  if (rules.minLength !== undefined && typeof value === 'string') {
    if (value.length < rules.minLength) {
      return `Minimum length is ${rules.minLength} characters`
    }
  }

  // Maximum length
  if (rules.maxLength !== undefined && typeof value === 'string') {
    if (value.length > rules.maxLength) {
      return `Maximum length is ${rules.maxLength} characters`
    }
  }

  // Email format
  if (rules.email && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Invalid email format'
    }
  }

  // Custom password rule (example: at least one uppercase, number, and special char)
  if (rules.customPassword && value) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/
    if (!passwordRegex.test(value)) {
      return 'Password must contain an uppercase letter, a number, and a special character'
    }
  }

  return null // ✅ No errors
}
