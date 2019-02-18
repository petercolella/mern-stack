export default {
  initClient: function() {
    return window.gapi.load('auth2', function() {
      window.gapi.auth2
        .init({
          client_id:
            '3734915239-ctslo30gfojv1o37cl4gbf6gg5rttu7h.apps.googleusercontent.com'
        })
        .then(
          GoogleAuth => {
            GoogleAuth.currentUser.get();
          },
          err => {
            console.log(err);
          }
        );
    });
  }
};
