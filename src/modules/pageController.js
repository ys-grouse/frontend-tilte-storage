import { ref } from "vue";

const currentPage = ref("login");
const resendCounter = ref(60);
let interval = null;
function triggerInterval() {
  resendCounter.value = 20;
  interval = setInterval(() => {
    if (resendCounter.value <= 0) {
      clearInterval(interval);
      return;
    }
    resendCounter.value--;
  }, 1000);
}
export { currentPage, resendCounter, triggerInterval };
