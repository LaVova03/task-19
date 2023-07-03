
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
    } else {
        let promise = fetch(`https://jsonplaceholder.typicode.com/posts/${valueInput}`)
            .then(response => response.json())
            .then(id => promise = id)

        promise
            .then(() => {
                post.style.display = 'block';
                comments.style.display = 'block';
                post.textContent = JSON.stringify(promise);
                hide.style.display = 'block';
            })
            .catch(error => console.log(error))
    };

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
        let comById = fetch(`https://jsonplaceholder.typicode.com/comments?postId=${valueInput}`)
            .then(response => response.json())
            .then(id => comById = id)
        comById
            .then(() => {
                try {
                    const stict = JSON.stringify(comById);
                    const str = JSON.parse(stict);
                    comPost.textContent = (`id: ${str[0].id} name: ${str[0].name} email: ${str[0].email} body: ${str[0].body}`);
                    comPost1.textContent = (`id: ${str[1].id} name: ${str[1].name} email: ${str[1].email} body: ${str[1].body}`);
                    comPost2.textContent = (`id: ${str[2].id} name: ${str[2].name} email: ${str[2].email} body: ${str[2].body}`);
                    comPost3.textContent = (`id: ${str[3].id} name: ${str[3].name} email: ${str[3].email} body: ${str[3].body}`);
                    comPost4.textContent = (`id: ${str[4].id} name: ${str[4].name} email: ${str[4].email} body: ${str[4].body}`);
                    comPost.style.display = 'block';
                    comPost1.style.display = 'block';
                    comPost2.style.display = 'block';
                    comPost3.style.display = 'block';
                    comPost4.style.display = 'block';
                } catch (error) {
                    console.error('Случилась ошибка при парсинге JSON:', error);
                };
            });
    });
});
