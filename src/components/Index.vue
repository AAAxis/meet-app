<template>
  <div class="full-page-cover">
<h1 style="padding:3rem;">Meetup Israel</h1>

    <!-- Your page content here -->

    <!-- Div with Centered Text -->
    <div class="centered-text">
 
      <br>
      <a href="https://rachinsky.pythonanywhere.com/static/app-release.apk" download="">
 <img src="https://images.ctfassets.net/23u853certza/1Djo4jOj0doR5PfWVzj9O6/d52acac7f94db66263f5ad9e01c41c82/google-play-badge.png" width="200px;"></a> <br><br>
 <a href="https://rachinsky.pythonanywhere.com/static/config-release.mobileconfig" download="">
<img src="https://images.ctfassets.net/23u853certza/7xaqvusYmbDlca5umD9bZo/a0fa3e1c7ca41a70c6285d6c7b18c92b/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" width="200px;"></a>

    </div>

    <!-- Cookies -->
    <div class="alert alert-warning alert-dismissible fade show fixed-bottom text-center" role="alert" id="cookies">
      <strong>This site uses Cookies</strong> for optimal site performance and user experience. 
      <button type="button" class="btn btn-light" data-dismiss="alert" aria-label="close">
        <span aria-hidden="true">Agree to Cookies</span>
      </button>
    </div><!-- End Cookies -->
  </div>
</template>


<script>
export default {
  name: 'FullPageImageCover',
  // Add any component logic here
}
</script>

<style>
.full-page-cover {
  height: 100vh; /* Set the container height to cover the entire viewport */
  background-image: url('https://rachinsky.pythonanywhere.com/static/Homepage.jpeg'); /* Replace with the path to your image */
  background-size: cover; /* Scale the image to cover the container */
  background-position: center; /* Center the image horizontally and vertically */
}


.image-navbar {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1;
}

.image-navbar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.image-navbar li {
  display: inline-block;
  margin-right: 10px;
}

.image-navbar a {
  text-decoration: none;
  color: #1B1B1B;
  font-size:x-large;
  font-weight: bold;
}

.centered-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #1B1B1B;
}

</style>
