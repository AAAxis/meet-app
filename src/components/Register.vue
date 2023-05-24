<template>
  <div class="container">
    <div class="card o-hidden border-0 shadow-lg my-5">
      <div class="card-body p-0">
        <div class="row">
          <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
          <div class="col-lg-7">
            <div class="p-5">
              <div class="text-center">
                <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
              </div>
              <form @submit="register" class="user">
                <div class="form-group">
                  <input type="text" v-model="username" class="form-control form-control-user" id="exampleLastName" placeholder="Username" required>
                </div>
                <div class="form-group">
                  <input type="email" v-model="email" class="form-control form-control-user" id="exampleInputEmail" placeholder="Email Address" required>
                </div>
                <div class="form-group">
                  <input type="password" v-model="password" class="form-control form-control-user" id="exampleInputPassword" placeholder="Password" required>
                </div>
                <button type="submit" class="btn btn-success btn-lg">Register</button>
                <button type="button" @click="googleLogin" class="btn btn-primary btn-lg">Login with Google</button>
              </form>
              <hr>
              <div class="text-center">
                <a class="small" href="/login">Already have an account? Login!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    register(event) {
      event.preventDefault();

      fetch('https://rachinsky.pythonanywhere.com/user_register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          email: this.email,
          password: this.password
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.redirect) {
            window.location.href = data.redirect;
          } else {
            console.error('Registration failed:', data.error);
          }
        })
        .catch(error => {
          console.error('An error occurred during registration:', error);
        });
    },
    googleLogin() {
      gapi.load('auth2', () => {
        gapi.auth2.init({
          client_id: '45791953662-3b6f3cirn7sqm3iif1blfuen8dh2tu48.apps.googleusercontent.com',
        }).then(auth2 => {
          auth2.signIn().then(googleUser => {
            const id_token = googleUser.getAuthResponse().id_token;

            fetch('https://rachinsky.pythonanywhere.com/user_register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                google_token: id_token
              })
            })
              .then(response => response.json())
              .then(data => {
                if (data.redirect) {
                  window.location.href = data.redirect;
                } else {
                  console.error('Registration failed:', data.error);
                }
              })
              .catch(error => {
                console.error('An error occurred during registration:', error);
              });
          });
        });
      });
    }
  }
};
</script>
