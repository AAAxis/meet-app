<template>
  <div>
    <div class="topnav" id="myTopnav">
      <button @click="selectCategory('Standup')" class="category-button">Stand-up</button>
      <button @click="selectCategory('Hobby')" class="category-button">Hobby</button>
      <button @click="selectCategory('Dates')" class="category-button">Dating</button>
      <button @click="selectCategory('Art')" class="category-button">Pop-Art</button>
      <button @click="selectCategory('')" class="category-button">Show All</button>
    </div>

    <h1 style="margin: 1rem;">EVENTS NEAR YOU</h1>

    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="event in filteredEvents" :key="event.id" class="swiper-slide">
          <div style="height: 461px; margin: 10px; width: 370px;" class="gallery-cell">
            <div class="card">
              <img style="object-fit: cover;" :src="'https://rachinsky.pythonanywhere.com/static/uploads/' + event.file" height="470" width="370" alt="Event Image">
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
              <div class="card-body">
                <a href="/login">
                  <div class="swipe-symbols">
                    <div class="like-symbol">
                      <i class="fa fa-thumbs-up"></i>
                    </div>
                    <div class="decline-symbol">
                      <i class="fa fa-thumbs-down"></i>
                    </div>
                  </div>
                </a>
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

  </div>

  <div class="footer">
    <div class="footer-buttons">
      <a href="/login" class="footer-button">
        <i class="fa-regular fa-user fa-lg"></i>
        <span class="footer-button-label">Profile</span>
      </a>
      <a href="/login" class="footer-button">
        <i class="fa-regular fa-font-awesome fa-lg"></i>
        <span class="footer-button-label">Home</span>
      </a>
      <a href="/login" class="footer-button">
        <i class="fa-solid fa-people-pulling fa-lg"></i>
        <span class="footer-button-label fa-lg">Explore</span>
      </a>
      <a href="/login" class="footer-button">
        <i class="fa-regular fa-comments fa-lg"></i>
        <span class="footer-button-label">Messages</span>
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import Navbar from './Navbar.vue';

export default {
  components: {
    Navbar
  },
  data() {
    return {
      events: [],
      searchQuery: '',
      selectedCategory: null,
      swiper: null // Added swiper property
    };
  },

  mounted() {
    this.fetchEvents();
  },

  computed: {
    filteredEvents() {
      let filtered = this.events.filter(event => event.approved == true);


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

    selectCategory(category) {
      this.selectedCategory = category;
    }
  }
};
</script>
