<template>
  <div>
    <h1>Registration Form</h1>
    <div id="g_id_onload"
         data-client_id="45791953662-3b6f3cirn7sqm3iif1blfuen8dh2tu48.apps.googleusercontent.com"
         data-callback="handleCredentialResponse"></div>
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
      registeredEmail: ''
    };
  },
  mounted() {
    this.loadGooglePlatform();
  },
  methods: {
    loadGooglePlatform() {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    },
    handleCredentialResponse(response) {
      const credential = response.credential;
      const email = credential && credential.id;
      
      if (email) {
        // Perform client-side registration logic
        this.registerClientSide(email);
      }
    },
    registerClientSide(email) {
      // Replace this code with your client-side registration logic
      // For example, you can save the email to local storage or perform any other client-side operations

      // After registration, set the registered email
      this.registeredEmail = email;
    }
  }
};
</script>
