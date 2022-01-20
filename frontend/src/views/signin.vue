<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8 d-flex justify-content-center">
        <img
          src="../assets/icon-title.png"
          class="w-40 img-fluide"
          alt="titre"
        />
      </div>
    </div>

    <fieldset class="p-4">
      <div class="d-flex flex-column justify-content-center">
        <div class="connect">
          <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
          <h1 class="card__title" v-else>Inscription</h1>
          <br />
        </div>
        <br />

        <p class="card__subtitle" v-if="mode == 'login'">
          Tu n'as pas encore de compte ?
          <span class="card__action ps-2" @click="switchToCreateAccount()">
            Créer un compte</span
          >
        </p>
        <p class="card__subtitle" v-else>
          Tu as déjà un compte ?
          <span class="card__action ps-2" @click="switchToLogin()">
            Se connecter</span
          >
        </p>
        <div class="mgs">{{ message }}</div>
        <div class="mgs">{{ emessage }}</div>
      </div>

      <div class="row-8 d-flex align-items-center flex-column">
        <div class="form-floating justify-content-center">
          <input
            v-model="firstName"
            type="text"
            class="form-control"
            v-if="mode == 'create'"
            id="floatingName"
            placeholder="Prénom"
          />
          <label for="floatingName">Prénom</label>
        </div>

        <div class="form-floating justify-content-center">
          <input
            v-model="lastName"
            type="text"
            class="form-control"
            v-if="mode == 'create'"
            id="floatingLastname"
            placeholder="Nom"
          />
          <label for="floatingPassword">Nom</label>
        </div>

        <div class="form-floating mb-3 justify-content-center">
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Adresse Mail</label>
        </div>
        <div class="form-floating justify-content-center">
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label for="floatingPassword">Mot de passe</label>
        </div>

        <button
          type="submit"
          class="btn btn_primary w-auto justify-content-center"
          @click.prevent="userLogin()"
          v-if="mode == 'login'"
        >
          Se connecter
        </button>
        <button
          type="submit"
          class="btn btn_primary w-auto justify-content-center"
          @click.prevent="userRegister()"
          v-else
        >
          Inscription
        </button>
      </div>
    </fieldset>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "signin",
  data: function () {
    return {
      mode: "login",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      message: "",
      emessage: "",
    };
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
    userLogin() {
      if (this.email == "" || this.password == "") {
        alert(
          "Veuillez entrer votre email et votre mot de passe pour vous connecter"
        );
      } else {
        axios
          .post("http://localhost:3000/api/users/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            let responseUser = response.data.userId;
            let responseAdmin = response.data.admin;
            sessionStorage.setItem("admin", JSON.stringify(responseAdmin));
            let responseToken = response.data.token;
            sessionStorage.setItem("user", JSON.stringify(responseUser)); //push de l'id dans la sessionStorage
            sessionStorage.setItem("token", responseToken);
            console.log(this.$router);
            this.$router.push("perso");
          })
          .catch(() => {
            {
              this.message = "utilisateur non trouvé";
            }
          });
      }
    },
    userRegister() {
      if (
        this.firstName == "" ||
        this.password == "" ||
        this.email == "" ||
        this.lastName == ""
      ) {
        alert("Veuillez remplir tous les champs");
      } else {
        axios
          .post("http://localhost:3000/api/users/signup", {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            let responseAdmin = response.data.admin;
            sessionStorage.setItem("admin", JSON.stringify(responseAdmin));
            let responseUser = response.data.userId;
            let responseToken = response.data.token;
            sessionStorage.setItem("user", JSON.stringify(responseUser)); //push de l'id dans la sessionStorage
            sessionStorage.setItem("token", responseToken);
            this.$router.push("perso");
          })
          .catch(() => {
            {
              this.emessage = `"Votre mot de passe doit contenir min 8 caractères"
                              "1 maj et 2 chiffres"`;
            }
          });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#app {
  background-color: none !important  ;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}

h1 {
  font-size: larger;
  margin-top: 10px;
  color: #d1515a;
}

.form-floating {
  width: 300px;
}

.btn {
  margin-top: 10px;
  font-family: 'Julius Sans One', sans-serif;
}

.btn_primary {
  background-color: #D1515A;
  color: white;
}

.btn_primary:hover {
  background-color: #091F43;
  color: white;
}

img {
  width: 300px;
  box-shadow: 0px 0px 15px 15px white;
}

.connect {
  display: flex;
  justify-content: center;
}

.card__subtitle {
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
}

fieldset {
  margin-bottom: 100px;
  display: FLEX;
  flex-direction: COLUMN;
  border-radius: 50px;
  background-color: blanchedalmond;
  box-shadow: 2px 3px 3px #d1515a;
}

.form-control {
  margin-top: 10px;
}

.mgs {
  display: flex;
  justify-content: center;
  color: red;
}
</style> 
