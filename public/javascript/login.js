// signup-form
async function signupFormHandler(event) {
  event.preventDefault();
  // get attributes from inputs of the signup-form
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  console.log('RECIEVED DATA FROM MODAL =>');
  // post into the database
  if (username && email && password) {
    const res = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    // check res
    if (res.ok) {
      console.log('SUCCESSFULLY PUSH INFO TO api/users =>');
    } else {
      alert(res.statusText);
    }
  }
}
// login-form
async function loginFromHandler(event) {
  event.preventDefault();
  // get attributes from inputs of  the login-form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  console.log('RECIEVED DATA FROM MODAL =>');
  // post in to the database
  if (email && password) {
    const res = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    // check res
    if (res.ok) {
      console.log('SUCCESSFULLY PUSH INFO TO api/users/login =>');
      document.location.replace('/');
    } else {
      alert(res.statusText);
    }
  }
}
// --------------------------- event listeners --------------------------//
// event listener for signup-form
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
// event listener for login-form
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFromHandler);
