$(() => {

  $("body").on('click', '.login_button', () => {
    views.show('logIn');
  });
  $("body").on('click', '.sign-up_button', () => {
    views.show('signUp');
  });
  $("body").on('click', '.logout_button', () => {
    logOut().then(() => {
      header.updateHeader(null);
    });
  });
  

  $('#login-form__cancel').on('click', function() {
    views.show('listings');
    return false;
  });

  $('#sign-up-form__cancel').on('click', function() {
    views.show('listings');
    return false;
  });

  $logInForm.on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    logIn(data)
      .then(getMyDetails)
      .then((json) => {
        if (!json.user) {
          views.show('error', 'Failed to login');
          return;
        }
        header.updateHeader(json.user);
        views.show('listings');
      });
  });

  $signUpForm.on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    signUp(data)
      .then(getMyDetails)
      .then((json) => {
        header.updateHeader(json.user);
        views.show('listings');
      });
  });
      
});