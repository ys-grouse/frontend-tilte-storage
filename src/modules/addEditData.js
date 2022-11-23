import { ref } from "vue";

///
const documentData = ref([]);
const label = ref("");
const info = ref("");
const title = ref("ADD");

///

const addDocumentDetail = ref(false);
const document = ref({
  name: "",
  part: "",
  details: {},
});

export { documentData, title, label, info, addDocumentDetail, document };
