$(() => {

  const $newPropertyForm = $("#new-property-form");
  const $propertyListings = $("#property-listings");

  const submitProperty = function(data) {
    return $.ajax({
      method: "POST",
      url: "/api/properties",
      data,
    });
  }

  $newPropertyForm.addressfield({
    json: 'javascript/addressfield.min.json',
    fields: {
      country: '#new-property-form__country',
      locality: '#new-property-form__locality-fields',
      localityname: '#new-property-form__city',
      administrativearea: '#new-property-form__state',
      postalcode: '#new-property-form__zip'
    }
  });

  $newPropertyForm.on('submit', function (event) {
    event.preventDefault();

    views.show('none');

    const data = $(this).serialize();
    submitProperty(data)
    .then((data) => {
      console.log(data);
      views.show('listings');
    })
    .catch((error) => {
      console.log(error);
      views.show('listings');
    })
  });

  $('#property-form__cancel').on('click', function() {
    views.show('properties');
    return false;
  });

  $('body').on('click', '.create_listing_button', function() {
    views.show('newProperty');
  });
  
});