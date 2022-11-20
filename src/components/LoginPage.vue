<template>
  <q-page padding class="flex flex-center">
    <q-banner
      class="text-white bg-red absolute-top q-pr-xs"
      style="font-size: 19px; z-index: 99"
      v-if="errorMessage"
    >
      {{ errorMessage }}
      <template v-slot:action>
        <q-btn
          unelevated
          outlined
          dense
          class="bg-red-2"
          text-color="primary"
          label="close"
          @click="errorMessage = null"
        />
      </template>
    </q-banner>
    <q-form class="" style="padding-bottom: 20vh" @submit="onSubmit">
      <q-card style="width: 500px; max-width: 95vw; position: relative">
        <q-card-section>
          <h6 class="q-my-sm text-center">LOGIN</h6>
        </q-card-section>
        <q-card-section class="q-gutter-y-xs">
          <q-input
            dense
            outlined
            type="text"
            label="username"
            v-model="user.name"
            :rules="[(val) => !!val || 'Enter username']"
          />

          <q-input
            dense
            outlined
            type="text"
            label="password"
            v-model="user.password"
            :rules="[(val) => !!val || 'Enter password']"
          />
          <q-btn
            class="full-width"
            color="primary"
            label="Login"
            type="submit"
          />
          <div class="cursor-pointer q-pt-md text-center text-teal">
            CREATE ACCOUNT
          </div>
        </q-card-section>
      </q-card>
    </q-form>
    <!--  -->
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import { ref } from "vue";

const errorMessage = ref(null);
const user = ref({
  name: "",
  password: "",
});
async function onSubmit() {
  try {
    const res = await api.post("login", user.value);
    if (res.data) localStorage.setItem("token", res.data?.token);
    else localStorage.setItem("token", res.token);
  } catch (error) {
    if (error.response) {
      if (typeof error.response.data.message == "string")
        errorMessage.value = error.response.data.message;
      else errorMessage.value = error.response.data.message[0];
    } else errorMessage.value = error.message;
    setTimeout(() => {
      errorMessage.value = null;
    }, 3500);
  }
}
//
</script>

<style lang="scss" scoped></style>
