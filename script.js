// script.js
const postsContainer = document.getElementById('posts');
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('error-message');
let page = 1; // Track page number for pagination

// Fetch posts from API
async function getPosts(page) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`);
        const data = await response.json();
        return data;
    } catch (error) {
        showError('Failed to load posts. Please try again later.');
        return [];
    }
}

// Display posts on the page
function displayPosts(posts) {
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Show and hide loader
function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}

// Show error message
function showError(message) {
    errorMessage.innerText = message;
    errorMessage.style.display = 'block';
}

// Load initial posts and set up scroll event listener
async function init() {
    const initialPosts = await getPosts(page);
    displayPosts(initialPosts);
    page++; // Increment page for next load

    // Infinite scrolling
    window.addEventListener('scroll', async () => {
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
            showLoader();
            const newPosts = await getPosts(page);
            displayPosts(newPosts);
            hideLoader();
            page++; // Increment page after loading more posts
        }
    });
}

// Initialize the application
init();
