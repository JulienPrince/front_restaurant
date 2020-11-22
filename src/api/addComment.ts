import Axios from "axios";
import { ref } from "@vue/composition-api";
import { BASE_URL } from "src/configs";
import { session } from "src/compositions/session";
import { commentState } from "src/compositions/comments";

export function useAddComments(id: string) {
  const commentInput = ref("");
  const loading = ref(false);

  const addComments = function() {
    loading.value = true;
    Axios.post(
      `${BASE_URL}/api/v1/restaurants/${id}/comments`,
      {
        comment: commentInput.value,
        user_id: session.id
      },
      {
        headers: {
          Authorization: `Bearer ${session.csrf}`
        }
      }
    ).then(result => {
      console.log(result);
      commentState.comments.unshift(result.data);
      commentInput.value = "";
      loading.value = false;
    });
  };

  return {
    commentInput,
    loadingAddComment: loading,
    addComments
  };
}
