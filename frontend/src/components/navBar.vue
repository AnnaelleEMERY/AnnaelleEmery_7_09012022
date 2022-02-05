<template>
  <div>
    <nav class="row-12 navbar navbar-expand-lg navbar header">
      <div class="navbar-brand">
        <img src="../assets/icon-left-font-monochrome-white.png" alt="titre" />
      </div>

      <div class="collapse navbar-collapse d-flex" id="navbarNav">
        <ul class="navbar-nav header-list">
          <li class="nav-item active">
            <router-link to="/perso" class="nav-link">Ma page </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/wall" class="nav-link">Mur</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/profil" class="nav-link">Profil</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/membre" class="nav-link">Membres</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logout()">Déconnection</a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "navBar",
  methods: {
    logout() {
      sessionStorage.clear();
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>

@import '../css/navBar.css';

</style>
