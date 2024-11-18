const postsContainer = document.getElementById('posts');
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('error-message');
let page = 1; 
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

function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}

function showError(message) {
    errorMessage.innerText = message;
    errorMessage.style.display = 'block';
}

async function init() {
    const initialPosts = await getPosts(page);
    displayPosts(initialPosts);
    page++;

    window.addEventListener('scroll', async () => {
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
            showLoader();
            const newPosts = await getPosts(page);
            displayPosts(newPosts);
            hideLoader();
            page++;
        }
    });
}

init();
