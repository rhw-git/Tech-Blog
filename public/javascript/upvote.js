async function upvoteCheckHandler(event) {
  event.preventDefault();
  // get id
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  // fetch upvote
  const res = await fetch('/api/posts/upvote', {
    method: 'PUT',
    body: JSON.stringify({
      post_id: id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // reload the upvote
  if (res.ok) {
    document.location.reload();
  } else {
    alert(res.statusText);
  }
}

document
  .querySelector('.form-check')
  .addEventListener('change', upvoteCheckHandler);
