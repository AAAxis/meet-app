<template>
 
     
      <div class="container my-5">
  <div class="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-5">
    <button type="button" class="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill" aria-label="Close"></button>
    <svg class="bi mt-5 mb-3" width="48" height="48"><use xlink:href="#check2-circle"></use></svg>
    <h1 class="text-body-emphasis">Explore Events</h1>
    <p class="col-lg-6 mx-auto mb-4">
      Create group, and start promote your interests, and hobby.
    </p>

  </div>
</div>
 


<div v-for="event in events" :key="event.id" class="list-item">
  <div class="card">
    <div class="image-wrapper">
      <img style="object-fit: cover;" :src="'https://rachinsky.pythonanywhere.com/static/uploads/' + event.file" height="109" width="350" alt="Event Image">
      <div class="image-text">{{ event.name }}</div>
    
    </div>
  </div>
</div>



  <br><br>  <br><br><br>
   





  </template>
  
  <script>
import axios from 'axios';


export default {
  data() {
    return {
      events: [],
    };
  },

  mounted() {
    this.fetchEvents();

  },

  methods: {


    fetchEvents() {
      axios
        .get('https://rachinsky.pythonanywhere.com/dashboard')
        .then(response => {
          this.events = response.data.events;
        })
        .catch(error => {
          console.error(error);
        });
      },
    },
  };




</script>


  <style scoped>
  .add-event-button {
    background-color: #1e88e5;
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 20px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }

  h2 {
    font-size: 18px;
    margin-bottom: 5px;
  }
  
  p {
    margin: 0;
  }
  


  /* Add more CSS styles as needed */

  .list-item {
    display: flex;
    justify-content: center;
  }

  .card {
    position: relative;
    width: 350px;
    height: 111px;
    margin: 5px;
  }

  .image-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .image-text {
    position: absolute;
    top: 10px;
    left: 10px;
    color: white;
    font-weight: bold;
    font-size: 18px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  }

</style>