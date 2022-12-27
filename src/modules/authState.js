import { api } from "src/boot/axios";
import { ref } from "vue";
import { currentPage } from "./pageController";

const authToken = ref(null);
const showAddPage = ref(false);
const isLoadone = ref(false);
const isAuth = ref(false);
function getToken() {
  authToken.value = localStorage.getItem("token");
  return authToken.value;
}

function setToken(data) {
  localStorage.setItem("token", data);
  return data;
}

async function getUser() {
  isLoadone.value = false;
  getToken();
  try {
    const res = await api.get("user");
    isAuth.value = true;
    isLoadone.value = true;
    return res.data;
  } catch (error) {
    isLoadone.value = true;
    currentPage.value = "login";
    isAuth.value = false;
    return false;
  }
}

export {
  isAuth,
  isLoadone,
  authToken,
  showAddPage,
  getToken,
  getUser,
  setToken,
};
