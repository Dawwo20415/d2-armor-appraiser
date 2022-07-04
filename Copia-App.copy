<script setup lang="ts">

import {ref} from 'vue';

const logged = ref(0);

let bungie_code = ref('');
let bungie_response = ref({});

function openLoginWindow() {
  let uri = "https://www.bungie.net/en/oauth/authorize?client_id=40726&response_type=code&state=6i0mkLx79Hp91nzWVeHrzMN4"

  const login_window = window.open(uri, "Redirect Prova ", "_self");

}

function tokenRequest() {
  var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
  var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "authorization_code");
    urlencoded.append("code", bungie_code.value);
    urlencoded.append("client_id", "40726");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded
  };

  fetch("https://www.bungie.net/platform/app/oauth/token/", requestOptions)
    .then(response => response.text())
    .then(result => bungie_response.value = result)
    .catch(error => console.log('error', error));

}

function displayResults() {
  logged.value = 1;
}
</script>

<template>
  <main>
    <img alt="Vue logo" class="logo" src="./assets/bungie_crossplay_logo.png" width="125" height="125" />

    <h1> Destiny 2 Armor Appraiser</h1>
    <p>Please login with your <a href="https://www.bungie.net/">Bungie.net</a> account</p>

    <p><form>
        Code: <input type="text" name="code" v-model="bungie_code">
    </form></p>

    <button @click="openLoginWindow"> Log In </button>
    <button @click="tokenRequest"> POST </button>
    <button @click="displayResults"> Display </button>

    <p v-if="logged==1">
      Here is the response from the bungie api for the request of: /User/GetMembershipsForCurrentUser/: {{bungie_response}}
    </p>

  </main>
</template>


<style>
@import './assets/base.css';

main {
  margin: auto;
  width: 50%;
  text-align: center;
  padding-top: 20%;
}

a {
  color: yellow;
}

</style>
