import { ref } from "vue";

///
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

export { title, label, info, addDocumentDetail, document };
