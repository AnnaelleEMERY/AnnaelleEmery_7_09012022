<template>
  <main>
    <navBar />
    <h1>Les membres de Groupomania</h1>
    <div class="container-members mt-5 d-flex justify-content-center">
      <div
        class="card-members p-4 m-3"
        v-for="user in users"
        v-bind:key="user.id"
      >
        <h6 class="heading">{{ user.firstName }} <br />{{ user.lastName }}</h6>
        <p>{{ user.email }}</p>
        <button
          class="btn_delete-members"
          v-if="isAdmin.admin === 'true'"
          @click.prevent="deleteOneUser(user)"
        >
          supprimer
        </button>
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
      users: [],
      user: [],
      email: "",
      isAdmin: window.localStorage,
    };
  },
  created() {
    axios
      .get("http://localhost:3000/api/users", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      })
      .then((response) => {
        console.log(response);
        this.users = response.data;
      })

      .catch((err) => console.log(err));
  },
  methods: {
    deleteOneUser(user) {
        console.log("user.id");
        console.log(user.id);
        console.log("localStorage.user");
        console.log(localStorage.user);

        if (user.id == localStorage.user) {

          axios
            .delete("http://localhost:3000/api/users/" + user.id, {
              headers: {
                Authorization: "Bearer " + localStorage.token,
              },
            })
              .then((response) => {
              console.log(response);
              this.users.splice(this.users.indexOf(user), 1);

              sessionStorage.clear();
              localStorage.clear();
              this.$router.push("/");
            })
            .catch((error) => {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            });
        } else {
          axios
            .delete("http://localhost:3000/api/users/" + user.id, {
              headers: {
                Authorization: "Bearer " + localStorage.token,
              },
            })
              .then((response) => {
              console.log(response);
              this.users.splice(this.users.indexOf(user), 1);
            })
            .catch((error) => {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
        })
      }
    },
  },
};
</script>


<style scoped>
@import "../css/members.css";
</style>