<template>
  <navBar />
  <h1>Les membres de Groupomania</h1>
  <div class="container mt-5 d-flex justify-content-center">
    <div class="card p-4 m-3" v-for="user in users" v-bind:key="user.id">
        <h6 class="heading">{{ user.firstName }} <br />{{ user.lastName }}</h6>
        <p> {{ user.email }} </p>
        <button v-if="isAdmin.admin === 'true'" @click.prevent="deleteOneUser(user)">supprimer</button>
      </div>
  </div>
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
      isAdmin: window.sessionStorage,
    };
  },
  created() {
    axios
      .get("http://localhost:3000/api/users", {
        headers: {
          Authorization: "Bearer " + sessionStorage.token,
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
      axios
        .delete("http://localhost:3000/api/users/" + user.id, {
          headers: {
            Authorization: "Bearer " + sessionStorage.token,
          },
        })
        .then((response) => {
          console.log(response);

          const id = response.data;
          const userIndex = this.users.findIndex((user) => user.id === id);
          this.users.splice(userIndex, 1);
        })
        .catch((error) => {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },
  },
};
</script>


<style scoped>
#app {
  font-family: Comic Sans MS, cursive;
  background-color: #cccce2;
}
body {
  background-color: #eee;
}
.card {
  background-color: #d0cde2;
  width: 350px;
  border-radius: 20px;
  -webkit-transform: scale(1);
  transform: scale(1);
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
}
.card:hover {
  -webkit-transform: scale(1.2);
  transform: scale(1.2);
}
.container {
  flex-wrap: wrap;
}
.heading {
  font-weight: 700;
}
h1 {
  display: flex;
  justify-content: center;
  color: #f11f1f;
  font-family: "Comic Sans MS", cursive;
  margin-left: 10px;
}
.line-color {
  color: rgb(224, 17, 17);
  height: 3px;
}
</style>