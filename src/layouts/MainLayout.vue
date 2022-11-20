<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        /> -->

        <q-toolbar-title> TILTE STORAGE </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> </q-item-label>

      </q-list>
    </q-drawer> -->

    <q-page-container>
      <router-view :authToken="token" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { getToken, authToken } from "src/modules/authState";
import { onMounted, ref } from "vue";

const leftDrawerOpen = ref(false);
const token = null;
// const token = getToken();
onMounted(() => {
  //
});

//
</script>
