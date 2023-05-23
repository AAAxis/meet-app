<template>

<!DOCTYPE html>

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>User - Register</title>

    <!-- Custom fonts for this template-->
       <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">
    <link rel="stylesheet" href="path/to/bootstrap.min.css">



</head>



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
    }
  }
};
</script>
