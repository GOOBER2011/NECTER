// ============================================================
// NECTAR — app.js
// ============================================================

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

const feedList = document.getElementById("feed-list");
const postInput = document.getElementById("post-input");
const postBtn = document.getElementById("post-btn");

function render() {
  feedList.innerHTML = "";
  posts.forEach((post) => {
    const el = document.createElement("article");
    el.className = "post";
    
    // Using SVG icons instead of emojis in the template
    el.innerHTML = `
      <div class="avatar">${post.author[0].toUpperCase()}</div>
      <div class="post-content">
        <div class="post-header">
          <div class="post-meta">
            <span class="name">${escapeHtml(post.author)}</span>
            <span class="handle">@${escapeHtml(post.handle)} · ${post.time}</span>
          </div>
        </div>
        <p class="post-text">${escapeHtml(post.text)}</p>
        <div class="post-actions">
          <button data-action="reply">
            <i data-lucide="message-circle"></i> 0
          </button>
          <button data-action="repost">
            <i data-lucide="repeat-2"></i> 0
          </button>
          <button data-action="like" class="${post.liked ? "liked" : ""}">
            <i data-lucide="heart"></i> ${post.likes}
          </button>
          <button data-action="share">
            <i data-lucide="share"></i>
          </button>
        </div>
      </div>
    `;

    el.querySelector('[data-action="like"]').addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent triggering post click if we add that later
      post.liked = !post.liked;
      post.likes += post.liked ? 1 : -1;
      render();
    });

    feedList.appendChild(el);
  });
  
  // Re-initialize icons after DOM update
  lucide.createIcons();
}

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
}

postBtn.addEventListener("click", addPost);

postInput.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === "Enter") addPost();
});

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

// Initial render
render();
