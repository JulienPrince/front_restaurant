import Axios from "axios";
import { onMounted, reactive } from "@vue/composition-api";
import { BASE_URL } from "src/configs";
import { Loading } from "quasar";
import { IResto } from "src/types";

export function useGetRestaurant() {
  const state = reactive<{
    data: IResto[];
    loading: boolean;
  }>({
    data: [],
    loading: false
  });

  onMounted(async () => {
    Loading.show();
    const result = await Axios.get(BASE_URL + "/api/v1/restaurants");
    state.data = result.data;
    Loading.hide();
  });

  return {
    state
  };
}
