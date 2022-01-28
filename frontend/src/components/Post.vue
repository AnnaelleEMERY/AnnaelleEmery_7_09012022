<template>
  <div class="main">
    <div class="d-flex justify-content-between mt-2">
      <div class="d-flex flex-row">
        <div class="d-flex flex-column">
          <h6 class="mb-0">
            {{ post.user.firstName }} {{ post.user.lastName }}
          </h6>
          <span class="date"> {{ formatDate(post.createdAt) }} </span>
        </div>
      </div>
    </div>

    <!-- Post affiché -->
    <div v-if="!modifPost" class="titleCon">
      <p class="title">{{ post.title }}</p>
      <p class="content">{{ post.content }}</p>
    </div>

    <!-- Modification du post (apparition de => input + textarea) -->
    <div v-else class="d-flex flex-column">
      <input type="text" class="title" v-model="titleEdited" />
      <textarea
        name="textarea"
        v-model="contentEdited"
        rows="3"
        class="content"
      ></textarea>
      <div class="mgs">{{ messageEdited }}</div>

      <!-- Boutons 'annuler' et 'modifier' -->
      <div class="d-flex">
        <div class="inline-block mt-2">
          <button
            class="btn btn_primary btn-sm ms-1"
            v-if="post.userId === user.id"
            @click="modifPost = false"
          >
            Annuler
          </button>
        </div>

        <!-- Boutons 'modifier' pour envoyer les nouvelles données dans l'api -->
        <div class="inline-block mt-2">
          <button
            class="btn btn_primary btn-sm ms-1"
            v-if="(modifPost = true)"
            @click="updatePost"
          >
            Modifier
          </button>
        </div>
      </div>
    </div>

    <div class="mt-2 d-flex justify-content-end">
      <button
        class="btn btn_primary btn-sm ms-1"
        v-if="post.userId === user.id && !modifPost"
        @click="modifPost = true"
      >
        Modifier
      </button>

      <button
        class="btn btn_primary btn-sm ms-1"
        v-if="post.userId === user.id || user.admin === true"
        @click="deletePostEvent"
      >
        Supprimer
      </button>
    </div>







    <!------------------------- COMMENTAIRES ------------------------->

    <div class="card p-3 mt-3">
      <h2>Commentaires</h2>
      <div
        class="commentDiv d-flex flex-column mt-2"
        v-for="comment in comments"
        v-bind:key="comment.id"
        :comment="comment"
      >
        <div class="d-flex flex-column">
          <div class="d-flex flex-column">
            <h6 class="mb-0">
              {{ comment.user.firstName }} {{ comment.user.lastName }}
            </h6>
            <span class="date">{{ formatDate(comment.createdAt) }}</span>
          </div>
        </div>

        <div class="com d-flex justify-content-between">

          <!-- Commentaire normal -->
          <div v-if="!modifComment">
            <p class="content">{{ comment.comment }}</p>
          </div>

          
            <!-- Bouton modifier et supprimer -->
            <div class="d-flex justify-content-end">

            <button class="btn btn-outline-secondary btn-sm btn-trash" v-if="comment.userId === user.id || user.admin === true" @click.prevent="deleteCom(comment)">
              <span class="trash"><i class="fas fa-trash"></i></span>
            </button>
          </div>
          </div>

          
          
        
      </div>

      <!-- Ecrire un commentaire -->
      <div class="form">
        <input
          class="form-control"
          v-model="comment"
          placeholder="Ecrire un commentaire..."
        />
        <div class="mgs">{{ message }}</div>

        <div class="mt-2 d-flex justify-content-end">
          <button
            class="btn btn-outline-secondary btn-sm"
            @click.prevent="createCom(post)"
          >
            Poster
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "Post",

  data() {
    return {
      user: [],
      comments: [],
      createdAt: "",
      comment: [],
      firstName: "",
      lastName: "",
      title: "",
      message: "",
      messageEdited: "",
      messageCommentEdited: "",
      content: "",
      posts: [],
      modifPost: false,
      titleEdited: "",
      contentEdited: "",
    };
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
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
      .get("http://localhost:3000/api/auth/comments/" + this.post.id, {
        headers: {
          Authorization: "Bearer " + sessionStorage.token,
        },
      })
      .then((response) => {
        console.log(response);
        this.comments = response.data;
      })
      .catch((err) => console.log(err));
  },

  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    },

    deletePostEvent() {
      this.$emit("deletePostEvent", this.post);
    },

    updatePost() {
      if (this.titleEdited == "" || this.contentEdited == "") {
        this.messageEdited = "Vous ne pouvez pas laisser un champ vide";
      } else {
        axios
          .put(
            "http://localhost:3000/api/auth/posts/" + this.post.id,
            { content: this.contentEdited, title: this.titleEdited },
            {
              headers: {
                Authorization: "Bearer " + sessionStorage.token,
              },
            }
          )
          .then((response) => {
            console.log("response");
            console.log(response);
            this.content, (this.title = response.data);
            console.log("Votre post a bien été modifié");
            this.$router.go(0);
          })
          .catch((err) => console.log(err));
      }
    },

    createCom(post) {
      if (this.comment == "") {
        this.message = "Ne pas poster avec un champs vide";
      } else {
        axios
          .post(
            "http://localhost:3000/api/auth/comments/",
            { comment: this.comment, postId: post.id },
            {
              headers: {
                Authorization: "Bearer " + sessionStorage.token,
              },
            }
          )
          .then((response) => {
            console.log(response);
            this.comment = "";
            axios
              .get("http://localhost:3000/api/auth/comments/" + this.post.id, {
                headers: {
                  Authorization: "Bearer " + sessionStorage.token,
                },
              })
              .then((response) => {
                console.log(" que l'on recherche");
                console.log(response);
                this.comments = response.data;
                this.message = "";
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      }
    },

    deleteCom(comment) {
      axios
        .delete("http://localhost:3000/api/auth/comments/" + comment.id, {
          headers: {
            Authorization: "Bearer " + sessionStorage.token,
          },
        })
        .then((response) => {
          console.log(response);
          axios
            .get("http://localhost:3000/api/auth/comments/" + this.post.id, {
              headers: {
                Authorization: "Bearer " + sessionStorage.token,
              },
            })
            .then((response) => {
              console.log(response);
              this.comments = response.data;
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
h1 {
  font-family: "Comic Sans MS", cursive;
  color: #d1515a;
}

h2 {
  font-size: smaller;
}

.date {
  font-size: 0.9rem;
}

.card {
  border: 2px solid #d1515a;
  background-color: antiquewhite;
}

.commentDiv {
  padding: 1rem 0rem;
  border-bottom: 1px solid #d1515a;
  border-width: 50%;
}

.btn {
  font-family: "Julius Sans One", sans-serif;
}

.btn_primary {
  background-color: #091f43;
  color: white;
  font-family: "Julius Sans One", sans-serif;
}

.btn_primary:hover {
  background-color: #d1515a;
  color: white;
}

.form {
  margin-top: 30px;
}

.btn-trash {
  border: 1px solid #d1515a;
  padding: 0.5rem;
  height: fit-content;
}

.btn-trash:hover {
  background-color: #d1515a;
}

.trash {
  color: #d1515a;
}

.btn-trash:hover span {
  color: #5e0404;
}

.titleCon {
  margin-top: 20px;
}

.title {
  font-weight: bolder;
}

.mgs {
  color: #d1515a;
}
</style>