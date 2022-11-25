<template>
  <div>
    <div id="container"></div>
    <q-form class="" style="padding-bottom: 20vh" @submit="onSubmit">
      <q-card style="width: 500px; max-width: 95vw; position: relative">
        <q-card-section>
          <h6 class="q-my-sm text-center">ENTER OTP</h6>
          <div class="text-center">
            Enter the code sent to
            <span class="text-bold">{{ user.phone }}</span>
          </div>
        </q-card-section>
        <q-card-section class="q-gutter-y-xs">
          <q-input
            dense
            outlined
            type="text"
            label="OTP"
            v-model="data.code"
            :rules="[(val) => !!val || 'Enter username']"
          />

          <q-btn
            :loading="data.loading"
            class="full-width q-mt-md"
            color="primary"
            label="Submit"
            type="submit"
          />
          <div
            @click="otpResend"
            class="cursor-pointer q-pt-md text-center text-teal"
          >
            RESEND OTP <span v-if="resendCounter">{{ resendCounter }}</span>
          </div>

          <div
            @click="currentPage = 'register'"
            class="cursor-pointer q-pt-md text-center text-teal"
          >
            BACK
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </div>
</template>

<script setup>
import { onMounted, ref, toRefs, watch, watchEffect } from "vue";

import { app } from "boot/firebase";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { currentPage, resendCounter } from "src/modules/pageController";

const q = useQuasar();
const auth = getAuth();
//
const props = defineProps(["data", "user"]);
const { user, data } = toRefs(props);

onMounted(() => {
  //
  //
  // if (!user.value.phone) user.value.phone = "+91 97748 88724";
});

async function onSubmit() {
  let otpVerified = false;
  try {
    const result = await data.value.otpHandler.confirm(data.value.code);
    otpVerified = true;
    const res = await api.post("save-user", user.value);
    data.value.register = false;
    data.value.otp = false;
    console.log("logged in: ", result);
  } catch (error) {
    console.log(error.message);
    let msg;
    if (otpVerified) msg = error.message;

    q.notify({
      message: msg,
    });
  }
}

async function otpResend() {
  if (resendCounter.value > 0) return;
  else console.log(resendCounter.value);
  currentPage.value = "register";
  data.value.code = "";
}
</script>

<style lang="scss" scoped>
//
</style>
