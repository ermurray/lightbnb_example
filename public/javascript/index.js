$(() => {

  const propertyListings = $("#property-listings");

  function createListing(property) {
    return `
    <article class="property-listing">
        <section class="property-listing__preview-image">
          <img src="https://www.fillmurray.com/300/200" alt="fillmurray">
        </section>
        <section class="property-listing__details">
          <p class="property-listing__type">${property.property_type}</p>
          <h3 class="property-listing__title">${property.title}</h3>
          <ul class="property-listing__details">
            <li>number_of_bedrooms: ${property.number_of_bedrooms}</li>
            <li>number_of_bathrooms: ${property.number_of_bathrooms}</li>
            <li>parking_spaces: ${property.parking_spaces}</li>
          </ul>
          <footer class="property-listing__footer">
            <div class="property-listing__rating">4.5/5 stars</div>
            <div class="property-listing__price">$${property.cost_per_night/100.0}/night</div>
          </footer>
        </section>
      </article>
    `
  }

  function addListing(listing) {
    propertyListings.append(listing);
  }

  function addProperties(properties) {
    for (const propertyId in properties) {
      const property = properties[propertyId];
      const listing = createListing(property);
      console.log(listing);
      addListing(listing);
    }
  }

  function getAllListings() {
    $.ajax({
      url: "/api/properties",
    }).done(function( json ) {
      addProperties(json);
    });
  }

  function updateHeader(user) {
    console.log(user);
    const $pageHeader = $('#page-header');
    $pageHeader.find("#page-header__user-links").remove();
    let userLinks;

    if (!user) {
      userLinks = `
      <nav id="page-header__user-links" class="page-header__user-links">
        <ul>
          <li class="login_button">Log In</li>
          <li>Sign Up</li>
        </ul>
      </nav>
      `
    } else {
      userLinks = `
      <nav id="page-header__user-links" class="page-header__user-links">
        <ul>
          <li>${user.name}</li>
          <li>Create Listing</li>
          <li class="logout_button">Log Out</li>
        </ul>
      </nav>
      `
    }

    $pageHeader.append(userLinks);
  }

  function getMyDetails() {
    $.ajax({
      url: "/api/users/me",
    }).done(function( json ) {
      updateHeader(json.user);
    });
  }

  function logOut() {
    $.ajax({
      method: "POST",
      url: "/logout",
    }).done(function( json ) {
      updateHeader(null);
    });
  }

  function logIn() {
    $.ajax({
      method: "POST",
      url: "/login",
    }).done(function( json ) {
      getMyDetails();
    });
  }

  getMyDetails();
  getAllListings();

  $("body").on('click', '.login_button', () => {
    logIn();
  });
  $("body").on('click', '.logout_button', () => {
    logOut();
  });
});