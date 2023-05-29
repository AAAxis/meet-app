<template>
 
     
      <div class="container my-5">
  <div class="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-5">
    <button type="button" class="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill" aria-label="Close"></button>
    <svg class="bi mt-5 mb-3" width="48" height="48"><use xlink:href="#check2-circle"></use></svg>
    <h1 class="text-body-emphasis">Explore Events</h1>
    <p class="col-lg-6 mx-auto mb-4">
      Create group, and start promote your interests, and hobby.
    </p>
    <button @click="openAddEventModal" class="btn btn-primary px-5 mb-5" type="button">
        Start a new group
    </button>
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
   



 <!-- Add Event Modal -->
 <div v-if="isAddEventModalOpen" class="modal">
        <div class="modal-content">
          <h2>Add Event</h2>
          <form @submit.prevent="createEvent">

          <label>File</label><br>
        <input type="file" ref="fileInput" accept="image/*" @change="handleFileChange" required><br>
        <label>Name</label><br>
        <input type="text" v-model="newEvent.name" required><br>



          <label>Address</label><br>
  <input type="text" v-model="newEvent.address" required><br>

          <input type="hidden" v-model="newEvent.email" />

<br>
 
          <label>Price</label><br>
  <div class="input-with-volume">
   
    <input type="range" v-model="newEvent.price" min="0">
    <span>{{ newEvent.price }}</span>
    
  </div>
          <label>Date and Time</label><br>
  <input type="date" class="datepicker" v-model="newEvent.datetime" required>
  <!-- ... -->
  <!-- ... -->
          <br>
          <label>Category</label><br>
          <select v-model="newEvent.category">
        
            <option value="Dates" selected>Dates</option>
  <option value="Art">Art</option>
  <option value="Hobby">Hobby</option>
  <option value="Standup">Standup</option>
</select>
      <br>     <br>
            <button type="submit">Create</button>
            <button @click="closeAddEventModal">Cancel</button>
          </form>
        </div>
      </div>



  </template>
  
  <script>
import axios from 'axios';
import Swiper from 'swiper';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import 'swiper/swiper-bundle.css';

export default {
  data() {
    return {
      userEmail: '',
      events: [],
      isAddEventModalOpen: false,
      newEvent: {
        name: 'My New Event',
        email: '',
        address: '',
        file: null,
        category: 'Art',
        price: "Free",
        datetime: ''
      },
    
      swiper: null
    };
  },

  mounted() {
    this.fetchEvents();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.handleGeolocationSuccess,
        this.handleGeolocationError
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }

    flatpickr(".datepicker", {
      // Specify the options for flatpickr (e.g., date format, minDate, maxDate)
    });

    // Retrieve the email from local storage and assign it to the data property
    this.userEmail = localStorage.getItem('registeredEmail');
  },

  methods: {
    handleGeolocationSuccess(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Call a geocoding service (e.g., Google Maps Geocoding API) to convert the coordinates into an address
      const geocoder = new google.maps.Geocoder();
      const latLng = new google.maps.LatLng(latitude, longitude);

      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK' && results.length > 0) {
          this.newEvent.address = results[0].formatted_address; // Update the address in the input field
        } else {
          console.error('Geocoder failed due to:', status);
        }
      });
    },

    handleGeolocationError(error) {
      console.error('Error occurred while retrieving geolocation:', error.message);
    },

    fetchEvents() {
      axios
        .get('https://rachinsky.pythonanywhere.com/dashboard')
        .then(response => {
          this.events = response.data.events;
          this.initializeSwiper();
        })
        .catch(error => {
          console.error(error);
        });
    },

    initializeSwiper() {
      this.swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      });
    },

    updateSwiperLayout() {
      if (this.swiper) {
        this.swiper.update();
      }
    },



    openAddEventModal() {
      this.isAddEventModalOpen = true;
    },

    closeAddEventModal() {
      this.isAddEventModalOpen = false;
      this.resetNewEvent();
    },

    resetNewEvent() {
      this.newEvent = {
        name: '',
        email: '',
        address: '',
        file: null,
        category: '',
        price: null,
        datetime: ''
      };
    },

    handleFileChange(event) {
      this.newEvent.file = event.target.files[0];
    },

    createEvent() {
      const formData = new FormData();
      formData.append('name', this.newEvent.name);
      formData.append('email', localStorage.getItem('registeredEmail'));
      formData.append('address', this.newEvent.address);
      formData.append('file', this.newEvent.file);
      formData.append('category', this.newEvent.category);
      formData.append('price', this.newEvent.price);
      formData.append('datetime', this.newEvent.datetime);

      axios
        .post('https://rachinsky.pythonanywhere.com/dashboard', formData)
        .then(response => {
          this.fetchEvents();
          this.closeAddEventModal();
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
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
  
  /* CSS styles for modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* CSS styles for button */
.add-event-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-event-button:hover {
  background-color: #0056b3;
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

  .rsvp-button {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: #e85555;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
  }
</style>