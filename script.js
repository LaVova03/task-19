const search = document.getElementById('search');
const post = document.getElementById('post');
const comments = document.getElementById('comments');
const hide = document.getElementById('hide');
const messages = document.getElementById('messages');


search.addEventListener('change', (event) => {
    const valueInput1 = event.target.value;
    const valueInput = +valueInput1;

    if (valueInput > 100 || valueInput < 1 || isNaN(valueInput)) {
        alert('This id does not exist');
        document.getElementById('search').value = '';
    } else {
        fetch(`https://jsonplaceholder.typicode.com/posts/${valueInput}`)
            .then(response => response.json())
            .then(person => {
                post.style.display = 'block';
                comments.style.display = 'block';

                while (post.firstChild) {
                    post.firstChild.remove();
                }

                const a = Object.entries(person);
                a.map(([key, value]) => {
                    if ([key, value]) {
                        const p = document.createElement('p');
                        p.setAttribute('id', 'userPost');
                        post.append(p);
                        p.textContent = (`${key}: ${value}`);
                    };
                });

                hide.style.display = 'block';

                return person;
            })
            .catch(error => console.log(error));

        comments.addEventListener('click', () => {
            fetch(`https://jsonplaceholder.typicode.com/comments?postId=${valueInput}`)
                .then(response => response.json())
                .then(users => {

                    while (messages.firstChild) {
                        messages.firstChild.remove();
                    }

                    for (let i = 0; i < users.length; i++) {
                        const arr = Object.entries(users[i]);
                        arr.map(([key, value]) => {
                            if ([key, value]) {
                                const letter = document.createElement('p');
                                letter.setAttribute('id', `${[i]}`);
                                letter.style.margin = '0';
                                const br = document.createElement('br');
                                messages.append(letter);
                                letter.textContent = (`${key}: ${value}`);
                                if (`${key}` === 'body') {
                                    messages.append(br);
                                };

                                hide.addEventListener('click', () => {
                                    post.style.display = 'none';
                                    comments.style.display = 'none';
                                    hide.style.display = 'none';
                                    letter.style.display = 'none';
                                    document.getElementById('search').value = '';
                                });
                            };
                        });
                    };
                })
                .catch(error => console.log(error));
        });
    };
});