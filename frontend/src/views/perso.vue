<template>
  <div>
    <navBar />
    <div class="container">
      <div class="container pb-cmnt-container">
        <h1>Bienvenue sur ta page {{ user.firstName }} {{ user.lastName }}</h1>
        <div class="row div-post-creation">
          <div class="col-md-9 col-md-offset-3">
            <div class="panel panel-info">
              <div class="panel-body">
                <div class="form-group green-border-focus">
                  <label for="title">Sujet</label><br />
                  <input
                    type="text"
                    v-model="title"
                    class="form-control"
                  /><br />
                  <label for="postMsg">Exprimez-vous</label>
                  <textarea
                    v-model="content"
                    class="form-control"
                    id="postMgs"
                    rows="3"
                  ></textarea>
                  <div class="mgs">{{ message }}</div>
                </div>
                <button
                  class="btn btn-primary pull-right btn-post-partager"
                  type="text"
                  @click="postMessage()"
                >
                  Partager
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Post
        v-for="post in posts"
        v-bind:key="post.id"
        :post="post"
        @deletePostEvent="deletePost"
      />
    </div>
  </div>
</template>

<script>
import navBar from "../components/navBar.vue";
import Post from "../components/Post";
import axios from "axios";

export default {
  name: "Perso",
  components: {
    navBar,
    Post,
  },
  data() {
    return {
      user: [],
      posts: [],
      users: [],
      content: "",
      post: [],
      comment: [],
      createdAt: "",
      title: "",
      message: "",
    };
  },
  created() {
    const userId = sessionStorage.getItem("user");
    axios
      .get("http://localhost:3000/api/users/" + userId, {
        headers: {
          Authorization: "Bearer " + sessionStorage.token,
        },
      })
      .then((response) => (this.user = response.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/api/auth/posts/" + userId, {
        headers: {
          Authorization: "Bearer " + sessionStorage.token,
        },
      })
      .then((response) => {
        console.log(response);
        this.posts = response.data;
      })
      .catch((err) => console.log(err));
  },

  methods: {
    postMessage() {
      if (this.content == "" || this.title == "") {
        this.message = "Veuillez inscrire un sujet et un message";
      } else {
        axios
          .post(
            "http://localhost:3000/api/auth/posts/post",
            { content: this.content, title: this.title },
            {
              headers: {
                Authorization: "Bearer " + sessionStorage.token,
              },
            }
          )
          .then((response) => {
            console.log(response);
            this.content = "";
            this.title = "";
            const userId = sessionStorage.getItem("user");
            axios
              .get("http://localhost:3000/api/auth/posts/" + userId, {
                headers: {
                  Authorization: "Bearer " + sessionStorage.token,
                },
              })
              .then((response) => {
                console.log(response);
                this.posts = response.data;
                this.message = "";
              })
              .catch((err) => console.log(err));
          });
      }
    },
    deletePost(item) {
      axios
        .delete("http://localhost:3000/api/auth/posts/" + item.id, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
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
body {
  background-color: rgb(218, 214, 210);
}

main {
  border: 2px solid #d1515a;
  padding: 1rem;
  background-color: rgb(218, 212, 212);
  margin-top: 2rem;
  border-radius: 5px;
}

.container {
  font-family: "Comic Sans MS", cursive;
}

h1 {
  font-family: "Comic Sans MS", cursive;
  color: #d1515a;
}

.div-post-creation {
  padding: 1.5rem;
  border: 2px solid rgb(40, 40, 144);
  border-radius: 5px;
}

.form {
  margin-top: 30px;
}

.form-control {
  border-radius: 20px;
}

.form-group {
  margin-top: 30px;
}

label {
  font-family: "Comic Sans MS", cursive;
  color: rgb(48, 48, 172);
  margin-bottom: 0.5rem;
}

.row {
  margin-bottom: 50px;
  margin-top: 50px;
  background-color: rgb(216, 212, 206);
}

.btn-post-partager {
  margin-top: 1.5rem;
}

.mgs {
  color: #d1515a;
}
</style> 