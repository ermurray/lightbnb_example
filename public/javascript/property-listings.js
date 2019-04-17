$(() => {
  const exports = {};
  window.propertyListings = exports;

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
    $propertyListings.append(listing);
  }

  function addProperties(properties) {
    $propertyListings.empty();
    for (const propertyId in properties) {
      const property = properties[propertyId];
      const listing = createListing(property);
      addListing(listing);
    }
  }
  exports.addProperties = addProperties;

  getAllListings().then(function( json ) {
    addProperties(json.properties);
  });

});