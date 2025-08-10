export type FieldType =
  | "text"
  | "number"
  | "email"
  | "select"
  | "radio"
  | "checkbox"
  | "date"
  | "textarea" // ✅ new type

export interface FieldOption {
  id: string
  label: string
  value: string
}

export interface FieldValidation {
  notEmpty?: boolean
  minLength?: number
  maxLength?: number
  email?: boolean
  customPassword?: boolean
}

export interface Field {
  id: string
  label: string
  type: FieldType
  options?: FieldOption[]
  validation?: FieldValidation
  defaultValue?: any // ✅ make sure we store default value
  derived?: {
    isDerived: boolean
    parents: string[]
    expression: string
  }
}

export interface FormSchema {
  id: string
  name: string
  createdAt: string
  fields: Field[]
}
