<template>
  <q-page v-show="isLoadone" class="row justify-center">
    <div v-if="!isLoadone">
      {{ "STILL LOADING" }}
    </div>
    <!-- <div v-if="isLoadone" class="full-height"></div> -->
    <HomePage v-show="!showAddPage && isAuth" />
    <AddPage v-if="showAddPage && isAuth" />
    <AuthenticationPage v-if="!isAuth" />
  </q-page>
  <q-page v-if="!isLoadone" class="">
    <q-inner-loading :showing="true">
      <q-spinner-cube size="min(30vw, 30vh)" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script setup>
import AuthenticationPage from "src/components/AuthenticationPage/AuthenticationPage.vue";
import HomePage from "src/components/HomePage.vue";
import AddPage from "src/components/AddPage.vue";
import { currentPage } from "src/modules/pageController";
import { isAuth, isLoadone, showAddPage } from "src/modules/authState";
</script>
