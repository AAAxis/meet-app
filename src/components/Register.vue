<template>

  
                  <h1>Create an Account!</h1>
           
                 <form @submit.prevent="register">
      
                  <input type="text" v-model="username"   placeholder="Username" required>
           
                  <input type="email" v-model="email" placeholder="Email Address" required>
        
                  <input type="password" v-model="password"  placeholder="Password" required>
  
                <button type="submit">Create</button>
                <button style="background-color: rgb(34, 90, 244);" @click="registerWithGoogle">Join & Google</button>
           
                <hr>

              </form>
    

       
                  <a href="/login">Already have an account? Login!</a>
</template>






<script>
import { auth, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  
  methods: {
    register() {
      const userData = {
        username: this.username,
        email: this.email,
        password: this.password
      };

      axios.post('https://rachinsky.pythonanywhere.com/user_register', userData)
        .then(response => {
          // Registration successful
          var email = this.email;
          
          localStorage.setItem('registeredEmail', email);

          // Redirect to the dashboard page
          this.$router.push('/email');
        })
        .catch(error => {
          // Handle errors
          console.error("Registration failed:", error.response.data.message);
        });
    },

    registerWithGoogle() {
      signInWithPopup(auth, googleProvider)
        .then((userCredential) => {
          // User signed in successfully with Google
          var user = userCredential.user;
          var email = user.email;
          var username = user.displayName;

          const userData = {
            username: username, // Set an empty value for username
            email: email,
            password: 'google' // Set an empty value for password
          };

          axios.post('https://rachinsky.pythonanywhere.com/user_register', userData)
            .then(response => {
              // Registration successful
              
              localStorage.setItem('registeredEmail', email);

              // Redirect to the dashboard page
              this.$router.push('/dashboard');
            })
            .catch(error => {
              // Handle errors
              console.error("Registration failed:", error.response.data.message);
            });
        })
        .catch((error) => {
          // Handle errors
          console.error("Google authentication failed:", error.message);
        });
    }
  }
};


</script>

<style scoped>

/* Reset default styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}

h1 {
  text-align: center;
  margin: 20px 0;
}

form {
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

a {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #333;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

</style>