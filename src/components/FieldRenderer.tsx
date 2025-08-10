import type { Field } from '../types/formTypes'

interface Props {
  field: Field
  value: any
  onChange: (id: string, value: any) => void
}

export default function FieldRenderer({ field, value, onChange }: Props) {
  // Text / Email / Number
  if (field.type === 'text' || field.type === 'email' || field.type === 'number') {
    return (
      <div>
        <label>{field.label}</label>
        <input
          type={field.type}
          value={value ?? field.defaultValue ?? ''}
          onChange={e => onChange(field.id, e.target.value)}
        />
      </div>
    )
  }

  // ✅ Textarea
  if (field.type === 'textarea') {
    return (
      <div>
        <label>{field.label}</label>
        <textarea
          value={value ?? field.defaultValue ?? ''}
          onChange={e => onChange(field.id, e.target.value)}
        />
      </div>
    )
  }

  // Dropdown (Select)
  if (field.type === 'select') {
    return (
      <div>
        <label>{field.label}</label>
        <select
          value={value ?? field.defaultValue ?? ''}
          onChange={e => onChange(field.id, e.target.value)}
        >
          <option value="">Select...</option>
          {field.options?.map(opt => (
            <option key={opt.id} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    )
  }

  // Radio Buttons
  if (field.type === 'radio') {
    return (
      <div>
        <label>{field.label}</label>
        {field.options?.map(opt => (
          <div key={opt.id}>
            <input
              type="radio"
              name={field.id}
              value={opt.value}
              checked={(value ?? field.defaultValue) === opt.value}
              onChange={e => onChange(field.id, e.target.value)}
            />
            {opt.label}
          </div>
        ))}
      </div>
    )
  }

  // Checkbox
  if (field.type === 'checkbox') {
    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={value ?? field.defaultValue ?? false}
            onChange={e => onChange(field.id, e.target.checked)}
          />
          {field.label}
        </label>
      </div>
    )
  }

  // Date Picker
  if (field.type === 'date') {
    return (
      <div>
        <label>{field.label}</label>
        <input
          type="date"
          value={value ?? field.defaultValue ?? ''}
          onChange={e => onChange(field.id, e.target.value)}
        />
      </div>
    )
  }

  return null
}
