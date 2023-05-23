<template>
    <div>

  
      <div>
        <div class="topnav" id="myTopnav">
          <button @click="filterByCategory('dates')" class="category-button">Speed Dates</button>
          <button @click="filterByCategory('hobbies')" class="category-button">Hobbies & Travel</button>
          <button @click="filterByCategory('talk')" class="category-button">Talk House</button>
          <button @click="filterByCategory('art')" class="category-button">Art & Culture</button>
          <button @click="clearFilters" class="display-all-button">Show All</button>
        </div>
    
        <h2 style="margin-left: 5rem;">Explore upcoming events</h2>
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div v-for="branch in branches" :key="favorites.id" class="swiper-slide">
              <div style="height: 300px;" class="gallery-cell">
                <div class="card">
                  <a :href="`/${favorites.token}/shop`">
                    <img :src="getImageUrl(favorites.file)" :alt="favorites.name" class="card-img-top">
                  </a>
                  <div class="card-body">
                    <h4 class="card-title">{{ favorites.name }}</h4>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    
        <div class="search-container">
          <input type="text" v-model="searchTerm" placeholder="Search by name" class="search-input" />
          <button class="search-button">
            <i class="fas fa-search"></i>
          </button>
        </div>
    
        <h2 style="margin-left: 5rem;">Browse by Type</h2>
        <ul class="product-list">
          <li v-for="product in filteredProducts" :key="event.id" class="product-box" style="display:flex; align-items:center; width:90%; margin:5px;">
            <img :src="getImageUrl(event.image)" :alt="event.name" class="product-image" style="width:40%; margin-right:20px;">
            <div style="width:60%;">
              <h3 class="product-name">{{ event.name }} - ${{ event.price }}</h3>
            </div>
          </li>
        </ul>
      </div>
    </div>
<br><br><br><br><br>

  </template>

<script>
import axios from 'axios';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';


export default {

  props: {
  cartItems: {
    type: Array,
    required: true
  }
},

 
  data() {
    return {
      products: [],
      branches: [],
      selectedCategory: null,
      searchTerm: '',
      swiper: null,
      cartItems: []
    };
  },

  mounted() {
    this.fetchData();
    this.initializeSwiper();
  },

  beforeDestroy() {
    if (this.swiper) {
      this.swiper.destroy();
    }
  },

  methods: {
    fetchData() {
      axios
        .get('https://rachinsky.pythonanywhere.com/landing')
        .then(response => {
          this.products = response.data.products;
          this.branches = response.data.branches;
        })
        .catch(error => {
          console.error(error);
        });
    },

    filterByCategory(category) {
      this.selectedCategory = category;
    },

    clearFilters() {
      this.selectedCategory = null;
      this.searchTerm = '';
    },

    getImageUrl(image) {
      return `https://rachinsky.pythonanywhere.com/static/uploads/${image}`;
    },

    initializeSwiper() {
      this.swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        navigation: {
          nextEl: null,
          prevEl: null
        }
      });
    },

    addToCart(product) {
    const existingProduct = this.cartItems.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image // Include the image URL in the cart item
      };

      this.cartItems.push(cartItem);
    }

    this.$emit('cart-updated', this.cartItems); // Emit the 'cart-updated' event to the parent component (Index)
    console.log('Product added to cart:', product);
  }

  },
 

  computed: {
    filteredProducts() {
      let filtered = this.products;

      if (this.selectedCategory) {
        filtered = filtered.filter(product => product.category == this.selectedCategory);
      }

      if (this.searchTerm) {
        const searchTermLower = this.searchTerm.toLowerCase();
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(searchTermLower)
        );
      }

      return filtered;
    }
  }


};
</script>