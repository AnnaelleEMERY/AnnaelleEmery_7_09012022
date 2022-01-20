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
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap !important;
  background-color: #091f43;
  border-bottom: 4px solid #d1515a;
  padding: 1.5rem 2rem !important;
}

.header-list {
  display: flex;
  flex-direction: row;
}

.header-list li {
  margin-right: 1.5rem;
}

@media (max-width: 626px) {
  .header {
    flex-direction: column;
  }

  .header-list {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
}

.navbar-brand img {
  width: 10rem;
  margin-left: 0em;
  margin-right: 0.5rem;
}

.nav-item {
  font-size: large;
  font-weight: bolder;
  cursor: pointer;
  -webkit-transform: scale(1);
  transform: scale(1);
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
}
.nav-item:hover {
  -webkit-transform: scale(1.2);
  transform: scale(1.2);
}
.nav-link {
  font-family: "Comic Sans MS", cursive;
  color: white;
}
.navbar {
  width: 100%;
  margin-bottom: 40px;
  padding: 0 1rem;
}
</style>
