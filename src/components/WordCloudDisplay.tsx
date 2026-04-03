import { useEffect, useState, useCallback } from 'react';
import ReactWordcloud from 'react-wordcloud';
import { supabase } from '../lib/supabase';
import { aggregateTexts, frequencyMapToWordCloud } from '../utils/textProcessing';
import type { Feedback, WordCloudWord } from '../types';
import './WordCloudDisplay.css';

interface WordCloudDisplayProps {
  sessionId: number;
}

export default function WordCloudDisplay({ sessionId }: WordCloudDisplayProps) {
  const [words, setWords] = useState<WordCloudWord[]>([]);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar feedbacks iniciais
  const loadFeedbacks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('feedbacks')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      if (data && data.length > 0) {
        const texts = data.map((f: Feedback) => f.text);
        const frequencies = aggregateTexts(texts);
        const wordList = frequencyMapToWordCloud(frequencies);
        
        setWords(wordList);
        setFeedbackCount(data.length);
      } else {
        setWords([]);
        setFeedbackCount(0);
      }
    } catch (err) {
      console.error('Erro ao carregar feedbacks:', err);
      setError('Erro ao carregar feedbacks. Tente recarregar a página.');
    } finally {
      setIsLoading(false);
    }
  }, [sessionId]);

  // Configurar Realtime
  useEffect(() => {
    // Carregar dados iniciais
    loadFeedbacks();

    // Inscrever-se em mudanças em tempo real
    const channel = supabase
      .channel(`feedbacks-session-${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'feedbacks',
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          console.log('Novo feedback recebido:', payload);
          // Recarregar feedbacks quando um novo for inserido
          loadFeedbacks();
        }
      )
      .subscribe();

    // Cleanup: desinscrever quando componente desmontar
    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId, loadFeedbacks]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Configurações da nuvem de palavras
  const options = {
    rotations: 2,
    rotationAngles: [-90, 0] as [number, number],
    fontSizes: [20, 100] as [number, number],
    fontFamily: 'Inter, sans-serif',
    fontWeight: '700',
    padding: 5,
    scale: 'sqrt' as const,
    spiral: 'archimedean' as const,
    transitionDuration: 1000,
    enableTooltip: true,
    deterministic: false,
    colors: [
      '#ff6b6b', // red
      '#ffa07a', // orange
      '#ffd93d', // yellow
      '#6bcf7f', // green
      '#4ecdc4', // blue
      '#5d5fef', // indigo
      '#c77dff', // violet
      '#ff69eb', // pink
    ],
  };

  const callbacks = {
    onWordClick: (word: WordCloudWord) => {
      console.log('Palavra clicada:', word);
    },
    getWordTooltip: (word: WordCloudWord) => 
      `${word.text}: aparece ${word.value} ${word.value === 1 ? 'vez' : 'vezes'}`,
  };

  if (error) {
    return (
      <div className="wordcloud-error">
        <p>{error}</p>
        <button onClick={loadFeedbacks} className="retry-button">
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className={`wordcloud-container ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="wordcloud-header">
        <div className="feedback-counter">
          <span className="counter-number">{feedbackCount}</span>
          <span className="counter-label">
            {feedbackCount === 1 ? 'ficha solta' : 'fichas soltas'}
          </span>
        </div>

        <button
          onClick={toggleFullscreen}
          className="fullscreen-button"
          aria-label={isFullscreen ? 'Sair da tela cheia' : 'Entrar em tela cheia'}
          title={isFullscreen ? 'Sair da tela cheia' : 'Entrar em tela cheia'}
        >
          {isFullscreen ? '⤢' : '⤢'}
        </button>
      </div>

      <div className="wordcloud-wrapper">
        {isLoading ? (
          <div className="loading-state">
            <div className="spinner-large"></div>
            <p>Carregando feedbacks...</p>
          </div>
        ) : words.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎲</div>
            <h3>Nenhuma ficha solta ainda</h3>
            <p>Aguardando os primeiros feedbacks desta sessão...</p>
          </div>
        ) : (
          <div className="wordcloud-canvas fade-in">
            <ReactWordcloud
              words={words}
              options={options}
              callbacks={callbacks}
            />
          </div>
        )}
      </div>

      {!isLoading && words.length > 0 && (
        <div className="wordcloud-footer">
          <p className="realtime-indicator">
            <span className="pulse-dot"></span>
            Atualizando em tempo real
          </p>
        </div>
      )}
    </div>
  );
}
