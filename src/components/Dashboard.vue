<template>

  
  
      <h1 style="margin: 1rem;">EVENTS NEAR YOU</h1>
  
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div v-for="event in filteredEvents" :key="event.id" class="swiper-slide">
            <div style="height: 461px; margin: 10px; width: 370px;" class="gallery-cell">
              <div class="card">
                <img style="object-fit: cover;" :src="'https://rachinsky.pythonanywhere.com/static/uploads/' + event.file" height="450" width="370" alt="Event Image">
                <div class="swipe-symbols">

<div class="like-symbol">
    <a @click="addLike(event.id)">  <i class="fa-solid fa-bookmark"></i>    </a>
</div>

<div class="plus-symbol">
    <a @click="selectEvent(event.id)"> <i class="fa-solid fa-user-plus"></i>  </a>


</div>
</div>       

                <div class="event-info">

<div class="event-info">
  <div class="left-info">
    <h2 class="event-name">{{ event.name }}</h2>
    <div class="address">
      <i class="fa fa-map-marker"></i>
      <span class="location-text">{{ event.address }}</span>
    </div>
  </div>
  <div class="right-info">
    <div class="event-date">{{ event.datetime }}</div>
    <div class="address">
      <i class="fa-solid fa-mug-hot"></i>
      <span class="location-text">{{ event.category }}</span>
    </div>
  </div>
</div>


</div>
          </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="search-container">
        <input type="text" v-model="searchQuery" placeholder="Search" />
        <button class="search-button">
          <i class="fas fa-search"></i>
        </button>
      </div>

      <div>


      <div class="liked-events">
  <h1 style="margin: 1rem;">SAVED EVENTS</h1>
  <ul class="liked-events-list">
    <li v-for="eventId in likedEvents" :key="eventId">
      <div class="liked-event">
        <img :src="getEventImage(eventId)" height="100" width="100" alt="Event Image" />
        <span>{{ getEventName(eventId) }}</span>

        <a @click="removeLike(eventId)">
 
        <div style='margin-left: 30px;' class="like-symbol">
            <i class="fa-solid fa-trash"></i>
        </div>
      
  
    </a>
      
     </div>
    </li>
  </ul>
</div>

      
<br><br><br><br><br>


<Modal v-if="showModal" @close="closeModal" class="modal">
    <div class="modal-content">
      <span class="modal-close" @click="closeModal">&times;</span> <!-- Close button -->
      
      <img :src="getEventImage(selectedEventId)" height="350" width="350" alt="Event Image" />
      <h2>{{ getEventName(selectedEventId) }}</h2>
      
      <p>Event Date: {{ getEventDatetime(selectedEventId) }}</p>
        <p>Event Address: <a href="#" @click="redirectToGoogleMaps">{{ getEventAddress(selectedEventId) }}</a></p>
  
     
      <p>Event Price: {{ getEventPrice(selectedEventId) }}</p>
      <!-- Add any additional event information you want to display -->
      
      <button @click="joinEvent(selectedEventId)">Join</button>
    </div>
  </Modal>

    </div>
  </template>
<script>
import axios from 'axios';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

export default {


  data() {
    return {
      showModal: false,
      selectedEventId: null,
      events: [],
      searchQuery: '',
      swiper: null,
      eventPrice: null, 
      eventName: null,
      eventImage: null,
      eventAddress: null,
      likedEvents: [], // Add likedEvents property
    };
  },

  mounted() {
    this.fetchLikedEvents();
    this.fetchEvents();
    this.initializeSwiper(); // Initialize swiper after fetching events



  },

  computed: {
    filteredEvents() {
      let filtered = this.events;

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(event =>
          event.name.toLowerCase().includes(query)
        );
      }


      // Filter only the events that are approved
      filtered = filtered.filter(event => event.approved === true);

      return filtered;
    }
  },
  methods: {

    redirectToGoogleMaps() {
      const eventAddress = this.getEventAddress(this.selectedEventId);
      const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(eventAddress);
      window.location.href = googleMapsUrl;
    },
   
  
    openModal(eventId) {
  this.selectedEventId = eventId;
  this.showModal = true;
  

},
    closeModal() {
      this.showModal = false;
    },
  
    selectEvent(eventId) {
      this.selectedEventId = eventId; // Set the selectedEventId
      this.openModal(); // Open the modal
 
    },

    openModal() {
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false; // Set showModal to false to close the modal
      this.selectedEventId = null; // Reset the selectedEventId
      this.eventPrice = null; // Reset the selectedEventId
      this.eventAddress = null; // Reset the selectedEventId
      this.eventName = null; // Reset the selectedEventId
      this.eventImage= null; // Reset the selectedEventId

    },

    joinEvent(selectedEventId) {
      const userId = localStorage.getItem('registeredEmail');
      if (!userId) {
        console.error('User ID not found in local storage.');
        return;
      }

      const data = {
        userId: userId,
        eventId: selectedEventId,
        eventPrice: this.getEventPrice(selectedEventId), 
        eventAddress: this.getEventAddress(selectedEventId), 
        eventImage: this.getEventImage(selectedEventId), 
        eventName: this.getEventName(selectedEventId), 
      };

      axios
        .post('https://rachinsky.pythonanywhere.com/join-event', data)
        .then(response => {
          // Handle success response
          console.log(response.data.message);
          // Update the likedEvents array with the new liked event
          this.closeModal(); // Close the modal after successful join
        })
        .catch(error => {
          // Handle error response
          console.error(error.response.data.error);
          this.closeModal(); // Close the modal after success
        });
    },



    getEventImage(eventId) {
      const event = this.events.find(event => event.id === eventId);
      if (event) {
        return 'https://rachinsky.pythonanywhere.com/static/uploads/' + event.file;
      }
      return ''; // Return a default image URL or handle the case when event is not found
    },

    getEventName(eventId) {
      const event = this.events.find(event => event.id === eventId);
      if (event) {
        return event.name;
      }
      return ''; // Return a default name or handle the case when event is not found
    },

    getEventDatetime(eventId) {
      const event = this.events.find(event => event.id === eventId);
      if (event) {
        return event.datetime;
      }
      return ''; // Return a default name or handle the case when event is not found
    },

    getEventAddress(eventId) {
      const event = this.events.find(event => event.id === eventId);
      if (event) {
        return event.address;
      }
      return ''; // Return a default name or handle the case when event is not found
    },

    getEventPrice(eventId) {
      const event = this.events.find(event => event.id === eventId);
      if (event) {
        return event.price;
      }
      return ''; // Return a default name or handle the case when event is not found
    },

    fetchLikedEvents() {
  const user_id = localStorage.getItem('registeredEmail'); // Get the user ID from localStorage

  if (!user_id) {
    console.error('User ID not found in local storage.');
    return;
  }

  this.likedEvents = JSON.parse(localStorage.getItem('likedEvents')) || [];
  console.log('Liked events fetched from local storage:', this.likedEvents);
},


removeLike(eventId) {
  const userId = localStorage.getItem('registeredEmail');
  if (!userId) {
    console.error('User ID not found in local storage.');
    return;
  }

  // Remove the event ID from the likedEvents array
  const eventIndex = this.likedEvents.indexOf(eventId);
  if (eventIndex !== -1) {
    this.likedEvents.splice(eventIndex, 1);
    localStorage.setItem('likedEvents', JSON.stringify(this.likedEvents));
    console.log('Event removed from likedEvents in local storage.');
  } else {
    console.log('Event not found in likedEvents.');
  }
},



    addLike(eventId) {
  const userId = localStorage.getItem('registeredEmail');
  if (!userId) {
    console.error('User ID not found in local storage.');
    return;
  }

  // Check if the event ID is already in the likedEvents array
  if (this.likedEvents.includes(eventId)) {
    console.log('Event already saved.');
    return;
  }

  // Update the likedEvents array with the new liked event
  this.likedEvents.push(eventId);
  localStorage.setItem('likedEvents', JSON.stringify(this.likedEvents));
  console.log('Event added to likedEvents in local storage.');
},


    fetchEvents() {
      axios
        .get('https://rachinsky.pythonanywhere.com/dashboard')
        .then(response => {
          this.events = response.data.events;
          this.initializeSwiper(); // Initialize swiper after fetching events
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
        this.swiper.update(); // Update Swiper layout
      }
    },

    selectCategory(category) {
      this.selectedCategory = category;

      // Trigger re-evaluation of computed property after updating the selected category
      this.$nextTick(() => {
        this.filteredEvents;
        this.updateSwiperLayout(); // Update Swiper layout after filtering
      });
    },


    
  }
};
</script>

 
  <style scoped>
  .liked-events {
    margin-top: 20px;
  }
  
  .liked-events-list {
    list-style-type: none; /* Remove list points */
    padding: 0;
    margin: 0;
  }
  
  /* Rest of the CSS styles for .liked-event remain the same */
  .liked-event {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .liked-event img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 10px;
    border-radius: 5px;
  }
  
  .liked-event span {
    font-size: 18px;
    font-weight: bold;
  }
  
  .liked-event:hover {
    background-color: #ebebeb;
    cursor: pointer;
  }
  
  .liked-event:hover img {
    opacity: 0.8;
  }


  .modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}
.map-container {
  height: 300px; /* Adjust the height as needed */
}
.modal-content {
  background-color: #fff;
  padding: 20px;
  max-width: 500px;
  width: 100%;
  max-height: 90%;
  overflow-y: auto;
  text-align: center;
}

.modal-content img {
  display: block;
  margin: 0 auto;
}

.modal-content h2 {
  margin-top: 20px;
}

.modal-content p {
  margin-top: 10px;
}

.modal-content button {
  margin-top: 20px;
  background-color: #337ab7;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #23527c;
}




.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: black;
  cursor: pointer;
}

.modal-close:hover {
  color: #fff;
}

  </style>
  
    