<template>
  <div class="content">
    <h2>Add Event</h2>
    <form @submit.prevent="createEvent">
      <input type="file" ref="fileInput" accept="image/*" @change="handleFileChange" required><br>
      <input type="text" v-model="newEvent.name" required><br>
      <input type="text" v-model="newEvent.address" required><br>
      <label>Email:</label>
      <input type="text" v-model="newEvent.email" ><br>
 
      
      <label>Optional Settings</label><br>
      <input type="date" class="datepicker" v-model="newEvent.datetime" required>
   
   
      <select v-model="newEvent.category">
        <option value="Select">Select Category</option>
        <option value="Art">Art</option>
        <option value="Hobby">Hobby</option>
        <option value="Standup">Standup</option>
      </select>

      <div class="input-with-volume">
        <input type="range" v-model="newEvent.price" min="0">
        <span>{{ newEvent.price }}</span>
      </div>

      <br><br>
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
  return {
    events: [],
    newEvent: {
      name: 'My New Event',
      address: '333 17th Ave SW, Calgary',
      file: null,
      email: '', // Initialize email as an empty string
      category: 'Select',
      price: "Free Event",
      datetime: ''
    }
  };
},

mounted() {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('email');

  if (email) {
    localStorage.setItem('registeredEmail', email);
    this.newEvent.email = email; // Set the value of newEvent.email
  }
    // Set today's date as the default value for the date input
    const today = new Date().toISOString().substr(0, 10);
  this.newEvent.datetime = today;
  },

  methods: {
    createEvent() {
      const formData = new FormData();
      formData.append('name', this.newEvent.name);
      formData.append('email', localStorage.getItem('registeredEmail')); // Get email from local storage
      formData.append('address', this.newEvent.address);
      formData.append('file', this.newEvent.file, this.newEvent.file.name); // Pass the file with its original name
      formData.append('category', this.newEvent.category);
      formData.append('price', this.newEvent.price);
      formData.append('datetime', this.newEvent.datetime);
      
      axios.post('https://rachinsky.pythonanywhere.com/dashboard', formData)
        .then(response => {
          // Handle the response if needed
          console.log(response);
          // Clear the form fields
          this.newEvent.name = '';
          this.newEvent.address = '';
          this.newEvent.file = null;
          this.newEvent.category = 'Select';
          this.newEvent.price = 0;
          this.newEvent.datetime = '';
        })
        .catch(error => {
          console.error(error);
          // Handle the error if needed
        });
    },
    handleFileChange(event) {
      this.newEvent.file = event.target.files[0];
    }
  }
}
</script>

<style scoped>
.content {
  max-width: 400px;
  margin: 0 auto;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

form {
  display: flex;
  flex-direction: column;
}

input[type="file"],
input[type="text"],
input[type="date"],
select,
input[type="range"] {
  margin-bottom: 10px;
  padding: 5px;
}

button[type="submit"] {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
