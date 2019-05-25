function getMyDetails() {
  return $.ajax({
    url: "/api/users/me",
  });
}

function logOut() {
  return $.ajax({
    method: "POST",
    url: "/logout",
  })
}

function logIn(data) {
  return $.ajax({
    method: "POST",
    url: "/login",
    data
  });
}

function signUp(data) {
  return $.ajax({
    method: "POST",
    url: "/sign-up",
    data
  });
}

function getAllListings(params) {
  let url = "/api/properties";
  if (params) {
    url += "?" + params;
  }
  return $.ajax({
    url,
  });
}

function getAllReservations() {
  let url = "/api/reservations";
  return $.ajax({
    url,
  });
}