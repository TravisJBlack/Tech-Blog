const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/blog/update/${id}`, {
        method: 'DELETE',
        
      });
  
      if (response.ok) {
        document.location.replace('/blogs/:id');
      } else {
        alert('Failed to delete project');
      }
    }
  };

  document
  .querySelector('.delete')
  .addEventListener('click', delButtonHandler);

  const updateButtonHandler = async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');
    const title = document.querySelector('#title').value.trim();
    const blog_content = document.querySelector('#content').value.trim();

      const response = await fetch(`/blog/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, blog_content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/blogs/:id');
      } else {
        alert('Failed to delete project');
      }
    };

  document
  .querySelector('.update')
  .addEventListener('click', updateButtonHandler);
