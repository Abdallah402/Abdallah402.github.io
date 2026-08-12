# Personal Site + "Ask Me Anything" Chatbot

A single-page portfolio site with a built-in chatbot that answers questions
about my background, grounded in real content — not general LLM knowledge.

## Deploying to GitHub Pages

1. Create a new GitHub repo (e.g. `yourusername.github.io` for a root
   domain, or any name for a project page).
2. Push these files to the repo:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Source → Deploy from a branch → main → / (root)**.
4. Your site goes live at `https://yourusername.github.io/your-repo/`
   (or `https://yourusername.github.io/` if you used the root-domain repo name).

No build step — it's plain HTML/CSS/JS, so this just works as static files.

## Before you share this with anyone

Open `assets/knowledge.js` and fill in every `[FILL IN: ...]` section —
work style, strengths/growth areas, career motivation specifics, and
outside-work content. Those are the parts that make the chatbot sound like
*you* rather than a resume with a chat window bolted on, and they were
intentionally left as prompts rather than invented content.

Also in `index.html`, hero section:
- Replace the `#` placeholders on the GitHub and LinkedIn icons with your
  real profile URLs.
- Add an actual `resume.pdf` file to the site root (same folder as
  `index.html`) so the "Resume" button downloads something real.

## How the chatbot works

Fully client-side, no backend, no API key, works on static hosting:

```
assets/knowledge.js   -> source documents (your background, in your words)
assets/retriever.js   -> chunk text -> TF-IDF vectors -> cosine similarity search
assets/chat.js         -> widget UI logic, confidence gating, answer rendering
```

Every question is matched against your knowledge base entirely in the
visitor's browser. If nothing scores above a minimum similarity threshold,
it says so honestly instead of guessing.

### Upgrading to LLM-generated answers

Right now it's "extractive" — it shows you the best-matching passage
directly. To get natural-language *generated* answers instead:

1. Deploy a small backend (a Vercel/Netlify serverless function, or reuse
   the FastAPI app from the standalone RAG demo project) that accepts
   `{ question, context }` and calls an LLM with your own API key
   **server-side** — never put an API key in `assets/chat.js`, since that
   file ships to every visitor's browser.
2. Set `BACKEND_URL` at the top of `assets/chat.js` to that endpoint.

### Honest note on retrieval quality

This uses TF-IDF (lexical keyword matching), not neural embeddings — a
deliberate choice so the whole thing runs with zero dependencies on static
hosting. It works well for direct questions but can occasionally surface a
related-but-not-best passage compared to a real embedding model. If you
want higher-quality retrieval later, swap in a hosted embeddings API from
your serverless backend and send scores back alongside `answer`.
