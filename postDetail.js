const getPostById = async (id) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch post');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
}

const getCommentsByPostId = async (id) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        if (!response.ok) {
            throw new Error('Failed to fetch comments');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
}

const renderComment = (comment) => `
    <div class="comment">
        <h3 class="comment__name">${comment.name}</h3>
        <p class="comment__email">${comment.email}</p>
        <p class="comment__body">${comment.body}</p>
    </div>
`

const initPostDetail = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if (!postId) {
        document.getElementById('postDetail').innerHTML = '<p>Post ID not specified</p>';
        return;
    }

    try {
        // Получаем данные поста
        const post = await getPostById(postId);
        document.getElementById('postTitle').textContent = post.title;
        document.getElementById('postBody').textContent = post.body;

        // Получаем и отображаем комментарии
        const comments = await getCommentsByPostId(postId);
        const commentsContainer = document.getElementById('postComments');
        
        if (comments.length > 0) {
            commentsContainer.innerHTML = comments.map(renderComment).join('');
        } else {
            commentsContainer.innerHTML = '<p>No comments yet</p>';
        }
    } catch (error) {
        document.getElementById('postDetail').innerHTML = `
            <p>Error loading post details. Please try again later.</p>
        `;
        console.error('Error initializing post detail:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPostDetail);
} else {
    initPostDetail();
}