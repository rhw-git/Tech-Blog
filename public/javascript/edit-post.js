async function editFormHandler(event) {
  event.preventDefault();
  // get id
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  // get title
  const title = document.querySelector('#post-title').value.trim();
  // get content
  const content = document.querySelector('#post-content').value.trim();
  // put method
  if (title && content) {
    const res = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(res.statusText);
    }
  }
}

document
  .querySelector('.edit-post-form')
  .addEventListener('submit', editFormHandler);
