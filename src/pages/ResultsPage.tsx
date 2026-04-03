import { useParams, Link } from 'react-router-dom';
import WordCloudDisplay from '../components/WordCloudDisplay';
import './ResultsPage.css';

export default function ResultsPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const sessionNumber = parseInt(sessionId || '1', 10);

  // Validar sessionId
  if (isNaN(sessionNumber) || sessionNumber < 1 || sessionNumber > 4) {
    return (
      <div className="error-page">
        <h1>Sessão não encontrada</h1>
        <p>Por favor, escolha uma sessão válida (1 a 4).</p>
        <Link to="/" className="back-link">
          Voltar para o início
        </Link>
      </div>
    );
  }

  return (
    <div className="results-page">
      <div className="results-header">
        <div className="rainbow-bar"></div>
        
        <h1 className="results-title slide-down">
          Nuvem de Palavras
        </h1>
        
        <div className="session-info fade-in">
          <span className="session-label">Sessão {sessionNumber}</span>
        </div>

        <p className="results-subtitle">
          Estas são as palavras mais mencionadas pelos participantes
        </p>
      </div>

      <div className="results-content fade-in">
        <WordCloudDisplay sessionId={sessionNumber} />
      </div>

      <div className="results-footer">
        <Link to={`/sessao/${sessionNumber}`} className="back-button">
          ← Voltar para a sessão {sessionNumber}
        </Link>
      </div>

      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </div>
  );
}
