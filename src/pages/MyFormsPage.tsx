import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { loadFormsFromStorage } from "../utils/localStorage";
import { setCurrentForm } from "../features/formSchemaSlice";
import { useNavigate } from "react-router-dom";

export default function MyFormsPage() {
  const savedForms = useSelector(
    (state: RootState) => state.formSchema.savedForms
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoadForm = (id: string) => {
    const forms = loadFormsFromStorage();
    const selected = forms.find((f) => f.id === id);
    if (selected) {
      dispatch(setCurrentForm(selected));
      navigate("/preview");
    }
  };

  const handleViewResponses = (id: string) => {
    navigate(`/responses/${id}`);
  };

  return (
    <div>
      <h2>My Forms</h2>
      {savedForms.length === 0 && <p>No forms saved yet</p>}
      <ul>
        {savedForms.map((form) => (
          <li key={form.id} style={{ marginBottom: "8px" }}>
            <strong>{form.name}</strong> (
            {new Date(form.createdAt).toLocaleString()})
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => handleLoadForm(form.id)}
            >
              Load
            </button>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => handleViewResponses(form.id)}
            >
              View Responses
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
