$(() => {

  window.$newPropertyForm = $("#new-property-form");
  window.$searchPropertyForm = $("#search-property-form");
  window.$propertyListings = $("#property-listings");
  window.$logInForm = $("#login-form");
  window.$signUpForm = $("#sign-up-form");

  const exports = {};
  window.views = exports;

  exports.show = function(item) {
    $newPropertyForm.addClass('hidden');
    $propertyListings.addClass('hidden');
    $searchPropertyForm.addClass('hidden');
    $logInForm.addClass('hidden');
    $signUpForm.addClass('hidden');

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
      case 'logIn':
        $logInForm.removeClass('hidden');
        break;
      case 'signUp':
        $signUpForm.removeClass('hidden');
        break;
      case 'error': {
        const $error = $(`<p>${arguments[1]}</p>`);
        $error.appendTo('body');
        setTimeout(() => {
          $error.remove();
          views.show('listings');
        }, 2000);
        
        break;
      }
    }
  }
  
});