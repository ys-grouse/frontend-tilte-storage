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
import { api } from "src/boot/axios";

const q = useQuasar();
const auth = getAuth();
//
const props = defineProps(["data", "user"]);
const { user, data } = toRefs(props);
const counter = ref(60);
let timer = null;
let appVerifier = null;

onMounted(() => {
  timer = setInterval(() => {
    if (counter.value == 0) window.clearInterval(timer);
    else counter.value--;
  }, 1000);

  // if (!user.value.phone) user.value.phone = "+91 97748 88724";
});

async function onSubmit() {
  let otpVerified = false;
  try {
    console.log("code is: ", data.value.code);
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
  alert("resent");
  console.log("INVALID OTP");
}
</script>

<style lang="scss" scoped>
//
</style>
