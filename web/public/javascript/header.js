$(() => {
  const exports = {};
  window.header = exports;

  let user = null;

  function updateHeader() {
    const $pageHeader = $('#page-header');
    $pageHeader.find("#page-header__user-links").remove();
    let userLinks;

    if (!user) {
      userLinks = `
      <nav id="page-header__user-links" class="page-header__user-links">
        <ul>
          <li class="home">🏠</li>
          <li class="search_button">Search</li>
          <li class="login_button">Log In</li>
          <li class="sign-up_button">Sign Up</li>
        </ul>
      </nav>
      `
    } else {
      userLinks = `
      <nav id="page-header__user-links" class="page-header__user-links">
        <ul>
          <li class="home">🏠</li>
          <li class="search_button">Search</li>
          <li>${user.name}</li>
          <li class="create_listing_button">Create Listing</li>
          <li class="my_listing_button">My Listings</li>
          <li class="my_reservations_button">My Reservations</li>
          <li class="logout_button">Log Out</li>
        </ul>
      </nav>
      `
    }

    $pageHeader.append(userLinks);
  }

  exports.updateHeader = updateHeader;

  getMyDetails()
    .then(function( json ) {
      user = json.user;
    updateHeader();
  });

  $("header").on("click", '.my_reservations_button', function() {
    propertyListings.clearListings();
    getAllReservations()
      .then(function(json) {
        console.log(json);
        propertyListings.addProperties(json.reservations, true);
        views.show('listings');
      })
      .catch(error => console.log(error));
  });
  $("header").on("click", '.my_listing_button', function() {
    propertyListings.clearListings();
    getAllListings(`owner_id=${user.id}`)
      .then(function(json) {
        propertyListings.addProperties(json.properties);
        views.show('listings');
    });
  });

  $("header").on("click", '.home', function() {
    propertyListings.clearListings();
    getAllListings()
      .then(function(json) {
        propertyListings.addProperties(json.properties);
        views.show('listings');
    });
  });

});