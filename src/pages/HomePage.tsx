import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  const sessions = [1, 2, 3, 4];

  return (
    <div className="home-page">
      <div className="home-header">
        <div className="rainbow-bar"></div>
        
        <h1 className="home-title slide-down">
          Fichas que Caem
        </h1>
        
        <p className="home-subtitle fade-in">
          Um espaço acolhedor para compartilhar aprendizados, sentimentos e reflexões
        </p>

        <div className="home-description fade-in">
          <p>
            Durante este evento, coletaremos suas percepções em cada sessão.
            Suas palavras formarão uma nuvem colaborativa que reflete nossa jornada coletiva
            de diversidade, equidade e inclusão.
          </p>
        </div>
      </div>

      <div className="sessions-grid fade-in">
        <h2 className="sessions-heading">Escolha uma sessão</h2>
        
        <div className="session-cards">
          {sessions.map((sessionId) => (
            <div key={sessionId} className="session-card">
              <div className="card-number">
                Sessão {sessionId}
              </div>
              
              <div className="card-actions">
                <Link
                  to={`/sessao/${sessionId}`}
                  className="card-button primary"
                >
                  Enviar feedback
                </Link>
                
                <Link
                  to={`/sessao/${sessionId}/resultados`}
                  className="card-button secondary"
                >
                  Ver nuvem de palavras
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="home-footer">
        <div className="footer-icon">🌈</div>
        <p>
          Este é um espaço seguro, anônimo e inclusivo.
          Todas as vozes são bem-vindas e valorizadas.
        </p>
      </footer>

      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>
    </div>
  );
}
