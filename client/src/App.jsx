import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Form from './pages/Form.jsx';
import Audit from './pages/Audit.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/audit/:id" element={<Audit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
