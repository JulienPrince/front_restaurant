import { ref } from "@vue/composition-api";

const accountType = ref(true);

export function useAccountType() {
  return accountType;
}
