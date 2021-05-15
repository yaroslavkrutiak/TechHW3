getResponse<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
).then(async content => {
    const article = document.querySelector("article");
    article.innerHTML = await setHtml(content);
});

interface Post {
    userId: number,
    id: number,
    title: string,
    body: string
}

async function getResponse<T>(
    url: string
): Promise<T> {
    let body, response;
    try {
        response = await fetch(url);
        body = await response.json();
    } catch (e) {
        console.error(e);
    }
    return body;
}

async function setHtml(
    content: Post[]
): Promise<string> {
    let html = ``;
    content.forEach(elem=>html+=`    
    <ul>
        <li><span class="postId">Post ID: ${elem.id}</span>      <span class="userId">User ID: ${elem.userId}</span></li>
        <li><span class="postTitle">${elem.title}</span></li>
        <li><span class="postBody">${elem.body}</span></li>
    </ul>`)
    return html;
}