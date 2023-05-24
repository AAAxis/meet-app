<template>
  <div>
    <h1>Registration Form</h1>
    <button @click="registerWithGoogle">Register with Google</button>
    <div v-if="registeredEmail">
      <h2>Registered Email:</h2>
      <p>{{ registeredEmail }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registeredEmail: '',
    };
  },
  methods: {
    async registerWithGoogle() {
      try {
        const auth2 = await gapi.auth2.init({
          client_id: '45791953662-3b6f3cirn7sqm3iif1blfuen8dh2tu48.apps.googleusercontent.com',
        });
        const googleUser = await auth2.signIn();
        const id_token = googleUser.getAuthResponse().id_token;

        // Perform client-side registration logic
        this.registerClientSide(id_token);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    },
    registerClientSide(id_token) {
      // Replace this code with your client-side registration logic
      // For example, you can save the token to local storage or perform any other client-side operations

      // After registration, set the registered email
      const profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
      this.registeredEmail = profile.getEmail();

      console.log('Token:', id_token);
    },
  },
};
</script>
