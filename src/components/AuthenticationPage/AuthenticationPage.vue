<template>
  <q-page padding class="flex flex-center">
    <div class="" style="width: 100vw; position: absolute; top: 0">
      <q-banner
        class="text-white text-center bg-red absolute-top q-pr-xs"
        style="z-index: 99"
        v-show="data.errorMessage"
      >
        <span class="row justify-center">
          <div class="" style="font-size: 19px; width: min(500px, 100vw)">
            <div class="">
              {{ data.errorMessage }}
            </div>
            <div class="q-mt-sm q-pr-md text-right">
              <q-btn
                unelevated
                outline
                size="sm"
                label="close"
                @click="data.errorMessage = null"
              ></q-btn>
            </div>
          </div>
        </span>
      </q-banner>
    </div>
    <LoginPage v-if="currentPage == 'login'" :user="user" :data="data" />
    <RegisterPage v-if="currentPage == 'register'" :user="user" :data="data" />
    <OtpPage v-if="currentPage == 'enter-otp'" :user="user" :data="data" />
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import { authToken, isAuth } from "src/modules/authState";
import { currentPage } from "src/modules/pageController";
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
