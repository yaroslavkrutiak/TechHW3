var contentObject: Post[];

const updateButton = document.querySelector('.button');
updateButton.addEventListener('click', () => {
    const input: HTMLInputElement[] = Array.from(document.getElementsByTagName('input'));
    const getNumber = (elem): number => {
        return Number(elem.value);
    }
    const getString = (elem): string => {
        return elem.value;
    }
    document.querySelector('article').innerHTML = setHtml(updateObjectInArray<Post[]>(contentObject, getNumber(input[0]), {
        userId: getNumber(input[1]),
        id: getNumber(input[2]),
        title: getString(input[3]),
        body: getString(input[4])
    }))
});

getResponse<Post[]>('https://jsonplaceholder.typicode.com/posts')
    .then(async content => {
        const article = document.querySelector('article');
        contentObject = content;
        article.innerHTML = setHtml(content);
    })
    .catch(e => alert(e));

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

function setHtml(
    content: Post[]
): string {
    let html = ``;
    content.forEach(elem => html += `    
    <ul>
        <li><span class="postId">Post ID: ${elem.id}</span>      <span class="userId">User ID: ${elem.userId}</span></li>
        <li><span class="postTitle">${elem.title}</span></li>
        <li><span class="postBody">${elem.body}</span></li>
    </ul>`)
    return html;
}

function updateObjectInArray<T>(
    array: Post[], key: number, newKeyValue: Post
): Post[] {
    const clonedArray = array;
    array.forEach(val => clonedArray.push(Object.assign({}, val)));
    if (array.length < key)
        return undefined;
    clonedArray[key] = newKeyValue;
    return clonedArray;
}