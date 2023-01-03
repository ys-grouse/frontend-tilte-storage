import { api } from "src/boot/axios";
import { ref } from "vue";
import { setHeader } from "./authState";

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

async function getDocuments() {
  try {
    const res = await api.get("documents");
    documentData.value = res.data;
  } catch (error) {
    console.log(error);
    if (error.response?.status == 401);
    localStorage.removeItem("token");
  }
}

export {
  documentData,
  title,
  label,
  info,
  addDocumentDetail,
  document,
  getDocuments,
};
