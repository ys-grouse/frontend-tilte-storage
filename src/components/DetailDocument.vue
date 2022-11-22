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
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { showAddPage } from "src/modules/authState";
import { ref } from "vue";

import { document, title } from "src/modules/addEditData";

const q = useQuasar();
const props = defineProps(["data"]);
//

let tempData = null;
let firstClick = false;
let secondClick = false;
const menuModel = ref(false);

function onClickEdit() {
  title.value = "EDIT";
  document.value = { ...props.data };
  showAddPage.value = true;
}
function onDoubleClick(value, label, item) {
  if (firstClick) {
    console.log(props.data);

    secondClick = true;
    firstClick = false;
    // document.value = { ...props.data };
    // showAddPage.value = true;
    setTimeout(() => {
      secondClick = false;
    }, 400);
  } else firstClick = true;

  setTimeout(() => {
    firstClick = false;
  }, 400);
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
</style>
