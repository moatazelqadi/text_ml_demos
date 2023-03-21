<template>
  <header>
    <div class="collapse bg-dark" id="navbarHeader">
      <div class="container">
        <div class="row" >
        </div>
        
      </div>
    </div>
    <div class="navbar navbar-dark bg-dark shadow-sm">
    </div>
  </header>

  <RouterView />

  <footer class="text-muted py-5">
    <div class="container">
      <p class="float-end mb-1">
        <a href="https://www.linkedin.com/in/moatazmedhat">ElQadi on Linkedin</a>
      </p>
      <p class="mb-1">&copy; ElQadi, {{ new Date().getFullYear() }}</p>
    </div>
  </footer>
</template>

<style scoped></style>
<script>


import { RouterLink, RouterView } from 'vue-router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

</script>
