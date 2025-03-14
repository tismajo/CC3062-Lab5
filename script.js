// Mostrar en pantalla "pequeña" el contenido del blog.
function fetchMiniBlogs(n) {
    const miniBlogsContainer = document.createElement('div');
    miniBlogsContainer.style.display = 'flex';
    miniBlogsContainer.style.flexDirection = 'column';
    miniBlogsContainer.style.gap = '10px';
    miniBlogsContainer.style.width = '100%';
    miniBlogsContainer.style.alignItems = 'center';
    miniBlogsContainer.style.paddingBottom = '20px';

    for (let i = 0; i < n; i++) {
        const miniBlog = document.createElement('div');
        const detailsButton = document.createElement('button');
        miniBlog.classList.add('blog-card'); // Se le pone una etiqueta a cada uno de los elementos para facilitar el filtrado.

        miniBlog.style.backgroundColor = '#ffffff';
        miniBlog.style.width = '100%';
        miniBlog.style.maxWidth = '800px';
        miniBlog.style.padding = '20px';
        miniBlog.style.display = 'flex';
        miniBlog.style.alignItems = 'center';
        miniBlog.style.justifyContent = 'space-between';
        miniBlog.style.borderRadius = '10px';

        const blogText = document.createElement('p');
        blogText.innerText = `AQUÍ VA A IR LO DEL BLOG ${i + 1}`;
        blogText.classList.add('blog-title'); // Atribuirle un id a cada título del blog para facilitar su búsqueda.

        detailsButton.innerText = 'Ver detalles';
        detailsButton.style.padding = '8px 12px';
        detailsButton.style.border = 'none';
        detailsButton.style.backgroundColor = '#dd6ddf';
        detailsButton.style.color = 'white';
        detailsButton.style.borderRadius = '5px';
        detailsButton.style.cursor = 'pointer';

        detailsButton.addEventListener('click', () => showBlogDetails(i + 1));

        miniBlog.appendChild(blogText);
        miniBlog.appendChild(detailsButton);
        miniBlogsContainer.appendChild(miniBlog);
    }

    return miniBlogsContainer;
}

// Ver el blog completo.
function showBlogDetails(blogId) {
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

    const title = document.createElement('h2');
    title.innerText = `Blog ${blogId}`;

    const content = document.createElement('p');
    content.innerText = `Este es el contenido del blog ${blogId}.`;

    const commentsSection = document.createElement('div');
    commentsSection.style.marginTop = '20px';
    commentsSection.innerHTML = `
        <h3>Comentarios</h3>
        <textarea placeholder="Escribe tu comentario..." style="width: 100%; height: 100%; padding: 10px;"></textarea>
        <button style="margin-top: 10px; padding: 10px; background-color: #dd6ddf; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Enviar
        </button>
        <div id="commentsList" style="margin-top: 10px; text-align: left;"></div>
    `;

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
    blogDetails.appendChild(commentsSection);
    blogDetails.appendChild(closeButton);
    overlay.appendChild(blogDetails);
    document.body.appendChild(overlay);
}

// Filtrar por búsqueda del usuario (se usará en barra de búsqueda).
function filterBlogs(event) {
    const searchTerm = event.target.value.toLowerCase();
    const blogs = document.querySelectorAll('.blog-card');
    blogs.forEach(blog => {
        const title = blog.querySelector('.blog-title').innerText.toLowerCase();
        blog.style.display = title.includes(searchTerm) ? 'flex' : 'none';
    });
}

// Barra de búsqueda
function searchBar() {
    const searchBarContainer = document.createElement('div');
    searchBarContainer.style.display = 'flex';
    searchBarContainer.style.justifyContent = 'center';
    searchBarContainer.style.padding = '10px';
    searchBarContainer.style.width = '100%';
    searchBarContainer.style.backgroundColor = '#ffd6fb';

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
    mainContainer.style.backgroundColor = '#ffd6fb';

    document.body.appendChild(mainContainer);
    mainContainer.appendChild(searchBar());
    mainContainer.appendChild(fetchMiniBlogs(10));
});
