import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useState, useEffect } from "react";
import FieldRenderer from "../components/FieldRenderer";
import { validateValue } from "../utils/validators";
import { evaluateDerived } from "../utils/derived";
import type { Field } from "../types/formTypes";

export default function PreviewPage() {
  const form = useSelector((state: RootState) => state.formSchema.currentForm);
  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  // Recalculate derived fields when dependencies change
  useEffect(() => {
    const derivedValues: Record<string, any> = {};
    form.fields.forEach((f: Field) => {
      if (f.derived?.isDerived && f.derived.expression) {
        derivedValues[f.id] = evaluateDerived(f.derived.expression, values);
      }
    });
    if (Object.keys(derivedValues).length > 0) {
      setValues((prev) => ({ ...prev, ...derivedValues }));
    }
  }, [values, form.fields]);

  const handleChange = (id: string, value: any) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string | null> = {};
    form.fields.forEach((f: Field) => {
      newErrors[f.id] = validateValue(values[f.id], f.validation);
    });
    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((err) => err !== null);
    if (!hasError) {
      // ✅ Save response to localStorage
      const key = `responses_${form.id}`;
      const existingResponses = JSON.parse(localStorage.getItem(key) || "[]");
      existingResponses.push(values);
      localStorage.setItem(key, JSON.stringify(existingResponses));

      alert("Form submitted successfully!");
      setValues({}); // Clear form after submit
    }
  };

  if (!form.fields || form.fields.length === 0) {
    return <p>No fields to preview</p>;
  }

  return (
    <div>
      <h2>{form.name}</h2>
      {form.fields.map((f) => (
        <div key={f.id} style={{ marginBottom: "12px" }}>
          <FieldRenderer field={f} value={values[f.id]} onChange={handleChange} />
          {errors[f.id] && (
            <p style={{ color: "red", fontSize: "14px" }}>{errors[f.id]}</p>
          )}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
