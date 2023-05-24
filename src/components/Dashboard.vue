<template>
    <div>
      <h1>Explore more upcoming events</h1>
      <button class="add-event-button" @click="openAddEventModal">Start a new group</button>
      <ul>
        <li v-for="event in events" :key="event.id">
          <h2>{{ event.name }}</h2>
          <p>Address: {{ event.address }}</p>
          <img :src="'https://rachinsky.pythonanywhere.com/static/uploads/' + event.file" alt="Event Image">
          <p>Email: {{ event.email }}</p>
        </li>
      </ul>
  
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
   
   
          <label>Price</label><br>
          <input type="number" v-model="newEvent.price"><br>
          <label>Date and Time</label><br>
          <input type="text" v-model="newEvent.datetime" required><br>
          <br>
                
          <select v-model="newEvent.category">
  <option value="">Select Category</option>
  <option value="Art">Art</option>
  <option value="Hobby">Hobby</option>
  <option value="Dates">Dates</option>
  <option value="Standup">Standup</option>
</select>
      <br>     <br>
            <button type="submit">Create</button>
            <button @click="closeAddEventModal">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
 

  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        events: [],
        isAddEventModalOpen: false,
        newEvent: {
          name: '',
          email: '',
          address: '',
          file: null, // Updated to store the file object
          category: '',
          price: null,
          datetime: ''
        }
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
        formData.append('email', this.newEvent.email);
        formData.append('address', this.newEvent.address);
        formData.append('file', this.newEvent.file);
        formData.append('category', this.newEvent.category);
        formData.append('price', this.newEvent.price);
        formData.append('datetime', this.newEvent.datetime);
        
        axios
          .post('https://rachinsky.pythonanywhere.com/dashboard', formData)
          .then(response => {
            // Event created successfully
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


  <style>
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
  </style>
  