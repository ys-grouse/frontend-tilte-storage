<template>
  <q-page class="row justify-center">
    <HomePage v-show="!showAddPage && isAuth" />
    <AddPage v-if="showAddPage && isAuth" />
    <AuthenticationPage v-if="!isAuth" />
  </q-page>
</template>

<script setup>
import AuthenticationPage from "src/components/AuthenticationPage/AuthenticationPage.vue";
import HomePage from "src/components/HomePage.vue";
import AddPage from "src/components/AddPage.vue";

import { isAuth, showAddPage } from "src/modules/authState";
</script>
