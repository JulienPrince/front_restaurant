import { reactive } from "@vue/composition-api";
import { IComment } from "src/types";

export const commentState = reactive<{
  comments: IComment[];
  loading: boolean;
}>({
  comments: [],
  loading: false
});
