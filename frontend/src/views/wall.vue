<template>
  <div>
    <navBar />
    <div class="container">
      <h1>Mur de conversations</h1>

      <div id="card">
        <Post
          v-for="post in posts"
          v-bind:key="post.id"
          :post="post"
          @deletePostEvent="deletePost"
        />
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "../components/navBar.vue";
import Post from "../components/Post";
import axios from "axios";

export default {
  name: "Wall",
  components: {
    navBar,
    Post,
  },
  data() {
    return {
      users: [],
      posts: [],
      comments: [],
    };
  },
  created() {
    axios
      .get("http://localhost:3000/api/users", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      })
      .then((response) => (this.users = response.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/api/auth/posts", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      })
      .then((response) => {
        console.log(response), (this.posts = response.data);
      })
      .catch((err) => console.log(err));
  },
  methods: {
    deletePost(item) {
      axios
        .delete("http://localhost:3000/api/auth/posts/" + item.id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.posts = this.posts.filter((post) => post.id != item.id);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>

</style>