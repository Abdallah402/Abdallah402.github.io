/**
 * Minimal client-side RAG retrieval engine.
 * chunk -> TF-IDF vectorize -> cosine similarity search.
 * No backend, no model download, no API key — runs entirely in-browser,
 * which is why this works on static hosting like GitHub Pages.
 *
 * To upgrade later: point BACKEND_URL (see chat.js) at a real server that
 * does neural embeddings + an LLM call, and swap `retrieve()`'s local
 * scoring for a fetch to that server.
 */

const STOPWORDS = new Set([
  "a","an","the","is","are","was","were","be","been","being","to","of","and",
  "in","on","for","with","that","this","it","as","at","by","or","from","i",
  "my","me","you","your","what","which","who","how","do","does","did","can",
  "could","would","should","about","into","have","has","had","not","but"
]);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t && !STOPWORDS.has(t));
}

function chunkDocument(doc, maxWords = 60) {
  const sentences = doc.text.split(/(?<=[.!?])\s+/);
  const chunks = [];
  let current = [];
  let wordCount = 0;

  for (const sentence of sentences) {
    const words = sentence.split(/\s+/).length;
    if (wordCount + words > maxWords && current.length) {
      chunks.push(current.join(" "));
      current = [];
      wordCount = 0;
    }
    current.push(sentence);
    wordCount += words;
  }
  if (current.length) chunks.push(current.join(" "));

  return chunks.map((text, i) => ({
    text: text.trim(),
    source: doc.source,
    docId: doc.id,
    chunkId: `${doc.id}-${i}`,
  }));
}

class Retriever {
  constructor(documents) {
    this.chunks = documents.flatMap((d) => chunkDocument(d));
    this._buildIndex();
  }

  _buildIndex() {
    // Document frequency for IDF
    const df = new Map();
    const chunkTokens = this.chunks.map((c) => tokenize(c.text));

    chunkTokens.forEach((tokens) => {
      new Set(tokens).forEach((t) => df.set(t, (df.get(t) || 0) + 1));
    });

    const N = this.chunks.length;
    this.idf = new Map();
    df.forEach((count, term) => {
      this.idf.set(term, Math.log((N + 1) / (count + 1)) + 1);
    });

    this.vectors = chunkTokens.map((tokens) => this._vectorize(tokens));
  }

  _vectorize(tokens) {
    const tf = new Map();
    tokens.forEach((t) => tf.set(t, (tf.get(t) || 0) + 1));

    const vec = new Map();
    let normSq = 0;
    tf.forEach((count, term) => {
      const idf = this.idf.get(term) || 0;
      const weight = (count / tokens.length) * idf;
      vec.set(term, weight);
      normSq += weight * weight;
    });
    const norm = Math.sqrt(normSq) || 1;
    vec.forEach((w, term) => vec.set(term, w / norm));
    return vec;
  }

  _cosine(vecA, vecB) {
    let sum = 0;
    const [small, large] = vecA.size < vecB.size ? [vecA, vecB] : [vecB, vecA];
    small.forEach((w, term) => {
      if (large.has(term)) sum += w * large.get(term);
    });
    return sum;
  }

  search(query, topK = 3) {
    const queryVec = this._vectorize(tokenize(query));
    const scored = this.chunks.map((chunk, i) => ({
      chunk,
      score: this._cosine(queryVec, this.vectors[i]),
    }));
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, topK);
  }
}
