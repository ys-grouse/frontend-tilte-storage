<template>
  <q-page padding class="flex flex-center">
    <LoginPage :user="user" :data="data" />
    <RegisterPage :user="user" :data="data" />
    <OtpPage :user="user" :data="data" />
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import { authToken, isAuth } from "src/modules/authState";
import { ref } from "vue";
import LoginPage from "./LoginPage.vue";
import OtpPage from "./OtpPage.vue";

import RegisterPage from "./RegisterPage.vue";
// const errorMessage = ref(null);
const register = ref(false);
const data = ref({
  register: false,
  loading: false,
  errorMessage: false,
  otp: false,
});

const user = ref({
  name: "",
  phone: "",
  password: "",
});
// async function onSubmit() {
//   try {
//     loading.value = true;
//     const res = await api.post("login", user.value);
//     if (res.data) localStorage.setItem("token", res.data?.token);
//     else localStorage.setItem("token", res.token);
//     loading.value = false;
//     window.location.reload();
//     // authToken.value = res.token;
//     // isAuth.value = true;
//   } catch (error) {
//     loading.value = false;
//     if (error.response) {
//       if (typeof error.response.data.message == "string")
//         errorMessage.value = error.response.data.message;
//       else errorMessage.value = error.response.data.message[0];
//     } else errorMessage.value = error.message;
//     setTimeout(() => {
//       errorMessage.value = null;
//     }, 3500);
//   }
// }
//
</script>

<style lang="scss" scoped></style>
