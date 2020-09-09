async function newPostFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  const res = await fetch('/api/posts', {
    method: 'POST',
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

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newPostFormHandler);
