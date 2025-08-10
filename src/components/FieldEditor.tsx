import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { addField } from "../features/formSchemaSlice";
import { v4 as uuidv4 } from "uuid";
import type { Field, FieldValidation, FieldType, FieldOption } from "../types/formTypes";

export default function FieldEditor() {
  const [label, setLabel] = useState("");
  const [type, setType] = useState<FieldType>("text");
  const [defaultValue, setDefaultValue] = useState("");
  const [validation, setValidation] = useState<FieldValidation>({});
  const [options, setOptions] = useState<FieldOption[]>([]);
  const [optionLabel, setOptionLabel] = useState("");
  const [optionValue, setOptionValue] = useState("");

  // ✅ Derived field state
  const [isDerived, setIsDerived] = useState(false);
  const [parents, setParents] = useState<string[]>([]);
  const [expression, setExpression] = useState("");

  const dispatch = useDispatch();
  const existingFields = useSelector((state: RootState) => state.formSchema.currentForm.fields);

  const handleAddOption = () => {
    if (!optionLabel.trim() || !optionValue.trim()) return;
    setOptions((prev) => [
      ...prev,
      { id: uuidv4(), label: optionLabel, value: optionValue },
    ]);
    setOptionLabel("");
    setOptionValue("");
  };

  const handleAdd = () => {
    if (!label.trim()) return;

    const newField: Field = {
      id: uuidv4(),
      label,
      type,
      defaultValue: defaultValue || undefined,
      validation,
      options: type === "select" || type === "radio" ? options : undefined,
      derived: isDerived
        ? { isDerived, parents, expression }
        : undefined,
    };

    dispatch(addField(newField));

    // reset
    setLabel("");
    setDefaultValue("");
    setType("text");
    setValidation({});
    setOptions([]);
    setIsDerived(false);
    setParents([]);
    setExpression("");
  };

  const handleValidationChange = (key: keyof FieldValidation, value: any) => {
    setValidation((prev) => ({ ...prev, [key]: value }));
  };

  const toggleParent = (fieldId: string) => {
    setParents((prev) =>
      prev.includes(fieldId)
        ? prev.filter((id) => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "12px", marginBottom: "12px" }}>
      <h3>Add Field</h3>

      {/* Label */}
      <input
        placeholder="Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        style={{ display: "block", marginBottom: "8px", width: "100%" }}
      />

      {/* Type */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value as FieldType)}
        style={{ display: "block", marginBottom: "8px", width: "100%" }}
      >
        <option value="text">Text</option>
        <option value="textarea">Textarea</option>
        <option value="number">Number</option>
        <option value="email">Email</option>
        <option value="select">Dropdown</option>
        <option value="radio">Radio Buttons</option>
        <option value="checkbox">Checkbox</option>
        <option value="date">Date</option>
      </select>

      {/* Default Value */}
      <input
        placeholder="Default Value"
        value={defaultValue}
        onChange={(e) => setDefaultValue(e.target.value)}
        style={{ display: "block", marginBottom: "8px", width: "100%" }}
      />

      {/* Options for select/radio */}
      {(type === "select" || type === "radio") && (
        <div style={{ marginBottom: "8px" }}>
          <strong>Options:</strong>
          <div>
            <input
              placeholder="Option Label"
              value={optionLabel}
              onChange={(e) => setOptionLabel(e.target.value)}
              style={{ marginRight: "4px" }}
            />
            <input
              placeholder="Option Value"
              value={optionValue}
              onChange={(e) => setOptionValue(e.target.value)}
              style={{ marginRight: "4px" }}
            />
            <button onClick={handleAddOption}>Add Option</button>
          </div>
          <ul>
            {options.map((opt) => (
              <li key={opt.id}>
                {opt.label} ({opt.value})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Validation */}
      <div style={{ marginTop: "10px" }}>
        <label>
          <input
            type="checkbox"
            checked={!!validation.notEmpty}
            onChange={(e) => handleValidationChange("notEmpty", e.target.checked)}
          /> Required
        </label>
      </div>

      {/* ✅ Derived Field Controls */}
      <div style={{ marginTop: "12px", padding: "8px", border: "1px dashed gray" }}>
        <label>
          <input
            type="checkbox"
            checked={isDerived}
            onChange={(e) => setIsDerived(e.target.checked)}
          /> This is a Derived Field
        </label>

        {isDerived && (
          <>
            <div style={{ marginTop: "8px" }}>
              <strong>Select Parent Fields:</strong>
              {existingFields.length === 0 && <p>No fields yet</p>}
              {existingFields.map((f) => (
                <div key={f.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={parents.includes(f.id)}
                      onChange={() => toggleParent(f.id)}
                    /> {f.label}
                  </label>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "8px" }}>
              <input
                placeholder="Expression (e.g., field1 + field2)"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
          </>
        )}
      </div>

      {/* Add Button */}
      <button onClick={handleAdd} style={{ marginTop: "12px" }}>
        Add Field
      </button>
    </div>
  );
}
