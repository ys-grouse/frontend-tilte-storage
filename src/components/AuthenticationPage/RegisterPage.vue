<template>
  <div>
    <q-banner
      class="text-white bg-red absolute-top q-pr-xs"
      style="font-size: 19px; z-index: 99"
      v-show="data.errorMessage"
    >
      {{ data.errorMessage }}
      <template v-slot:action>
        <q-btn
          unelevated
          outlined
          dense
          class="bg-red-2"
          text-color="primary"
          label="close"
          @click="data.errorMessage = null"
        />
      </template>
    </q-banner>

    <q-form
      v-if="data.register && !data.otp"
      class=""
      style="padding-bottom: 20vh"
      @submit="onSubmit"
    >
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
            label="Submit"
            type="submit"
          />
          <div
            class="cursor-pointer q-pt-md text-center text-teal"
            @click="data.register = false"
          >
            BACK
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </div>
</template>

<script setup>
import { api } from "src/boot/axios";
import { toRefs } from "vue";

const props = defineProps(["user", "data"]);
const { user, data } = toRefs(props);

async function onSubmit() {
  try {
    const res = await api.post("/check-unique", user.value);
    data.value.otp = true;
  } catch (error) {
    console.log(error.message);
  }
}
</script>

<style lang="scss" scoped></style>
