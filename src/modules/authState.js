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
    alert(error);
    isLoadone.value = true;
    currentPage.value = "login";
    isAuth.value = false;
    if (error.response.status == 401);
    // localStorage.removeItem("token");
    return false;
  }
}

function setHeader() {
  // const token = `Bearer ${localStorage.getItem("token")}`;
  // api.headers.common["Authorization"] = token;
}

export {
  isAuth,
  isLoadone,
  authToken,
  showAddPage,
  getToken,
  getUser,
  setToken,
  setHeader,
};
