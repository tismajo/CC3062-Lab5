// Obtener los blogs de la API de awita.site.
function fetchBlogs() {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = 'Cargando blogs...';

    fetch('http://awita.site:3000/posts')
        .then(response => response.json())
        .then(data => {
            resultsContainer.innerHTML = '';
            resultsContainer.style.display = 'grid';
            resultsContainer.style.gridTemplateColumns = 'repeat(1, 1fr)';
            resultsContainer.style.gap = '10px';

            data.posts.forEach(blog => {
                const blogInfo = document.createElement('div');
                blogInfo.classList.add('blog-card');

                blogInfo.style.backgroundColor = '#ffffff';
                blogInfo.style.padding = '20px';
                blogInfo.style.borderRadius = '10px';
                blogInfo.style.display = 'flex';
                blogInfo.style.flexDirection = 'column';
                blogInfo.style.alignItems = 'center';

                const blogTitle = document.createElement('p');
                blogTitle.classList.add('blog-title');
                blogTitle.innerHTML = `<strong>${blog.titulo}</strong>`;

                const blogDescription = document.createElement('p');
                blogDescription.innerText = blog.descripcion.length > 100 ? blog.descripcion.substring(0, 100) + '...' : blog.descripcion;

                const showDetailsButton = document.createElement('button');
                showDetailsButton.innerText = 'Ver más';
                showDetailsButton.style.marginTop = '10px';
                showDetailsButton.style.padding = '10px';
                showDetailsButton.style.backgroundColor = '#008c35';
                showDetailsButton.style.color = 'white';
                showDetailsButton.style.border = 'none';
                showDetailsButton.style.borderRadius = '5px';

                showDetailsButton.addEventListener('click', () => showBlogDetails(blog));

                blogInfo.appendChild(blogTitle);
                blogInfo.appendChild(blogDescription);

                if (hasImage(blog.imagen)) {
                    const blogImage = document.createElement('img');
                    blogImage.src = blog.imagen;
                    blogImage.style.width = '100%';
                    blogImage.style.maxWidth = '500px';
                    blogImage.style.borderRadius = '10px';
                    blogImage.style.marginTop = '10px';
                    blogInfo.appendChild(blogImage);
                }

                blogInfo.appendChild(showDetailsButton);
                resultsContainer.appendChild(blogInfo);
            });
        })
        .catch(error => {
            resultsContainer.innerHTML = 'Error al cargar los blogs.';
        });

    return resultsContainer;
}

function hasImage(url) {
    return url && (url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.gif'));
}

// Ver los comentarios.
function fetchComments(postId) {
    fetch(`http://awita.site:3000/comments/${postId}`)
    .then(response => response.json())
        .then(data => {
            const commentsContainer = document.getElementById('comments-container');
            commentsContainer.innerHTML='';

            data.comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.style.padding = '10px';
                commentElement.style.borderBottom = '1px solid #ddd';

                const username = document.createElement('strong');
                username.innerText = comment.username;
                
                const commentText = document.createElement('p');
                commentText.innerText = comment.comentario;
                
                commentElement.appendChild(username);
                commentElement.appendChild(commentText);
                commentsContainer.appendChild(commentElement);
            });
        })
        .catch(error => {
            resultsContainer.innerHTML = 'Error al cargar los blogs.';
        });}

// publicar comentario.
function postComment(postId, username, comentario) {
    fetch('http://awita.site:3000/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            post_id: postId,
            username: username,
            comentario: comentario
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Comentario publicado:', data);
        fetchComments(postId); // Recargar los comentarios después de publicar
    })
    .catch(error => console.error('Error publicando comentario:', error));
}

// Ver el blog completo.
function showBlogDetails(blog) { 
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    
    const blogDetails = document.createElement('div');
    blogDetails.style.backgroundColor = '#fff';
    blogDetails.style.width = '80%';
    blogDetails.style.maxWidth = '600px';
    blogDetails.style.padding = '20px';
    blogDetails.style.borderRadius = '10px';
    blogDetails.style.textAlign = 'center';
    blogDetails.style.maxHeight = '80vh';
    blogDetails.style.overflowY = 'auto';

    const title = document.createElement('h2');
    title.innerText = blog.titulo;

    const content = document.createElement('p');
    content.innerText = blog.descripcion;

    if (hasImage(blog.imagen)) {
        const blogImage = document.createElement('img');
        blogImage.src = blog.imagen;
        blogImage.style.width = '100%';
        blogImage.style.maxWidth = '500px';
        blogImage.style.borderRadius = '10px';
        blogImage.style.marginTop = '10px';
        blogDetails.appendChild(blogImage);
    }

    const commentsContainer = document.createElement('div');
    commentsContainer.id = 'comments-container';
    commentsContainer.style.marginTop = '20px';
    commentsContainer.style.textAlign = 'left';
    commentsContainer.innerHTML = '<h3>Comentarios:</h3>';

    const commentForm = document.createElement('form');
    commentForm.style.marginTop = '10px';
    commentForm.innerHTML = `
        <input type="text" id="username" placeholder="Tu nombre" style="width: 80%; padding: 5px; margin-bottom: 5px;" required>
        <textarea id="commentText" placeholder="Escribe tu comentario" style="width: 80%; padding: 5px; margin-bottom: 5px;" required></textarea>
        <button type="submit" style="padding: 5px 10px; background-color: #008c35; color: white; border: none; border-radius: 5px;">Comentar</button>
    `;
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const comentario = document.getElementById('commentText').value;
        postComment(blog.id, username, comentario);
    });

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Cerrar';
    closeButton.style.marginTop = '20px';
    closeButton.style.padding = '10px';
    closeButton.style.backgroundColor = '#ff4d4d';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });

    blogDetails.appendChild(title);
    blogDetails.appendChild(content);
    blogDetails.appendChild(commentForm);
    blogDetails.appendChild(commentsContainer);
    blogDetails.appendChild(closeButton);
    overlay.appendChild(blogDetails);
    document.body.appendChild(overlay);

    fetchComments(blog.id);
}

// Filtrar por búsqueda del usuario (se usará en barra de búsqueda).
function filterBlogs(event) {
    const searchTerm = event.target.value.toLowerCase();
    const blogs = document.querySelectorAll('.blog-card');

    blogs.forEach(blog => {
        const titleElement = blog.querySelector('.blog-title');
        if (titleElement) {
            const title = titleElement.innerText.toLowerCase();
            blog.style.display = title.includes(searchTerm) ? 'flex' : 'none';
        }
    });
}

// Barra de búsqueda
function searchBar() {
    const searchBarContainer = document.createElement('div');
    searchBarContainer.style.display = 'flex';
    searchBarContainer.style.justifyContent = 'center';
    searchBarContainer.style.padding = '10px';
    searchBarContainer.style.width = '100%';
    searchBarContainer.style.backgroundColor = '#008c35';

    const input = document.createElement('input');
    input.type = 'text';
    input.style.padding = '10px';
    input.style.width = '80%';
    input.style.border = '1px solid #ccc';
    input.style.borderRadius = '5px';
    input.placeholder = '🔍 Buscar blog...';
    input.addEventListener('input', filterBlogs);

    searchBarContainer.appendChild(input);

    return searchBarContainer;
}

// Pantalla principal.
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.margin = '0';
    document.body.style.height = '100vh';
    document.documentElement.style.height = '100vh';
    document.body.style.display = 'flex';
    document.body.style.flexDirection = 'column';
    document.body.style.alignItems = 'center';

    const mainContainer = document.createElement('div');
    mainContainer.style.display = 'flex';
    mainContainer.style.flexDirection = 'column';
    mainContainer.style.alignItems = 'center';
    mainContainer.style.justifyContent = 'flex-start';
    mainContainer.style.height = '100vh';
    mainContainer.style.width = '100%';
    mainContainer.style.overflowY = 'auto';
    mainContainer.style.backgroundColor = '#008c35';

    document.body.appendChild(mainContainer);
    mainContainer.appendChild(searchBar());

    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'results';
    mainContainer.appendChild(resultsContainer);
    fetchBlogs();
});
