<template>
  <div>
    <button @click="registerWithGoogle">Register with Google</button>
    <button @click="loginWithGoogle">Login with Google</button>
  </div>
</template>

<script>
export default {
  methods: {
    registerWithGoogle() {
      gapi.load('auth2', () => {
        gapi.auth2.init({
          client_id: '45791953662-3b6f3cirn7sqm3iif1blfuen8dh2tu48.apps.googleusercontent.com',
        }).then(auth2 => {
          auth2.signIn().then(googleUser => {
            const id_token = googleUser.getAuthResponse().id_token;

            // Send the id_token to your Flask backend for registration
            this.sendToken('https://rachinsky.pythonanywhere.com/register', id_token);
          });
        });
      });
    },
    loginWithGoogle() {
      gapi.load('auth2', () => {
        gapi.auth2.init({
          client_id: '45791953662-3b6f3cirn7sqm3iif1blfuen8dh2tu48.apps.googleusercontent.com',
        }).then(auth2 => {
          auth2.signIn().then(googleUser => {
            const id_token = googleUser.getAuthResponse().id_token;

            // Send the id_token to your Flask backend for login
            this.sendToken('https://rachinsky.pythonanywhere.com/login', id_token);
          });
        });
      });
    },
    sendToken(url, token) {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ google_token: token })
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response from the backend
          console.log(data);
        })
        .catch(error => {
          // Handle the error
          console.error('An error occurred:', error);
        });
    }
  },
};
</script>
