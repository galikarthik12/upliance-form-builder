import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import CreatePage from './pages/CreatePage'
import PreviewPage from './pages/PreviewPage'
import MyFormsPage from './pages/MyFormsPage'
import ResponsesPage from "./pages/ResponsesPage";

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/create">Create</Link> |{' '}
        <Link to="/preview">Preview</Link> |{' '}
        <Link to="/myforms">My Forms</Link>
      </nav>
      <Routes>
        <Route path="/create" element={<CreatePage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/myforms" element={<MyFormsPage />} />
<Route path="/responses/:formId" element={<ResponsesPage />} />

      </Routes>
    </Router>
  )
}
