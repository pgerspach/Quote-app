function signOut() {
  $.post("/auth/signout", response => {
    console.log(response);
    window.location.href = "/login";
  });
}
