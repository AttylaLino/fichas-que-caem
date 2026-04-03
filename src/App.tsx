import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SessionPage from './pages/SessionPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  return (
    <BrowserRouter basename="/fichas-que-caem">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sessao/:sessionId" element={<SessionPage />} />
        <Route path="/sessao/:sessionId/resultados" element={<ResultsPage />} />
        
        {/* Redirecionar qualquer rota não encontrada para a home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
