<template>
  <div>
    <q-form class="" style="padding-bottom: 20vh" @submit="onSubmit">
      <q-card style="width: 500px; max-width: 95vw; position: relative">
        <q-card-section>
          <h6 class="q-my-sm text-center">REGISTER</h6>
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
            type="tel"
            v-model="user.phone"
            placeholder="Enter 10 digits mobile number"
            :rules="[
              (val) =>
                (val > 999999999 && val < 100000000000) ||
                'Enter a valid phone number',
            ]"
          >
            <template v-slot:prepend>
              <div class="text-caption">+91</div>
            </template>
          </q-input>

          <q-input
            dense
            outlined
            type="password"
            label="password"
            v-model="user.password"
            :rules="[(val) => !!val || 'Enter password']"
          />
          <q-input
            dense
            outlined
            type="password"
            label="password"
            v-model="user.password_confirmation"
            :rules="[(val) => !!val || 'Enter password']"
          />
          <q-btn
            :loading="data.loading"
            class="full-width"
            color="primary"
            label="Request OTP"
            type="submit"
          />
          <div
            class="cursor-pointer q-pt-md text-center text-teal"
            @click="currentPage = 'login'"
          >
            BACK
          </div>
        </q-card-section>
      </q-card>
    </q-form>
    <div id="container"></div>
  </div>
</template>

<script setup>
import { api } from "src/boot/axios";
import { onMounted, ref, toRefs } from "vue";

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useQuasar } from "quasar";
import { currentPage, triggerInterval } from "src/modules/pageController";
const auth = getAuth();
const loading = ref(false);
let appVerifier = null;

const q = useQuasar();
const props = defineProps(["user", "data"]);
const { user, data } = toRefs(props);

onMounted(() => {
  capthca();
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

async function onSubmit() {
  data.value.loading = true;
  try {
    const res = await api.post("/check-unique", user.value);
    await requestOtp();
    triggerInterval();
    currentPage.value = "enter-otp";
    data.value.loading = false;
  } catch (error) {
    data.value.loading = false;
    let msg = error.message;
    if (error.response) msg = error.response.data;
    q.notify({
      message: msg,
    });
  }
}

async function requestOtp(params) {
  const phone_number = `+91${user.value.phone}`;

  data.value.otpHandler = await signInWithPhoneNumber(
    auth,
    phone_number,
    appVerifier
  );
}
</script>

<style lang="scss" scoped></style>
