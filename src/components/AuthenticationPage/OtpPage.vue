<template>
  <div>
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
  </div>
</template>

<script setup>
import { onMounted, ref, toRefs } from "vue";

const props = defineProps(["data", "user"]);
const { user, data } = toRefs(props);
const counter = ref(60);
let timer = null;
onMounted(() => {
  timer = setInterval(() => {
    if (counter.value == 0) window.clearInterval(timer);
    else counter.value--;
  }, 1000);
});
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
