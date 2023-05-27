<template>
    <div>
      <h1>Admin Dashboard</h1>
      <table class="event-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Address</th>
         
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events" :key="event.id">
            <td>
              <img :src="'https://rachinsky.pythonanywhere.com/static/uploads/' + event.file" alt="Event Image">
            </td>
            <td>{{ event.name }}</td>
            <td>{{ event.address }}</td>
          
            <td>{{ event.email }}</td>
            <td>
                <span class="action-icon approve-icon" @click="approveEvent(event.id)">
              <i class="fas fa-check"></i>
            </span><br>
            <span class="action-icon decline-icon" @click="declineEvent(event.id)">
              <i class="fas fa-times"></i>
            </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <style>
  .event-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .event-table th,
  .event-table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ccc;
  }
  
  .event-table th {
    background-color: #f2f2f2;
  }
  
  .event-table img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
  


  
  </style>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        events: []
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
  