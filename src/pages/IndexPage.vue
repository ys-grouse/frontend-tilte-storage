<template>
  <q-page class="row justify-center">
    <HomePage v-show="!showAddPage && isAuth" />
    <AddPage v-if="showAddPage && isAuth" />
    <LoginPage v-if="!isAuth" />
  </q-page>
</template>

<script setup>
import LoginPage from "src/components/LoginPage.vue";
import HomePage from "src/components/HomePage.vue";
import AddPage from "src/components/AddPage.vue";

import { isAuth, showAddPage } from "src/modules/authState";
</script>
