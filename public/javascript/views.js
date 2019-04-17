$(() => {

  window.$newPropertyForm = $("#new-property-form");
  window.$searchPropertyForm = $("#search-property-form");
  window.$propertyListings = $("#property-listings");

  
  window.show = function(item) {
    $newPropertyForm.addClass('hidden');
    $propertyListings.addClass('hidden');
    $searchPropertyForm.addClass('hidden');

    switch (item) {
      case 'listings':
        $propertyListings.removeClass('hidden');
        break;
      case 'newProperty':
        $newPropertyForm.removeClass('hidden');
        break;
      case 'searchProperty':
        $searchPropertyForm.removeClass('hidden');
        break;
    }
  }
  
});