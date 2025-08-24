document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu trigger 
 const icon = document.getElementById("menuToggle");
 const mobileMenu = document.getElementById("mobileMenu");

  icon.addEventListener("click", () => {
   // alert();
    mobileMenu.classList.toggle("show");
   icon.classList.toggle("show");
   document.body.classList.toggle('no-scroll');  
  });


// Light/Dark Mode
const toggle = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme');

  // Load saved theme
  if (currentTheme === 'dark') {
    document.body.classList.add('dark');
    toggle.checked = true;
  }

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  });


  //  Post comments

const commentForm = document.getElementById("commentForm");
const commentsContainer = document.getElementById("commentList");
const postId = document.body.dataset.postId;

// Save to localStorage
function saveComment(comment) {
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.push(comment);
  localStorage.setItem("comments", JSON.stringify(comments));
}


// Handle form submission
commentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const commentText = document.getElementById("message").value.trim();

  if (username && commentText) {
    const comment = { username, text: commentText };
    addCommentToDOM(comment);
    saveCommentForPost(postId, comment);

    // Clear input fields
    document.getElementById("username").value = "";
    document.getElementById("message").value = "";
  }
});

// Get comments using post id
function getCommentsForPost(id) {
  const allComments = JSON.parse(localStorage.getItem("commentsByPost")) || {};
  return allComments[id] || [];
}

// Save comment using postid
function saveCommentForPost(id, comment) {
  const allComments = JSON.parse(localStorage.getItem("commentsByPost")) || {};
  allComments[id] = allComments[id] || [];
  allComments[id].push(comment);
  localStorage.setItem("commentsByPost", JSON.stringify(allComments));
}


// Load saved comments from localStorage using postid
window.addEventListener("DOMContentLoaded", () => {
  const savedComments = getCommentsForPost(postId);
  savedComments.forEach(addCommentToDOM);
});
 
// Render to page
function addCommentToDOM({ username, text }) {
  const commentElement = document.createElement("div");
  commentElement.classList.add("comment");
  commentElement.innerHTML = `
    <h4>${username}</h4>
    <p>${text}</p>
  `;
  commentsContainer.appendChild(commentElement);
}
  
// Soical share script
// Get current page URL & title
const pageUrl = encodeURIComponent(window.location.href);
const pageTitle = encodeURIComponent(document.title);

// Facebook
document.getElementById("share-facebook").href =
  `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;

// Twitter
document.getElementById("share-twitter").href =
  `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;

// LinkedIn
document.getElementById("share-linkedin").href =
  `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${pageTitle}`;

// WhatsApp
document.getElementById("share-whatsapp").href =
  `https://api.whatsapp.com/send?text=${pageTitle}%20${pageUrl}`;


});
  
