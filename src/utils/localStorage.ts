import type { FormSchema } from '../types/formTypes'

// Load all forms
export function loadFormsFromStorage(): FormSchema[] {
  const data = localStorage.getItem('forms')
  return data ? JSON.parse(data) : []
}

// Save a form
export function saveFormToStorage(form: FormSchema) {
  const forms = loadFormsFromStorage()
  forms.push(form)
  localStorage.setItem('forms', JSON.stringify(forms))
}

// ✅ Save responses for a form
export function saveFormResponse(formId: string, response: Record<string, any>) {
  const key = `responses_${formId}`
  const existing = localStorage.getItem(key)
  const responses = existing ? JSON.parse(existing) : []
  responses.push({
    submittedAt: new Date().toISOString(),
    data: response
  })
  localStorage.setItem(key, JSON.stringify(responses))
}

// ✅ Load responses for a form
export function loadFormResponses(formId: string) {
  const key = `responses_${formId}`
  const existing = localStorage.getItem(key)
  return existing ? JSON.parse(existing) : []
}
