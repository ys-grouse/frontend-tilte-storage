<template>
  <div class="q-pa-sm" style="width: min(500px, 100vw)">
    <div class="full-height">
      <q-card
        v-if="!documentData.length"
        class="flex flex-center"
        style="height: 100%"
      >
        <div class="text-center q-gutter-y-sm" style="padding-bottom: 20vh">
          <div style="font-size: 17px">There's nothing here.</div>
          <div>
            {{ isLoadone }} {{ isAuth }}
            Click the green button below to start uploading your documents
          </div>
        </div>
      </q-card>
      <DocumentsList
        v-if="isLoadone && isAuth"
        :documentData="documentData"
        @show-detail="
          (item) => {
            tempData = item;
            showDetail = true;
          }
        "
      />

      <q-page-sticky
        style="font-size: 1.5rem"
        position="bottom"
        :offset="[0, 0]"
        expand
      >
        <div
          class="row justify-center"
          style="width: min(500px, 100vw); position: relative"
        >
          &nbsp;
          <q-btn
            round
            color="positive"
            icon="mdi-text-box-plus"
            class="absolute-bottom-right"
            style="right: 20px; bottom: 20px"
            @click="showAddPage = true"
          >
          </q-btn>
        </div>
      </q-page-sticky>
    </div>
    <q-dialog no-backdrop-dismiss v-model="showDetail">
      <DetailDocument :data="tempData" />
    </q-dialog>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { isLoadone } from "src/modules/authState";

import { documentData, getDocuments } from "src/modules/addEditData";
import { isAuth, authToken, showAddPage } from "src/modules/authState";

import { onMounted, ref } from "vue";
import DetailDocument from "./DetailDocument.vue";
import DocumentsList from "./DocumentsList.vue";

const q = useQuasar();
const tempData = ref(null);
const showDetail = ref(false);

onMounted(() => {
  if (authToken.value) {
    // getDocuments();
  } else {
    //
  }
});
</script>

<style lang="scss" scoped></style>
