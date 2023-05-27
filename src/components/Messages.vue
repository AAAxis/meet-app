<template>
    <div>
      <div class="topnav" id="myTopnav">
        <button @click="selectCategory('Standup')" class="category-button">Stand-up</button>
        <button @click="selectCategory('Hobby')" class="category-button">Hobby</button>
        <button @click="selectCategory('Dates')" class="category-button">Dating</button>
        <button @click="selectCategory('Art')" class="category-button">Pop-Art</button>
        <button @click="selectCategory('')" class="category-button">Show All</button>
      </div>
  
      <h1 style="margin: 1rem;">EVENTS CHATS</h1>
  
      <div>
        <div v-for="event in filteredEvents" :key="event.id" class="list-item">
          <div class="chat-container">
            <div class="avatar">
              <img :src="'https://rachinsky.pythonanywhere.com/static/uploads/' + event.file" alt="Event Image">
            </div>
            <div class="chat-content">
              <div class="group-name">
                <strong>{{ event.name }}</strong>
              </div>
              <div class="last-message">
                {{ event.lastMessage }}
              </div>
              <div class="time">
                {{ event.datetime }}
              </div>
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
        events: [],
        searchQuery: '',
        selectedCategory: null,
      };
    },
  
    mounted() {
      this.fetchEvents();
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
  
        if (this.selectedCategory) {
          filtered = filtered.filter(event =>
            event.category === this.selectedCategory
          );
        }
  
        return filtered;
      }
    },
  
    methods: {
      fetchEvents() {
        axios
          .get('https://rachinsky.pythonanywhere.com/landing')
          .then(response => {
            this.events = response.data.events;
          })
          .catch(error => {
            console.error(error);
          });
      },
  
      selectCategory(category) {
        this.selectedCategory = category;
      }
    }
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
  