import { configureStore } from '@reduxjs/toolkit'
import formSchemaReducer from '../features/formSchemaSlice'

export const store = configureStore({
  reducer: {
    formSchema: formSchemaReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
