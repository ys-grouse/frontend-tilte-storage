<template>
  <div class="" style="min-width: min(500px, 100vw); overflow: hidden">
    <q-card flat class="">
      <q-toolbar class="text-uppercase bg-info text-white">
        <q-btn
          size="sm"
          flat
          dense
          round
          v-close-popup
          icon="mdi-pencil"
          @click="onClickEdit"
        ></q-btn>
        <q-toolbar-title>
          {{ data.name }}
          <span class="" style=""> ({{ data.part }}) </span>
        </q-toolbar-title>
        <q-btn flat dense round v-close-popup icon="mdi-close"></q-btn>
      </q-toolbar>

      <div style="overflow: auto">
        <q-markup-table>
          <tbody>
            <tr
              class="q-pa-none"
              v-for="(item, key) in data.details"
              :key="key"
              @touchstart="onTouchStart(item, key)"
              @touchend="onTouchEnd"
              @click="copyToClipboard(item, key)"
            >
              <td
                style="
                  width: 0.1%;
                  max-width: 35vw;
                  text-overflow: ellipsis;
                  overflow: hidden;
                "
                class="q-ma-none q-pa-none"
                @click="onDoubleClick(item, key, 'label')"
              >
                {{ key }}
              </td>
              <td @click="onDoubleClick(item, key, 'data')">
                {{ data.details[key] }}
              </td>
            </tr>
          </tbody>
        </q-markup-table>
        <q-separator></q-separator>
        <q-card-section class="q-pa-xs">
          <q-btn
            flat
            dense
            class="full-width"
            label="View Document"
            @click="onViewDocument(data.id)"
          ></q-btn>
        </q-card-section>
      </div>
    </q-card>
    <q-dialog maximized v-model="displayFile">
      <q-card
        class="row q-pa-md justify-center"
        style="
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          position: relative;
        "
      >
        <div style="height: 100%; width: 100%; overflow: auto">
          <q-img v-if="!isPDF" fit="none" :src="fileData" alt="" srcset="" />
          <vue-pdf-embed v-if="isPDF" :source="fileData" />

          <div class="absolute-top-right q-pa-sm" style="z-index: 999">
            <q-btn v-close-popup dense round color="primary" icon="mdi-close">
            </q-btn>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { showAddPage } from "src/modules/authState";
import { ref } from "vue";

import { document, title } from "src/modules/addEditData";
import { api } from "src/boot/axios";
import VuePdfEmbed from "vue-pdf-embed";
const q = useQuasar();
const props = defineProps(["data"]);
//
let tempData = null;
const isPDF = ref(false);
let firstClick = false;
let secondClick = false;
const fileData = ref(null);
const displayFile = ref(false);
const menuModel = ref(false);

async function onViewDocument(id) {
  const res = await api.get(`document/${id}`);

  fileData.value = res.data;

  isPDF.value = res.data.includes("data:application/pdf");

  if (isPDF.value) {
    // let pdfWindow = window.open("");
    // pdfWindow.document.write(
    //   `<iframe width='100%' height='100%' src='${fileData.value}' style="border:0" ></iframe>`
    // );
  } else {
    // var image = new Image();
    // image.src = fileData.value;
    // var w = window.open("");
    // w.document.write(image.outerHTML);
  }

  displayFile.value = true;
  // window.open(res.data);
}

function onClickEdit() {
  title.value = "EDIT";
  document.value = { ...props.data };
  showAddPage.value = true;
}
function onDoubleClick(value, label, item) {
  if (firstClick) {
    secondClick = true;
    firstClick = false;

    setTimeout(() => {
      secondClick = false;
    }, 400);
  } else firstClick = true;

  setTimeout(() => {
    firstClick = false;
  }, 400);
}
function onLoadIframe() {
  // console.log(o.style);
  const iframe = window.document.getElementById("i-frame");

  console.log(iframe.contentWindow.innerHeight);
  // return;
  // o.style.height = o.contentWindow.document.body.scrollHeight + "px";
  //
}
function onTouchStart(item, key) {
  // tempData = item;
}

function onTouchEnd(item, key) {
  //
}

async function copyToClipboard(data, key) {
  setTimeout(async () => {
    if (firstClick && !secondClick) {
      await navigator.clipboard.writeText(data);
      q.notify({
        message: `${key} has been copied to clipboard`,
      });
    }
  }, 300);
  return;
  setTimeout(async () => {
    if (clickCounter <= 1) {
      console.log(clickCounter);
      await navigator.clipboard.writeText(data);
      q.notify({
        message: `${key} has been copied to clipboard`,
      });
    }
  }, 400);
}
</script>

<style lang="scss" scoped>
//
th {
  text-align: left;
}

iframe {
  //
}
</style>
