import { onMounted, reactive } from "@vue/composition-api";
import Axios from "axios";
import { BASE_URL } from "src/configs";
import { IResto } from "src/types";

export function useGetOneResto(id: string) {
  const state = reactive<{
    data: IResto | null;
    loading: boolean;
  }>({
    data: null,
    loading: false
  });

  onMounted(async function() {
    state.loading = true;
    const result = await Axios.get(`${BASE_URL}/api/v1/restaurants/${id}`);
    state.data = {
      ...result.data.restorant,
      image: result.data.image
    };
    state.loading = false;
  });

  return {
    state
  };
}
