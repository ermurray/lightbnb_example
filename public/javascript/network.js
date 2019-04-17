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

function logIn() {
  return $.ajax({
    method: "POST",
    url: "/login",
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