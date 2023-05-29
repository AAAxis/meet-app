<template>
  <h1 style="margin: 1rem;">NOTIFICATIONS</h1>

  <div>
    <div v-for="event in rcvp" :key="event.id" class="list-item">
      <div class="chat-container">
        <div class="avatar">
          <img :src="event.image" alt="Event Image">
        </div>
        <div class="chat-content">
          <div class="group-name">
            <strong>{{ event.name }} </strong>
          </div>
          <div class="last-message">
            User {{ event.email }} joined a group
              </div>
             
          <div class="time">
  {{ new Date(event.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
</div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import axios from 'axios';

export default {
  data() {
    return {
      rcvp: [], // Replaced 'events' with 'rcvp'
    };
  },

  mounted() {
    this.fetchRcvp(); // Updated method name
  },

  methods: {
    fetchRcvp() { // Updated method name
      axios
        .get('https://rachinsky.pythonanywhere.com/rcvp') // Updated URL
        .then(response => {
          this.rcvp = response.data.rcvp; // Updated response data property
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>
  
  <style>
  .list-item {
    margin-bottom: 10px;
  }
  
  .chat-container {
    display: flex;
    align-items: center;
    background-color: #f0f0f0;
    border-radius: 10px;
    padding: 10px;
  }
  
  .avatar {
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
  }
  
  .avatar img {
    object-fit: cover;
    width: 50px;
    height: 50px;
  }
  
  .chat-content {
    flex: 1;
  }
  
  .group-name {
    font-weight: bold;
  }
  
  .last-message {
    margin-top: 5px;
  }
  
  .time {
    font-size: 0.8rem;
    color: #888;
  }
  </style>
  
          