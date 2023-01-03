<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="">
      <q-toolbar class="row justify-center">
        <div class="q-pr-md row" style="width: min(500px, 100vw)">
          <q-toolbar-title class=""> TILTE STORAGE </q-toolbar-title>
          <q-btn
            flat
            dense
            round
            icon="mdi-logout"
            v-if="isAuth"
            @click="confirmLogoutDialog = true"
          ></q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> </q-item-label>

      </q-list>
    </q-drawer> -->

    <q-page-container>
      <router-view />
      <q-dialog v-model="confirmLogoutDialog">
        <q-card>
          <q-toolbar class="bg-primary text-white">
            <q-toolbar-title> CONFIRM LOGOUT </q-toolbar-title>
          </q-toolbar>
          <q-card-section> Are you sure you want to log out? </q-card-section>
          <q-card-actions align="right">
            <q-btn v-close-popup flat dense label="cancel"></q-btn>
            <q-btn
              color="primary"
              label="Confirm"
              @click="onLogoutConfirmed"
            ></q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { getToken, authToken, isAuth, getUser } from "src/modules/authState";
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";

const q = useQuasar();
const loading = ref(false);
const leftDrawerOpen = ref(false);
const confirmLogoutDialog = ref(false);
const token = null;

onMounted(() => {
  q.dark.set(true);
  //
});

async function onLogoutConfirmed() {
  loading.value = true;
  const res = await api.post("logout");
  isAuth.value = false;
  loading.value = false;
  confirmLogoutDialog.value = false;
}

//
</script>
