// ============================================================
// NECTAR — app.js
// Vanilla JS front-end. All data is local for now.
// TODO: swap these functions for Supabase calls later.
// ============================================================

// ---- Local state (will become Supabase queries) ----
let posts = [
  {
    id: 1,
    author: "Amara",
    handle: "amara",
    text: "Just launched my first design portfolio 🎨 Feedback welcome!",
    time: "2m",
    likes: 12,
    liked: false,
  },
  {
    id: 2,
    author: "Jules",
    handle: "julesdev",
    text: "Nectar's peach theme is growing on me 🍑",
    time: "18m",
    likes: 42,
    liked: false,
  },
  {
    id: 3,
    author: "Nadia",
    handle: "nadia",
    text: "Morning coffee + code = perfect start ☕",
    time: "1h",
    likes: 8,
    liked: false,
  },
];

// ---- DOM refs ----
const feedList = document.getElementById("feed-list");
const postInput = document.getElementById("post-input");
const postBtn = document.getElementById("post-btn");

// ---- Render ----
function render() {
  feedList.innerHTML = "";
  posts.forEach((post) => {
    const el = document.createElement("article");
    el.className = "post";
    el.innerHTML = `
      <div class="post-header">
        <div class="avatar">${post.author[0].toUpperCase()}</div>
        <div class="post-meta">
          <div class="name">${escapeHtml(post.author)}</div>
          <div class="handle">@${escapeHtml(post.handle)} · ${post.time}</div>
        </div>
      </div>
      <p class="post-text">${escapeHtml(post.text)}</p>
      <div class="post-actions">
        <button data-action="reply">💬 0</button>
        <button data-action="repost">🔁 0</button>
        <button data-action="like" class="${post.liked ? "liked" : ""}">
          ${post.liked ? "❤️" : "🤍"} ${post.likes}
        </button>
        <button data-action="share">↗️</button>
      </div>
    `;

    el.querySelector('[data-action="like"]').addEventListener("click", () => {
      post.liked = !post.liked;
      post.likes += post.liked ? 1 : -1;
      render();
    });

    feedList.appendChild(el);
  });
}

// ---- Add a post ----
function addPost() {
  const text = postInput.value.trim();
  if (!text) return;

  const newPost = {
    id: Date.now(),
    author: "You",
    handle: "you",
    text,
    time: "now",
    likes: 0,
    liked: false,
  };

  posts.unshift(newPost);
  postInput.value = "";
  render();

  // TODO (Supabase later):
  // await supabase.from('posts').insert({ content: text })
}

postBtn.addEventListener("click", addPost);

// Cmd/Ctrl + Enter to submit
postInput.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === "Enter") addPost();
});

// ---- Utils ----
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

// ---- Init ----
render();
