const search = document.getElementById('search');
const post = document.getElementById('post');
const comments = document.getElementById('comments');
const hide = document.getElementById('hide');
const comPost = document.getElementById('comPost');
const comPost1 = document.getElementById('comPost1');
const comPost2 = document.getElementById('comPost2');
const comPost3 = document.getElementById('comPost3');
const comPost4 = document.getElementById('comPost4');

search.addEventListener('change', (event) => {
    const valueInput1 = event.target.value;
    const valueInput = +valueInput1;

    if (valueInput > 100 || valueInput < 1 || isNaN(valueInput)) {
        alert('This id does not exist');
        document.getElementById('search').value = '';
    } else {
        fetch(`https://jsonplaceholder.typicode.com/posts/${valueInput}`)
            .then(response => response.json())
            .then(json => {
                post.style.display = 'block';
                comments.style.display = 'block';

                while (post.firstChild) {
                    post.firstChild.remove();
                };

                for (const key in json) {
                    const field = document.createElement('p');
                    const strongKey = document.createElement('strong');
                    const value = document.createTextNode(`${key}: ${json[key]}`);
                    strongKey.appendChild(document.createTextNode(key));
                    field.appendChild(strongKey);
                    field.appendChild(document.createTextNode(`: ${json[key]}`));
                    post.appendChild(field);
                };

                hide.style.display = 'block';

                return json;
            })
            .catch(error => console.log(error));

        hide.addEventListener('click', () => {
            post.style.display = 'none';
            comments.style.display = 'none';
            hide.style.display = 'none';
            comPost.style.display = 'none';
            comPost1.style.display = 'none';
            comPost2.style.display = 'none';
            comPost3.style.display = 'none';
            comPost4.style.display = 'none';
        });

        comments.addEventListener('click', () => {
            fetch(`https://jsonplaceholder.typicode.com/comments?postId=${valueInput}`)
                .then(response => response.json())
                .then(json => {
                    comPost.style.display = 'block';
                    comPost1.style.display = 'block';
                    comPost2.style.display = 'block';
                    comPost3.style.display = 'block';
                    comPost4.style.display = 'block';
                    document.getElementById('search').value = '';
                    try {
                        comPost.innerHTML = (`id: ${json[0].id} <br>name: ${json[0].name}<br>email: ${json[0].email}<br>body: ${json[0].body}`);
                        comPost1.innerHTML = (`id: ${json[1].id}<br>name: ${json[1].name}<br>email: ${json[1].email}<br>body: ${json[1].body}`);
                        comPost2.innerHTML = (`id: ${json[2].id}<br>name: ${json[2].name}<br>email: ${json[2].email}<br>body: ${json[2].body}`);
                        comPost3.innerHTML = (`id: ${json[3].id}<br>name: ${json[3].name}<br>email: ${json[3].email}<br>body: ${json[3].body}`);
                        comPost4.innerHTML = (`id: ${json[4].id}<br>name: ${json[4].name}<br>email: ${json[4].email}<br>body: ${json[4].body}`);
                    } catch (error) {
                        console.error('Случилась ошибка при парсинге JSON:', error);
                    };
                    return json;
                })
                .catch(error => console.log(error));
        });
    };
});