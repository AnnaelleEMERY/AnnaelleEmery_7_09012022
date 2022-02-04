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
                  <label id="label-title" for="title">Sujet</label><br />
                  <input
                    aria-labelledby="label-title"
                    type="text"
                    v-model="title"
                    class="form-control"
                  /><br />

                  <label id="label-content" for="postMsg">Exprimez-vous</label>
                  <textarea
                    aria-labelledby="label-content"
                    v-model="content"
                    class="form-control"
                    id="postMgs"
                    rows="3"
                  ></textarea>

                  <!-- IMAGE -->
                  <div>
                    <label class="d-none" id="file-input" for="file-input">Choisissez une image</label>
                    <input
                      aria-labelledby="file-input"
                      class="custom-file-input"
                      type="file"
                      accept="image/*"
                      @change="uploadImage($event)"
                      id="file-input"
                      ref="fileInput"
                    />
                  </div>

                  <div class="mgs">{{ message }}</div>
                </div>
                <button
                  class="btn btn_primary pull-right btn-post-partager"
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
      image: "",
      file: "",
      content: "",
      post: [],
      comment: [],
      createdAt: "",
      title: "",
      message: "",
    };
  },

  created() {
    const userId = localStorage.getItem("user");
    axios
      .get("http://localhost:3000/api/users/" + userId, {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      })
      .then((response) => (this.user = response.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/api/auth/posts/" + userId, {
        headers: {
          Authorization: "Bearer " + localStorage.token,
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
      } else if (this.file) {
        const formData = new FormData();
        formData.append("content", this.content);
        formData.append("title", this.title);
        formData.append("file", this.file, this.file.name);
        axios
          .post("http://localhost:3000/api/auth/posts/post", formData, {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          })
          .then((response) => {
            console.log(response);
            this.$emit("added", response.data);
            this.content = "";
            this.title = "";
            this.file = "";
            const userId = localStorage.getItem("user");
            axios
              .get("http://localhost:3000/api/auth/posts/" + userId, {
                headers: {
                  Authorization: "Bearer " + localStorage.token,
                },
              })
              .then((response) => {
                console.log(response);
                this.posts = response.data;
                this.message = "";
              })
              .catch((err) => console.log(err));
          });
      } else {
        const payload = {
          content: this.content,
          title: this.title,
        };
        axios
          .post("http://localhost:3000/api/auth/posts/post", payload, {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          })
          .then((response) => {
            console.log(response);
            this.$emit("added", response.data);
            this.content = "";
            this.title = "";
            const userId = localStorage.getItem("user");
            axios
              .get("http://localhost:3000/api/auth/posts/" + userId, {
                headers: {
                  Authorization: "Bearer " + localStorage.token,
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

    // Ajout d'une image dans le post
    uploadImage(e) {
      console.log(this.file);
      this.file = e.target.files[0];
    },

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
body {
  background-color: white;
}

.main {
  padding-bottom: 2rem;
  background-color: white;
  margin-top: 2rem;
  border-radius: 30px;
}

.container {
  font-family: Arial, Helvetica, sans-serif;
}

h1 {
  font-family: "Julius Sans One", sans-serif;
  color: #d1515a;
  font-weight: 900;
}

.div-post-creation {
  padding: 1.5rem;
  border-radius: 30px;
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
  font-family: "Exo 2", sans-serif;
  color: #091F43;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.custom-file-input {
  padding-top: 1rem;
}

.row {
  margin-bottom: 50px;
  margin-top: 50px;
  background-color: rgb(216, 212, 206);
}

.btn-post-partager {
  margin-top: 1.5rem;
  font-family: "Julius Sans One", sans-serif;
}

.btn_primary {
  background-color: #091f43;
  color: white;
}

.btn_primary:hover {
  background-color: #d1515a;
  color: white;
}

.mgs {
  color: #d1515a;
}
</style> 