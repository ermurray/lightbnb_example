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

function getAllListings() {
  return $.ajax({
    url: "/api/properties",
  });
}