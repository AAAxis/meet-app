<template>
<div>
    <h1>Available Events</h1>

    <div>
      <input type="text" v-model="searchQuery" placeholder="Search">
      <select v-model="selectedCategory">
        <option value="">All Categories</option>
        <option value="Datting">Dates</option>
        <option value="Art">Art</option>
      </select>
    </div>

    <ul>
      <li v-for="event in filteredEvents" :key="event.id">
        <h2>{{ event.name }}</h2>
        <p>Cat: {{ event.category }}</p>
        <img :src="'https://rachinsky.pythonanywhere.com/static/uploads/' + event.file" alt="Event Image">
        <p>Email: {{ event.email }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      events: [],
      searchQuery: '',
      selectedCategory: ''
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
          event.category == this.selectedCategory
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
    }
  }
};
</script>
