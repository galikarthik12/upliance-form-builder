import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useEffect, useState } from "react";
import type { FormSchema } from "../types/formTypes";

export default function ResponsesPage() {
  const form: FormSchema = useSelector(
    (state: RootState) => state.formSchema.currentForm
  );
  const [responses, setResponses] = useState<any[]>([]);

  useEffect(() => {
    const key = `responses_${form.id}`;
    const stored = JSON.parse(localStorage.getItem(key) || "[]");

    // ✅ Remove empty responses
    const filtered = stored.filter(
      (r: Record<string, any>) =>
        Object.values(r).some((value) => value !== "" && value !== null && value !== undefined)
    );

    // ✅ Save back to localStorage (permanent cleanup)
    localStorage.setItem(key, JSON.stringify(filtered));

    setResponses(filtered);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        const updated = JSON.parse(e.newValue || "[]").filter(
          (r: Record<string, any>) =>
            Object.values(r).some(
              (value) => value !== "" && value !== null && value !== undefined
            )
        );
        localStorage.setItem(key, JSON.stringify(updated)); // save cleaned data
        setResponses(updated);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [form.id]);

  if (responses.length === 0) {
    return <p>No responses yet</p>;
  }

  return (
    <div>
      <h2>Responses for {form.name}</h2>
      <table border={1} cellPadding={6}>
        <thead>
          <tr>
            {form.fields.map((f) => (
              <th key={f.id}>{f.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {responses.map((r, idx) => (
            <tr key={idx}>
              {form.fields.map((f) => (
                <td key={f.id}>{String(r[f.id] ?? "")}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
