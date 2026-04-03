// Lista de stopwords em português para remover da nuvem de palavras
// Palavras muito comuns que não agregam significado

export const STOPWORDS_PT = new Set([
  // Artigos
  'o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas',
  
  // Preposições
  'de', 'da', 'do', 'das', 'dos', 'em', 'no', 'na', 'nos', 'nas',
  'por', 'para', 'com', 'sem', 'sob', 'sobre', 'entre', 'até',
  
  // Pronomes
  'eu', 'tu', 'ele', 'ela', 'nós', 'vós', 'eles', 'elas',
  'me', 'te', 'se', 'lhe', 'nos', 'vos', 'lhes',
  'meu', 'minha', 'meus', 'minhas', 'teu', 'tua', 'teus', 'tuas',
  'seu', 'sua', 'seus', 'suas', 'nosso', 'nossa', 'nossos', 'nossas',
  'este', 'esta', 'estes', 'estas', 'esse', 'essa', 'esses', 'essas',
  'aquele', 'aquela', 'aqueles', 'aquelas', 'isto', 'isso', 'aquilo',
  
  // Conjunções
  'e', 'ou', 'mas', 'porém', 'contudo', 'todavia', 'entretanto',
  'pois', 'porque', 'que', 'se', 'como', 'quando', 'onde',
  
  // Verbos auxiliares comuns
  'é', 'são', 'foi', 'foram', 'ser', 'estar', 'ter', 'haver',
  'sendo', 'sido', 'estou', 'está', 'estão', 'estava', 'estavam',
  'tenho', 'tem', 'temos', 'têm', 'tinha', 'tinham',
  
  // Advérbios comuns
  'não', 'sim', 'muito', 'pouco', 'mais', 'menos', 'bem', 'mal',
  'já', 'ainda', 'sempre', 'nunca', 'também', 'tão', 'assim',
  
  // Outras palavras comuns
  'ao', 'aos', 'à', 'às', 'pelo', 'pela', 'pelos', 'pelas',
  'num', 'numa', 'nuns', 'numas', 'dum', 'duma', 'duns', 'dumas',
  'pode', 'podem', 'vai', 'vão', 'dá', 'dão', 'faz', 'fazem',
]);

/**
 * Processa texto para extração de palavras significativas
 * Remove stopwords, normaliza e conta frequências
 */
export function processText(text: string): Map<string, number> {
  const wordFrequency = new Map<string, number>();
  
  // Normaliza o texto: lowercase e remove pontuação
  const normalized = text
    .toLowerCase()
    .replace(/[^\w\sáàâãéèêíïóôõöúçñ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Divide em palavras
  const words = normalized.split(' ');
  
  // Conta frequências, ignorando stopwords e palavras muito curtas
  words.forEach(word => {
    if (word.length > 2 && !STOPWORDS_PT.has(word)) {
      wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
    }
  });
  
  return wordFrequency;
}

/**
 * Combina múltiplos textos e retorna frequências agregadas
 */
export function aggregateTexts(texts: string[]): Map<string, number> {
  const aggregated = new Map<string, number>();
  
  texts.forEach(text => {
    const frequencies = processText(text);
    frequencies.forEach((count, word) => {
      aggregated.set(word, (aggregated.get(word) || 0) + count);
    });
  });
  
  return aggregated;
}

/**
 * Converte Map de frequências para array de palavras para a nuvem
 */
export function frequencyMapToWordCloud(
  frequencies: Map<string, number>
): Array<{ text: string; value: number }> {
  return Array.from(frequencies.entries())
    .map(([text, value]) => ({ text, value }))
    .sort((a, b) => b.value - a.value); // Ordena por frequência
}
