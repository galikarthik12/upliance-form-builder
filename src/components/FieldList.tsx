import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../app/store'
import { removeField } from '../features/formSchemaSlice'

export default function FieldList() {
  const fields = useSelector((state: RootState) => state.formSchema.currentForm.fields)
  const dispatch = useDispatch()

  return (
    <div>
      <h3>Fields</h3>
      {fields.length === 0 && <p>No fields yet</p>}
      <ul>
        {fields.map(f => (
          <li key={f.id}>
            {f.label} ({f.type})
            <button onClick={() => dispatch(removeField(f.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
