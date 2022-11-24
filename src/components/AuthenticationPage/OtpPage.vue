<template>
  <div>
    <div id="container"></div>
    <q-form
      v-if="data.register && data.otp"
      class=""
      style="padding-bottom: 20vh"
      @submit="onSubmit"
    >
      <q-card style="width: 500px; max-width: 95vw; position: relative">
        <q-card-section>
          <h6 class="q-my-sm text-center">ENTER OTP</h6>
        </q-card-section>
        <q-card-section class="q-gutter-y-xs">
          <q-input
            dense
            outlined
            type="text"
            label="OTP"
            v-model="user.name"
            :rules="[(val) => !!val || 'Enter username']"
          />

          <q-btn
            :loading="data.loading"
            class="full-width q-mt-md"
            color="primary"
            label="Login"
            type="submit"
          />
          <div
            @click="
              () => {
                if (!counter) otpResend();
              }
            "
            class="cursor-pointer q-pt-md text-center text-teal"
          >
            RESEND OTP <span v-if="counter">{{ counter }}</span>
          </div>

          <div
            @click="data.otp = false"
            class="cursor-pointer q-pt-md text-center text-teal"
          >
            BACK
          </div>
        </q-card-section>
      </q-card>
    </q-form>
    <q-btn color="primary" icon="check" label="OK" @click="requestOtp" />
  </div>
</template>

<script setup>
import { onMounted, ref, toRefs } from "vue";

import { app } from "boot/firebase";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useQuasar } from "quasar";

const q = useQuasar();
const auth = getAuth();
//
const props = defineProps(["data", "user"]);
const { user, data } = toRefs(props);
const counter = ref(60);
let timer = null;
let appVerifier = null;
let otpHandler = null;
onMounted(() => {
  capthca();
  timer = setInterval(() => {
    if (counter.value == 0) window.clearInterval(timer);
    else counter.value--;
  }, 1000);
  // if (!user.value.phone) user.value.phone = "+919774888724";
  if (!user.value.phone) user.value.phone = "+91 97748 88724";
});

function capthca() {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "container",
    {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // onSignInSubmit();
        // console.log("asdfasdf");
        // console.log(response);
      },
    },
    auth
  );

  appVerifier = window.recaptchaVerifier;
}

async function requestOtp(params) {
  try {
    user.value.phone = "+917085052350";
    // user.value.phone = "+919774888724";
    otpHandler = await signInWithPhoneNumber(
      auth,
      user.value.phone,
      appVerifier
    );
  } catch (error) {
    console.log(error.message);
  }
}
async function onSubmit() {
  try {
    const result = await otpHandler.confirm(data.value.otp);
  } catch (error) {
    console.log(error.message);
    q.notify({
      message: "invalid OTP",
    });
  }
}

async function otpResend() {
  alert("resent");
  console.log("INVALID OTP");
}
</script>

<style lang="scss" scoped>
//
</style>
