<template>
    <div>
      <h1>Events Dashboard</h1>
      <button class="add-event-button" @click="openAddEventModal">Add Event</button>
      <ul>
        <li v-for="event in events" :key="event.id">
          <h2>{{ event.name }}</h2>
          <p>Address: {{ event.address }}</p>
          <img :src="'https://rachinsky.pythonanywhere.com/static/uploads/' + event.file" alt="Event Image">
          <p>Email: {{ event.email }}</p>
          <button @click="approveEvent(event.id)">Approve</button>
          <button @click="declineEvent(event.id)">Decline</button>
        </li>
      </ul>
  
      <!-- Add Event Modal -->
      <div v-if="isAddEventModalOpen" class="modal">
        <div class="modal-content">
          <h2>Add Event</h2>
          <form @submit.prevent="createEvent">
            <label>Name</label><br>
            <input type="text" v-model="newEvent.name" required><br>
            <label>Email</label><br>
            <input type="email" v-model="newEvent.email" required><br>
            <label>File</label><br>
            <input type="file" ref="fileInput" accept="image/*" @change="handleFileChange" required><br>
  
            <label>Address</label><br>
            <input type="text" v-model="newEvent.address" required><br>
            <label>Category</label><br>
            <input type="text" v-model="newEvent.category"><br>
            <label>Price</label><br>
            <input type="number" v-model="newEvent.price"><br>
            <label>Date and Time</label><br>
            <input type="text" v-model="newEvent.datetime" required><br>
            <br>
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
      },
      approveEvent(eventId) {
        axios
          .post(`https://rachinsky.pythonanywhere.com/events/${eventId}/approve`)
          .then(response => {
            // Event approved successfully
            this.fetchEvents();
          })
          .catch(error => {
            console.error(error);
          });
      },
      declineEvent(eventId) {
        axios
          .post(`https://rachinsky.pythonanywhere.com/events/${eventId}/decline`)
          .then(response => {
            // Event declined successfully
            this.fetchEvents();
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };
  </script>
  