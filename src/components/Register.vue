<template>
  <div>
    <button @click="registerWithGoogle">Register with Google</button>
    <button @click="loginWithGoogle">Login with Google</button>
  </div>
</template>

<script>
export default {
  methods: {
    async registerWithGoogle() {
      try {
        const auth2 = await gapi.auth2.init({
          client_id: '45791953662-3b6f3cirn7sqm3iif1blfuen8dh2tu48.apps.googleusercontent.com',
        });
        const googleUser = await auth2.signIn();
        const id_token = googleUser.getAuthResponse().id_token;

        // Send the id_token to your Flask backend for registration
        await this.sendToken('https://rachinsky.pythonanywhere.com/register', id_token);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    },
    async loginWithGoogle() {
      try {
        const auth2 = await gapi.auth2.init({
          client_id: '45791953662-3b6f3cirn7sqm3iif1blfuen8dh2tu48.apps.googleusercontent.com',
        });
        const googleUser = await auth2.signIn();
        const id_token = googleUser.getAuthResponse().id_token;

        // Send the id_token to your Flask backend for login
        await this.sendToken('https://rachinsky.pythonanywhere.com/login', id_token);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    },
    async sendToken(url, token) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ google_token: token })
        });

        if (response.ok) {
          const data = await response.json();
          // Handle the response from the backend
          console.log(data);
        } else {
          throw new Error('Request failed');
        }
      } catch (error) {
        // Handle the error
        console.error('An error occurred:', error);
      }
    }
  },
};
</script>
