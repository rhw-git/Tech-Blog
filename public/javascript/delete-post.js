async function deleteFormHandler(event) {
  event.preventDefault();
  // get id
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
  if (res.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(res.statusText);
  }
}

document
  .querySelector('.delete-post-btn')
  .addEventListener('click', deleteFormHandler);
