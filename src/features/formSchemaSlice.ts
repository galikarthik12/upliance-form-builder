import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FormSchema, Field } from "../types/formTypes";
import { loadFormsFromStorage, saveFormToStorage } from "../utils/localStorage";

interface FormState {
  currentForm: FormSchema;
  savedForms: FormSchema[];
}

const initialState: FormState = {
  currentForm: {
    id: Date.now().toString(),
    name: "Untitled Form",
    createdAt: new Date().toISOString(),
    fields: []
  },
  savedForms: loadFormsFromStorage()
};

const formSchemaSlice = createSlice({
  name: "formSchema",
  initialState,
  reducers: {
    // ✅ For setting the form name dynamically
    setFormName(state, action: PayloadAction<string>) {
      state.currentForm.name = action.payload;
    },

    // ✅ For loading a specific form
    setCurrentForm(state, action: PayloadAction<FormSchema>) {
      state.currentForm = action.payload;
    },

    addField(state, action: PayloadAction<Field>) {
      state.currentForm.fields.push(action.payload);
    },

    removeField(state, action: PayloadAction<string>) {
      state.currentForm.fields = state.currentForm.fields.filter(
        (f) => f.id !== action.payload
      );
    },

    saveCurrentForm(state) {
      saveFormToStorage(state.currentForm);
      state.savedForms = loadFormsFromStorage();
    }
  }
});

export const {
  setFormName,
  setCurrentForm,
  addField,
  removeField,
  saveCurrentForm
} = formSchemaSlice.actions;

export default formSchemaSlice.reducer;
