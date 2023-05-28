<template>

<!DOCTYPE html>

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>User - Login</title>

    <!-- Custom fonts for this template-->

</head>


                    <h1>Welcome Back!</h1>
         
                  <form @submit="login" >
         
                      <input type="email" v-model="email" 
                      placeholder="Enter Email Address" required>
              
                      <input type="password" v-model="password" 
                       placeholder="Password" required>
          
            
                        <input type="checkbox">
                        <label>Remember Me</label>
              
                    <button type="submit">Login</button>
                  </form>
        
                    <a href="/register">Create an Account!</a>
       
          
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login(event) {
      event.preventDefault(); // Prevent form submission
      
      const formData = {
        email: this.email,
        password: this.password,
      };
      localStorage.setItem('email', this.email);
      // Make an HTTP POST request to the server
      fetch('https://rachinsky.pythonanywhere.com/user_login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(data => {
          if (data.redirect) {
            var email = this.email;
          
          localStorage.setItem('registeredEmail', email);
            // Redirect to the dashboard page
            window.location.href = data.redirect;
          
          } else if (data.error) {
            // Display error message to the user
            console.error(data.error);
          }
        })
        .catch(error => {
          console.error('An error occurred during login:', error);
        });
    },
  },
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

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

input[type="checkbox"] {
  margin-right: 5px;
}

label {
  font-size: 14px;
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

