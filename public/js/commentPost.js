const commentHandeler = async (event) => {
    event.preventDefault();
    const comment = document.querySelector('#comment').value.trim();
    const blogId = document.querySelector('#blog-id').dataset.id
    console.log(blogId)
    if (comment) {
        let commentObject = {
            comment: comment,
            blogId: blogId,
        };
        const response = await fetch('/api/blog/comment', {
            method: 'POST',
            body: JSON.stringify(commentObject) ,
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/`);
        } else {
            alert(response.statusText);
        }
    }
};


document
  .querySelector('.comment-post')
  .addEventListener('submit', commentHandeler);
