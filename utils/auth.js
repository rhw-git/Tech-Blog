const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect('/#login');
    //   const loginModal = document.querySelector('.login-modal');
    //   loginModal.modal().show();
  } else {
    next();
  }
};
module.exports = withAuth;
