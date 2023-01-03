<template>
  <div class="full-width q-gutter-y-sm">
    <q-card v-for="item in documentData" :key="item" class="">
      <q-item class="q-px-sm" clickable :ripple="true">
        <q-item-section @click="emit('show-detail', item)">
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
            @click="onCopyText(item)"
          />
        </q-item-section>
      </q-item>
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { getDocuments } from "src/modules/addEditData";
import { authToken } from "src/modules/authState";
import { onMounted } from "vue";

const q = useQuasar();
const props = defineProps(["document-data"]);
const emit = defineEmits(["show-detail"]);

onMounted(() => {
  api.defaults.headers["Authorization"] = `Bearer ${authToken.value}`;

  getDocuments();
});

async function onCopyText(data) {
  const key = Object.keys(data.details)[0];
  data = data.details[key];

  await navigator.clipboard.writeText(data);
  q.notify({
    message: `${key} has been copied to clipboard`,
  });
}
//
</script>

<style lang="scss" scoped>
//
</style>
