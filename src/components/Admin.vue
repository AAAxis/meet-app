<template>
  <div>


    <h2>Approved Events</h2>
    <table class="event-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in approvedEvents" :key="event.id">
          <td>
            <img :src="'https://rachinsky.pythonanywhere.com/static/uploads/' + event.file" alt="Event Image">
          </td>
          <td>{{ event.name }}</td>
          <td>{{ event.address }}</td>
          <td>
            <a style="margin-right: 15px;" :href="getLink(event.id)">
              <i  class="fas fa-pen"></i>
            </a>
            <i style="margin-right: 15px; color:red" class="fas fa-times" @click="declineEvent(event.id)"></i>
          </td>
        </tr>
      </tbody>
    </table>

    <h2>Events in Process</h2>
    <table class="event-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in inProcessEvents" :key="event.id">
          <td>
            <img :src="'https://rachinsky.pythonanywhere.com/static/uploads/' + event.file" alt="Event Image">
          </td>
          <td>{{ event.name }}</td>
          <td>{{ event.address }}</td>
          <td>

            <i style="margin-right: 15px; color:green;"  class="fas fa-check" @click="approveEvent(event.id)"></i>
            <i style="margin-right: 15px; color:red" class="fas fa-times" @click="declineEvent(event.id)"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      approvedEvents: [],
      inProcessEvents: []
    };
  },
  mounted() {
    this.fetchEvents();
  },
  methods: {
    getLink(eventId) {
      // Return the absolute URL with the event ID parameter
      return 'https://rachinsky.pythonanywhere.com/events/' + eventId + '/edit';
    },
    fetchEvents() {
  axios
    .get('https://rachinsky.pythonanywhere.com/dashboard')
    .then(response => {
      this.approvedEvents = response.data.events.filter(event => event.approved == true);
      this.inProcessEvents = response.data.events.filter(event => event.approved == false);
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

<style scoped>
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

.fa-pen:before {
  content: "\f044";
}

.fa-check:before {
  content: "\f00c";
}

.fa-times:before {
  content: "\f00d";
}
</style>
