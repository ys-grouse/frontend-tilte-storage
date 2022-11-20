<template>
  <q-page class="flex flex-center">
    <HomePage />
    <LoginPage v-if="!isAuth" />
  </q-page>
</template>

<script setup>
import LoginPage from "src/components/LoginPage.vue";
import HomePage from "src/components/HomePage.vue";

import { isAuth } from "src/modules/authState";
</script>
