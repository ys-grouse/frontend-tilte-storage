<template>
  <div>
    <q-form
      v-if="!data.register"
      class=""
      style="padding-bottom: 20vh"
      @submit="onSubmit"
    >
      <q-card style="width: 500px; max-width: 95vw; position: relative">
        <q-card-section>
          <h6 class="q-my-sm text-center">LOGIN</h6>
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
            @click="data.register = true"
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
import { onMounted, ref, toRefs } from "vue";

const props = defineProps(["user", "data"]);
const { user, data } = toRefs(props);
const q = useQuasar();
const loading = ref(false);
// const user = ref({
//   name: "",
//   password: "",
// });

onMounted(() => {
  //
});
async function onSubmit() {
  try {
    data.value.loading = true;
    const res = await api.post("login", user.value);
    if (res.data) localStorage.setItem("token", res.data?.token);
    else localStorage.setItem("token", res.token);
    console.log(res);
    data.value.loading = false;
    window.location.reload();
    authToken.value = res.token;
    isAuth.value = true;
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
