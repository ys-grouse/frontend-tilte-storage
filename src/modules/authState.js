import { api } from "src/boot/axios";
import { ref } from "vue";

const authToken = ref(null);
const showAddPage = ref(false);
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
  getToken();
  try {
    console.log("asdfasdf");
    const res = await api.get("user");
    console.log(res.data);
    isAuth.value = true;
    return res.data;
  } catch (error) {
    isAuth.value = false;
    return false;
  }
}

export { isAuth, authToken, showAddPage, getToken, getUser, setToken };
