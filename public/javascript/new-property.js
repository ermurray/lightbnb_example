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

    $newPropertyForm.addClass('hidden');

    const data = $(this).serialize();
    submitProperty(data)
    .done((data) => {
      console.log(data);
      $propertyListings.removeClass('hidden');
    })
    .catch((error) => {
      console.log(error);
      $propertyListings.removeClass('hidden');
    })
  });

  $('#property-form__cancel').on('click', function() {
    show('properties');
    return false;
  });

  $('body').on('click', '.create_listing_button', function() {
    show('newProperty');
  });
  
});