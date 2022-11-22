<template>
  <div class="q-pa-sm" style="width: min(500px, 100vw)">
    <h6 class="q-mt-none q-mb-md text-center text-uppercase">
      {{ title }} DOCUMENT
    </h6>
    <q-form @submit="onSubmit">
      <div class="q-gutter-y-sm">
        <q-card class="full-width">
          <q-card-section class="q-pb-none">
            <q-file
              dense
              outlined
              v-model="document.document_file"
              label="Select Document"
              hint=""
            />
            <q-input
              dense
              outlined
              v-model="document.name"
              type="text"
              label="Document name"
              :rules="[(val) => !!val || 'Enter document name']"
            />
            <q-input
              dense
              outlined
              v-model="document.part"
              type="text"
              label="Part"
              placeholder="Document part. Eg: Front, Back, Default"
              :rules="[(val) => !!val || 'Enter document name']"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-markup-table style="min-width: 340px">
              <tbody>
                <tr
                  v-for="(item, index) in Object.keys(document.details)"
                  :key="index"
                >
                  <td
                    colspan="1"
                    class="text-bold label-field"
                    style="max-width: fit-content"
                    @click="
                      label = item;
                      info = document.details[item];
                      addDocumentDetail = true;
                    "
                  >
                    {{ item }}
                  </td>
                  <td
                    colspan="2"
                    class=""
                    @click="
                      label = item;
                      info = document.details[item];
                      addDocumentDetail = true;
                    "
                  >
                    {{ document.details[item] }}
                  </td>
                  <td class="label-field">
                    <q-btn
                      flat
                      dense
                      size="sm"
                      icon="mdi-close"
                      @click="
                        () => {
                          delete document.details[item];
                        }
                      "
                    ></q-btn>
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card-section>
          <q-separator></q-separator>
          <q-btn
            dense
            label="Add Document Detail"
            class="q-my-xs full-width"
            @click="addDocumentDetail = true"
          >
          </q-btn>
        </q-card>
        <q-card>
          <q-card-actions>
            <q-btn
              class="full-width"
              color="primary"
              icon="check"
              label="submit"
              type="submit"
            />
          </q-card-actions>
          <q-card-actions>
            <q-btn
              outline
              class="full-width"
              color="primary"
              label="back"
              @click="showAddPage = false"
            />
          </q-card-actions>
        </q-card>
      </div>
    </q-form>

    <q-dialog
      maximized
      no-backdrop-dismiss
      position="bottom"
      v-model="addDocumentDetail"
    >
      <div class="" style="width: min(500px, 100vw)">
        <q-card class="">
          <q-toolbar class="bg-info text-white">
            <q-toolbar-title> Document Detail </q-toolbar-title>
          </q-toolbar>
          <q-form
            @submit="
              () => {
                document.details[label] = info;
                addDocumentDetail = false;
                resetData();
              }
            "
          >
            <q-card-section>
              <q-input
                dense
                outlined
                v-model="label"
                label="Label"
                placeholder="Eg: Owner Name, Document No., Address, etc"
                :rules="[(val) => !!val || 'Enter label']"
              />
              <q-input
                dense
                outlined
                v-model="info"
                label="Information"
                :rules="[(val) => !!val || 'Enter Information']"
              />
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                v-close-popup
                flat
                dense
                label="cancel"
                @click="resetData"
              />
              <q-btn color="info" label="confirm" type="submit" />
            </q-card-actions>
          </q-form>
        </q-card>
      </div>
    </q-dialog>
  </div>
</template>

<script setup>
import { Loading, useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { onUnmounted, ref } from "vue";

import {
  title,
  label,
  info,
  addDocumentDetail,
  document,
} from "src/modules/addEditData";
import { showAddPage } from "src/modules/authState";

const q = useQuasar();

onUnmounted(() => {
  title.value = "ADD";
});

async function onSubmit() {
  try {
    Loading.value = true;
    const fd = new FormData();
    fd.append("name", document.value.name);
    fd.append("part", document.value.part);
    fd.append("document_file", document.value.document_file);
    fd.append("details", JSON.stringify(document.value.details));
    if (title.value == "EDIT") fd.append("_method", "patch");
    const res = await api.post("document", fd);
    Loading.value = false;
    showAddPage.value = false;
  } catch (error) {
    Loading.value = false;
    q.notify({
      message: error.message,
    });
    console.log(error.message);
  }
}

function resetData() {
  label.value = "";
  info.value = "";
}
</script>

<style lang="scss" scoped>
.label-field {
  width: 0.01%;
}
</style>
