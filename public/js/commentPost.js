const commentHandeler = async (event) => {
    event.preventDefault();
    const comment = document.querySelector('#comment').value.trim();

    if (comment) {
        const response = await fetch('/api/blog/newcomment', {
            method: 'POST',
            body: JSON.stringify( {comment} ),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/blogs/:id`);
        } else {
            alert(response.statusText);
        }
    }
};


document
  .querySelector('.comment-post')
  .addEventListener('submit', commentHandeler);
