import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { InsertFeedback } from '../types';
import './FeedbackForm.css';

interface FeedbackFormProps {
  sessionId: number;
  placeholder?: string;
}

export default function FeedbackForm({ sessionId, placeholder = "Escreva palavras, sentimentos ou aprendizados…" }: FeedbackFormProps) {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Por favor, escreva algo antes de enviar!');
      return;
    }

    if (text.length > 500) {
      setError('Texto muito longo! Máximo de 500 caracteres.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const feedback: InsertFeedback = {
        session_id: sessionId,
        text: text.trim(),
      };

      const { error: insertError } = await supabase
        .from('feedbacks')
        .insert([feedback]);

      if (insertError) throw insertError;

      // Sucesso - limpar formulário e mostrar feedback
      setText('');
      setShowSuccess(true);
      
      // Esconder mensagem de sucesso após animação
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Erro ao enviar feedback:', err);
      setError('Ops! Algo deu errado. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (error) setError(null);
  };

  const remainingChars = 500 - text.length;

  return (
    <div className="feedback-form-container">
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="feedback-text" className="sr-only">
            Escreva seu feedback
          </label>
          <textarea
            id="feedback-text"
            value={text}
            onChange={handleTextChange}
            placeholder={placeholder}
            className="feedback-textarea"
            rows={6}
            maxLength={500}
            disabled={isSubmitting}
            aria-describedby={error ? 'error-message' : undefined}
          />
          
          <div className="char-counter">
            <span className={remainingChars < 50 ? 'warning' : ''}>
              {remainingChars} caracteres restantes
            </span>
          </div>
        </div>

        {error && (
          <div id="error-message" className="error-message" role="alert">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting || !text.trim()}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Enviando...
            </>
          ) : (
            <>
              Soltar minha ficha 🎲
            </>
          )}
        </button>
      </form>

      {showSuccess && (
        <div className="success-message fade-in" role="status" aria-live="polite">
          <div className="success-icon">✓</div>
          <p>Ficha solta com sucesso!</p>
          <div className="falling-chip">🎲</div>
        </div>
      )}
    </div>
  );
}
