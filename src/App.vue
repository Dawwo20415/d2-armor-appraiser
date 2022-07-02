<script setup lang="ts">

import {ref} from 'vue';

const logged = ref(0);

let bungie_code = ref('');
let bungie_response = ref({});

function openLoginWindow() {
  let uri = "https://www.bungie.net/en/oauth/authorize?client_id=40726&response_type=code&state=6i0mkLx79Hp91nzWVeHrzMN4"

  const login_window = window.open(uri, "_self");

}

function tokenRequest() {
  const params = {
    grant_type: "authorization_code",
    code: "3251b607e51b82114dce5251406b42a1",
    client_id: '40726'
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded' 
    },
    body: JSON.stringify( params )  
  };

  fetch('https://www.bungie.net/platform/app/oauth/token/', options)
    .then( response => response.json())
    .then( response => {
      bungie_response.value = response;
      console.log(response);
    }) 
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

    <button @click="openLoginWindow"> Log In </button>
    <button @click="tokenRequest"> POST </button>
    <button @click="displayResults"> Display </button>

    <p v-if="logged==1">
      Here is the response from the bungie api for the request of: /User/GetMembershipsForCurrentUser/: {{bungie_response}} And
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
