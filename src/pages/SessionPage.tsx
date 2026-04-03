import { useParams, Link } from 'react-router-dom';
import FeedbackForm from '../components/FeedbackForm';
import './SessionPage.css';

// Configuração de conteúdo para cada sessão
const sessionContent = {
  1: {
    title: "Quais suas expectativas e aprendizados até o momento?",
    subtitle: "Abertura e Primeiras Discussões",
    description: "Considere a Abertura, as apresentações sobre o panoramas de Diversidade, Equidade e Inclusão e a Mesa-redonda sobre Benchmark, Ações e Resultados.",
    placeholder: "Escreva seus aprendizados, expectativas, sentimentos e palavras-chave...",
  },
  2: {
    title: "O que aprendemos até aqui?",
    subtitle: "Reflexões do Momento",
    description: "Considere a Mesa Redonda com práticas de DEI na indústria de Óleo e Gás, e a palestra sobre o programa contra as Violências Sexuais no Trabalho e palestra de Racismo Algorítmico",
    placeholder: "Compartilhe seus aprendizados, insights ou preocupações para o futuro...",
  },
  3: {
    title: "Que desafios você identifica até o momento?",
    subtitle: "Aprofundamento e Desafios",
    description: "Considere o painel sobre saúde mental, o Webcast Inspiração e os projetos \"O mar também é delas\" e \"Meninas com Ciências\".",
    placeholder: "Escreva sobre desafios, inspirações ou reflexões...",
  },
  4: {
    title: "O que achou do compromissos e das ações levantadas?",
    subtitle: "Encerramento e Compromissos",
    description: "Considere a última mesa redonda e as Ações apresentadas",
    placeholder: "Compartilhe os compromissos, aprendizados e próximos passos...",
  },
};

export default function SessionPage() {
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

  // Obter conteúdo da sessão atual
  const content = sessionContent[sessionNumber as keyof typeof sessionContent];

  return (
    <div className="session-page">
      <div className="session-header">
        <div className="rainbow-bar"></div>
        
        <h1 className="main-title slide-down">
          {content.title}
        </h1>
        
        <div className="session-badge fade-in">
          <span className="badge-text">Sessão {sessionNumber}</span>
        </div>

        <div className="session-subtitle">
          <h2>{content.subtitle}</h2>
          <p>{content.description}</p>
        </div>
      </div>

      <div className="session-content fade-in">
        <FeedbackForm sessionId={sessionNumber} placeholder={content.placeholder} />
        
        <div className="session-footer">
          <Link to={`/sessao/${sessionNumber}/resultados`} className="results-link">
            Ver nuvem de palavras desta sessão →
          </Link>
        </div>
      </div>

      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
    </div>
  );
}
