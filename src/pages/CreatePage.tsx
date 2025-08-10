import FieldEditor from "../components/FieldEditor";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { saveCurrentForm, removeField, setFormName } from "../features/formSchemaSlice";

export default function CreatePage() {
  const form = useSelector((state: RootState) => state.formSchema.currentForm);
  const dispatch = useDispatch();

  const handleSave = () => {
    if (!form.name.trim()) {
      alert("Please enter a form name before saving.");
      return;
    }
    dispatch(saveCurrentForm());
    alert("Form saved!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Form</h2>

      {/* Form Name Input */}
      <input
        placeholder="Enter form name"
        value={form.name}
        onChange={(e) => dispatch(setFormName(e.target.value))}
        style={{
          display: "block",
          marginBottom: "12px",
          padding: "6px",
          fontSize: "16px",
          width: "100%"
        }}
      />

      {/* Field Editor */}
      <FieldEditor />

{/* List of Fields */}
<h3>Fields</h3>
{form.fields.length === 0 && <p>No fields yet</p>}
{form.fields.map((f) => (
  <div
    key={f.id}
    style={{
      border: "1px solid #ccc",
      padding: "8px",
      marginBottom: "8px"
    }}
  >
    <strong>{f.label}</strong> ({f.type})
    {f.defaultValue && <div>Default: {f.defaultValue}</div>} {/* ✅ */}
    {f.options && f.options.length > 0 && (
      <ul>
        {f.options.map((opt) => (
          <li key={opt.id}>
            {opt.label} ({opt.value})
          </li>
        ))}
      </ul>
    )}
    <button onClick={() => dispatch(removeField(f.id))}>Remove</button>
  </div>
))}

      {/* Save Button */}
      <button
        onClick={handleSave}
        style={{ marginTop: "12px", background: "green", color: "white" }}
      >
        Save Form
      </button>
    </div>
  );
}
