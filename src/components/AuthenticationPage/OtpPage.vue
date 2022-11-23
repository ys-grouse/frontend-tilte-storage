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
                if (counter) otpResend();
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
    <q-btn color="primary" icon="check" label="OK" @click="phoneAuth" />
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

const auth = getAuth();
//
const props = defineProps(["data", "user"]);
const { user, data } = toRefs(props);
const counter = ref(60);
let timer = null;
let appVerifier = null;
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

async function phoneAuth(params) {
  signInWithPhoneNumber(auth, user.value.phone, appVerifier)
    .then((confirmationResult) => {
      // return;
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      // window.confirmationResult = confirmationResult;
      // console.log("sent", window.confirmationResult);
      // ...
    })
    .catch((error) => {
      console.log("errir is: ", error);
      // Error; SMS not sent
      // ...
    });
}
async function onSubmit() {
  console.log("asdfasdf");
}

async function otpResend() {
  alert("resent");
  console.log("otp rese t");
}
</script>

<style lang="scss" scoped>
//
</style>
