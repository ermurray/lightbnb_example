$(() => {

  $('body').on('click', '.search_button', function() {
    show('searchProperty');
  });

  $('#search-property-form__cancel').on('click', function() {
    show('listings');
    return false;
  });

});