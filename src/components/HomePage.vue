<template>
  <q-page>
    <h6>Header</h6>
    <!--  -->
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import { isAuth, authToken } from "src/modules/authState";
import { onMounted } from "vue";
onMounted(() => {
  getDocuments();
  //
});

async function getDocuments() {
  const res = await api.get("documents");
}
</script>

<style lang="scss" scoped></style>
