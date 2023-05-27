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
                 <form @submit.prevent="register" class="user">
                <div class="form-group">
                  <input type="text" v-model="username" class="form-control form-control-user" id="exampleLastName" placeholder="Username" required>
                </div>
                <div class="form-group">
                  <input type="email" v-model="email" class="form-control form-control-user" id="exampleInputEmail" placeholder="Email Address" required>
                </div>
                <div class="form-group">
                  <input type="password" v-model="password" class="form-control form-control-user" id="exampleInputPassword" placeholder="Password" required>
                </div>
                <button type="submit" class="btn btn-success btn-lg">Create</button>
                <button @click="registerWithGoogle" style="margin-left: 2px;" class="btn btn-primary btn-lg">Join & Google</button>
           
                <hr>

              </form>
    

       
                  <a class="small" href="/login">Already have an account? Login!</a>

          
        
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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

