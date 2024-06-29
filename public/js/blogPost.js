
const blogPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const blog_content = document.querySelector('#content').value.trim();

    if ( title && blog_content) {
        const response = await fetch('/api/blog/post', {
            method: 'POST',
            body: JSON.stringify({ title, blog_content }),
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
  .querySelector('.blog-post')
  .addEventListener('submit', blogPostHandler);
