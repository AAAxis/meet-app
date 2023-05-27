<template>


    <Dashboard v-if="currentComponent === 'Dashboard'"/>
 <Messages v-if="currentComponent === 'Messages'" />
    <Explore v-if="currentComponent === 'Explore'" />

    <div class="footer">
<div class="footer-buttons">
    <a @click="openNav" class="footer-button">
        <i class="fa-regular fa-user fa-lg"></i>
        <span class="footer-button-label">Profile</span>
      </a>

      <a @click="showComponent('Dashboard')" class="footer-button">
        <i class="fa-regular fa-font-awesome fa-lg"></i>
        <span class="footer-button-label">Home</span>
      </a>
  
  
      <a @click="showComponent('Explore')" class="footer-button">
        <i class="fa-solid fa-people-pulling fa-lg"></i>
        <span class="footer-button-label">Explore</span>
    </a>
        <a @click="showComponent('Messages')" class="footer-button">
            <i class="fa-regular fa-comments fa-lg"></i>
        <span class="footer-button-label">Messages</span>

      </a>
  
    </div>

  </div>
  
      <!-- Rest of the Navbar content -->


      <div id="mySidenav" class="sidenav">
      <!-- Sidebar content -->
      <a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>
      <a href="#"><img :src="userImage" style="height:100px" alt="Image"></a>
      <hr style="color:grey; margin-left:2rem; margin-right:2rem;">
      <a style="color:white">{{ userEmail }}</a>
      <a style="color:white" @click="logout">Logout</a>
    </div>
 
</template>

<script>
import md5 from 'blueimp-md5';
import Explore from './Explore.vue';
import Messages from './Messages.vue';
import Dashboard from './Dashboard.vue';

export default {
  components: {
    Explore,
    Messages,
    Dashboard
  },
  data() {
    return {
      userImage: '', // Initialize with an empty string
      userEmail: localStorage.getItem('registeredEmail'),
      currentComponent: 'Dashboard',
    };
  },
  methods: {
    fetchGravatar(userEmail) {
  const hash = md5(userEmail.trim().toLowerCase()); // Hash the email
  const gravatarUrl = `https://www.gravatar.com/avatar/${hash}`;
  this.userImage = gravatarUrl;
},
    openNav() {
      document.getElementById("mySidenav").style.width = "100%";
    },
    closeNav() {
      document.getElementById("mySidenav").style.width = "0";
    },
    logout() {
      // Clear the user data from local storage
      localStorage.removeItem('registeredEmail');

      // Redirect to the login page
      window.location.href = '/login';
    },
    showComponent(componentName) {
      this.currentComponent = componentName;
    },
  },
  mounted() {
    this.fetchGravatar(this.userEmail); // Fetch Gravatar image on component mount
  },
};
</script>