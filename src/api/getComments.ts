import Axios from "axios";
import { onMounted } from "@vue/composition-api";
import { BASE_URL } from "src/configs";
import { commentState } from "src/compositions/comments";

export function useGetComments(id: string) {
  onMounted(async () => {
    commentState.loading = true;
    const result = await Axios.get(
      `${BASE_URL}/api/v1/restaurants/${id}/comments`
    );
    commentState.comments = result.data;
    commentState.loading = false;
  });

  return {
    state: commentState
  };
}
