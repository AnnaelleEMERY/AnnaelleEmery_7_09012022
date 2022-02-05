<template>
  <main>
    <navBar />
    <h1>Mon Profil</h1>
    <div class="container mt-5 d-flex justify-content-center">
      <div class="card-profil p-4 mt-3">
        <div class="first">
          <h6 class="heading">{{ user.firstName }} {{ user.lastName }}</h6>
          <div class="time d-flex flex-row align-items-center justify-content-between mt-3"></div>
        </div>
        <div class="second d-flex flex-row mt-2">
          <div class="main">
            <div class="d-flex flex-row mb-1">
              <span>{{ user.email }} </span>
            </div>
          </div>
        </div>
        <hr class="line-color" />
        <div class="password">
          <p class="heading">Changer mon email</p>
          <label class="change" for="user-email">email:</label><br />
          <input class="input-mail-profile" id="user-email" v-model="user.email" />
          <div class="third mt-4">
            <button
              class="btn-lightest btn-success btn-block"
              @click.prevent="modifyProfil(user)"
            >
              Modifier
            </button>
          </div>
        </div>
        <hr class="line-color" />
        <div class="third mt-4">
          <button
            class="btn-lightest btn-success btn-block"
            @click.prevent="deleteUser()"
          >
            <i class="fas fa-trash"></i> Supprimer le compte
          </button>
        </div>
      </div>
    </div>
  </main>
</template>



<script>
import navBar from "../components/navBar.vue";
import axios from "axios";
export default {
  name: "profil",
  components: {
    navBar,
  },
  data() {
    return {
      user: "",
      email: "",
    };
  },
  created() {
    const userId = localStorage.getItem("user");
    const admin = localStorage.getItem("admin");
    axios
      .get("http://localhost:3000/api/users/" + userId + admin, {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      })
      .then((response) => (this.user = response.data))
      .catch((err) => console.log(err));
  },
  methods: {
    modifyProfil(user) {
      axios
        .put(
          "http://localhost:3000/api/users/" + user.id,
          {
            email: user.email,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.email = response.email;
        }, window.alert("modification effectué"))
        .catch((err) => console.log(err));
    },

    deleteUser() {
      const userId = localStorage.getItem("user");
      axios
        .delete("http://localhost:3000/api/users/" + userId, {
          headers: { Authorization: "Bearer " + localStorage.token },
        })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>


<style scoped>

@import '../css/profil.css';

</style>
