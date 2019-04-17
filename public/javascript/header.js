$(() => {

  function updateHeader(user) {
    const $pageHeader = $('#page-header');
    $pageHeader.find("#page-header__user-links").remove();
    let userLinks;

    if (!user) {
      userLinks = `
      <nav id="page-header__user-links" class="page-header__user-links">
        <ul>
          <li class="search_button">Search</li>
          <li class="login_button">Log In</li>
          <li>Sign Up</li>
        </ul>
      </nav>
      `
    } else {
      userLinks = `
      <nav id="page-header__user-links" class="page-header__user-links">
        <ul>
          <li class="search_button">Search</li>
          <li>${user.name}</li>
          <li class="create_listing_button">Create Listing</li>
          <li class="logout_button">Log Out</li>
        </ul>
      </nav>
      `
    }

    $pageHeader.append(userLinks);
  }

  getMyDetails().then(function( json ) {
    updateHeader(json.user);
  });

  $("body").on('click', '.login_button', () => {
    logIn()
      .then(function( json ) {
        return getMyDetails();
      })
      .then(function( json ) {
        updateHeader(json.user);
      });
  });
  $("body").on('click', '.logout_button', () => {
    logOut().then(function( json ) {
      updateHeader(null);
    });
  });
});