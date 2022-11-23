<template>
  <div class="q-pa-sm" style="width: min(500px, 100vw)">
    <div class="row full-height">
      <q-card v-if="!documentData.length" class="full-width flex flex-center">
        <div class="text-center q-gutter-y-sm" style="padding-bottom: 20vh">
          <div style="font-size: 17px">There's nothing here.</div>
          <div>
            Click the green button below to start uploading your documents
          </div>
        </div>
      </q-card>
      <div class="full-width q-gutter-y-sm">
        <q-card v-for="item in documentData" :key="item" class="">
          <q-item class="q-px-sm" clickable :ripple="true">
            <q-item-section
              @click="
                () => {
                  tempData = item;
                  showDetail = true;
                }
              "
            >
              <q-item-label>
                {{ item.name }}
              </q-item-label>

              <q-item-label caption>
                {{ item.part }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                :title="`copy \`${Object.keys(
                  item.details
                )[0].toUpperCase()}\` to clipboard`"
                flat
                dense
                round
                icon="mdi-clipboard"
                @click="onCopyText(item.details[Object.keys(item.details)[0]])"
              />
            </q-item-section>
          </q-item>
        </q-card>
      </div>
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

import { documentData } from "src/modules/addEditData";
import { isAuth, authToken, showAddPage } from "src/modules/authState";

import { onMounted, ref } from "vue";
import DetailDocument from "./DetailDocument.vue";

const q = useQuasar();
const tempData = ref(null);
const showDetail = ref(false);

onMounted(() => {
  if (isAuth.value) getDocuments();
  //
});

async function getDocuments() {
  const res = await api.get("documents");
  documentData.value = res.data;
}

async function onCopyText(data) {
  await navigator.clipboard.writeText(data);
  q.notify({
    message: `${data} has been copied to clipboard`,
  });
  // clipboard.writeText(item.details[Object.keys(item.details[0])]);
}
</script>

<style lang="scss" scoped></style>
