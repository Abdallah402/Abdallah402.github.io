/**
 * Chat widget controller.
 *
 * Fully client-side by default (extractive mode): retrieves the best-matching
 * chunk(s) via TF-IDF + cosine similarity and shows them directly. No backend,
 * no API key, works on GitHub Pages as-is.
 *
 * To add LLM-generated answers: deploy a small backend (e.g. a Vercel/Netlify
 * serverless function, or the FastAPI app from the earlier project) that
 * accepts { question, context } and returns { answer } using your own
 * Anthropic API key server-side (never put a key in this file — it ships to
 * every visitor's browser). Then set BACKEND_URL below.
 */

const BACKEND_URL = null; // e.g. "https://your-backend.example.com/chat"
const MIN_SCORE = 0.03;

const retriever = new Retriever(KNOWLEDGE);

const els = {
  toggle: document.getElementById("chat-toggle"),
  panel: document.getElementById("chat-panel"),
  close: document.getElementById("chat-close"),
  messages: document.getElementById("chat-messages"),
  form: document.getElementById("chat-form"),
  input: document.getElementById("chat-input"),
};

function openChat() {
  els.panel.classList.add("open");
  els.toggle.classList.add("hidden");
  els.input.focus();
}
function closeChat() {
  els.panel.classList.remove("open");
  els.toggle.classList.remove("hidden");
}

els.toggle.addEventListener("click", openChat);
els.close.addEventListener("click", closeChat);

function addMessage(role, node) {
  const wrap = document.createElement("div");
  wrap.className = `chat-msg chat-msg--${role}`;
  if (typeof node === "string") {
    wrap.textContent = node;
  } else {
    wrap.appendChild(node);
  }
  els.messages.appendChild(wrap);
  els.messages.scrollTop = els.messages.scrollHeight;
  return wrap;
}

function buildAnswerNode(results, mode) {
  const container = document.createElement("div");

  const badge = document.createElement("span");
  badge.className = "chat-badge";
  badge.textContent = mode === "generated" ? "generated · grounded" : "retrieved match";
  container.appendChild(badge);

  const answerText = document.createElement("p");
  answerText.className = "chat-answer-text";
  answerText.textContent = results[0].chunk.text;
  container.appendChild(answerText);

  if (results.length > 1) {
    const details = document.createElement("details");
    details.className = "chat-sources";
    const summary = document.createElement("summary");
    summary.textContent = `+${results.length - 1} more source${results.length > 2 ? "s" : ""}`;
    details.appendChild(summary);
    results.slice(1).forEach(({ chunk, score }) => {
      const row = document.createElement("div");
      row.className = "chat-source-row";
      row.innerHTML = `<b>${chunk.source}</b> <span class="chat-score">${score.toFixed(2)}</span><br>${chunk.text}`;
      details.appendChild(row);
    });
    container.appendChild(details);
  }

  const srcLine = document.createElement("div");
  srcLine.className = "chat-primary-source";
  srcLine.textContent = `— ${results[0].chunk.source}`;
  container.appendChild(srcLine);

  return container;
}

async function handleQuestion(question) {
  const results = retriever.search(question, 3).filter((r) => r.score >= MIN_SCORE);

  if (!results.length) {
    addMessage("bot", "I don't have anything on that yet — try asking about a project, my background, or why I'm job searching.");
    return;
  }

  if (BACKEND_URL) {
    try {
      const context = results.map((r) => `[${r.chunk.source}] ${r.chunk.text}`).join("\n\n");
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, context }),
      });
      const data = await res.json();
      addMessage("bot", buildAnswerNode([{ chunk: { text: data.answer, source: results[0].chunk.source }, score: results[0].score }, ...results.slice(1)], "generated"));
      return;
    } catch (err) {
      // fall through to extractive on backend failure
    }
  }

  addMessage("bot", buildAnswerNode(results, "extractive"));
}

els.form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const question = els.input.value.trim();
  if (!question) return;
  addMessage("user", question);
  els.input.value = "";

  const typing = addMessage("bot", "…");
  typing.classList.add("chat-typing");
  await new Promise((r) => setTimeout(r, 250)); // brief pause reads as "thinking", not laggy
  typing.remove();

  handleQuestion(question);
});
