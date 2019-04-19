$(() => {

  $searchPropertyForm.on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();

    getAllListings(data).then(function( json ) {
      propertyListings.addProperties(json.properties);
      views.show('listings');
    });
  });

  $('body').on('click', '.search_button', function() {
    views.show('searchProperty');
  });

  $('#search-property-form__cancel').on('click', function() {
    views.show('listings');
    return false;
  });

});