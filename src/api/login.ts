import { reactive } from "@vue/composition-api";
import Axios from "axios";
import { Notify, Loading } from "quasar";
import { BASE_URL } from "src/configs";
import { setSession } from "../compositions/session";

const initial = {
  email: "",
  password: ""
};

export function useLogin(router: any) {
  const state = reactive({
    form: initial
  });

  const submit = async function() {
    Loading.show();
    Axios.post(BASE_URL + "/signin", state.form)
      .then(result => {
        localStorage.setItem("token", JSON.stringify(result.data));
        setSession(result.data);
        router.replace("/home");
      })
      .catch(function(error) {
        Notify.create("Information de connexion non valide");
      })
      .then(function() {
        Loading.hide();
        state.form = initial;
      });
  };

  return {
    state,
    submit
  };
}
