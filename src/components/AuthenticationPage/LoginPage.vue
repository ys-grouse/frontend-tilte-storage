<template>
  <div>
    <q-form class="" style="padding-bottom: 20vh" @submit="onSubmit">
      <q-card style="width: 500px; max-width: 95vw; position: relative">
        <q-card-section class="flex flex-center">
          <div class="row justify-center full-width"></div>
          <h4 class="text-orange q-my-sm flex flex-center">LOGIN</h4>
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
            type="password"
            label="password"
            v-model="user.password"
            :rules="[(val) => !!val || 'Enter password']"
          />
          <q-btn
            :loading="data.loading"
            class="full-width"
            color="primary"
            label="Login"
            type="submit"
          />
          <div
            @click="currentPage = 'register'"
            class="cursor-pointer q-pt-md text-center text-teal"
          >
            CREATE ACCOUNT
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { authToken, isAuth } from "src/modules/authState";
import { currentPage } from "src/modules/pageController";
import { onMounted, ref, toRefs } from "vue";

const props = defineProps(["user", "data"]);
const { user, data } = toRefs(props);
const q = useQuasar();
const loading = ref(false);

onMounted(() => {
  //
});
async function onSubmit() {
  try {
    data.value.loading = true;
    const res = await api.post("login", user.value);
    if (res.data) localStorage.setItem("token", res.data?.token);
    data.value.loading = false;
    authToken.value = res.data.token;
    isAuth.value = true;
    console.log(authToken.value);
    api.defaults.headers["Authorization"] = `Bearer ${authToken.value}`;
    data.value.loading = false;
  } catch (error) {
    data.value.loading = false;
    if (error.response) {
      // if (typeof error.response.data.message == "string")
      data.value.errorMessage = error.response.data;
      // else data.value.errorMessage = error.response.data.message[0];
    } else data.value.errorMessage = error.message;
    setTimeout(() => {
      data.value.errorMessage = null;
    }, 3500);
  }
}
//
</script>

<style lang="scss" scoped></style>
