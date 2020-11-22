import { computed, reactive, toRef, toRefs } from "@vue/composition-api";
import { Loading, Notify } from "quasar";
import Axios from "axios";
import { ISellerForm } from "src/types";
import { BASE_URL } from "src/configs";
import { session, setSession } from "src/compositions/session";

interface SignupData {
  user_type: string;
  email: string;
  password: string;
}

interface RestoData {
  nom_restaurant: string;
  prix: string;
  adress: string;
  speciality: string;
  user_id: number;
  photo_file: any;
}

export async function signupUser(data: SignupData) {
  return Axios.post(BASE_URL + "/signup", data);
}

export async function signupRestaurateur(data: FormData, token: string) {
  return Axios.post(BASE_URL + "/api/v1/restaurants", data, {
    headers: {
      accept: "application/json",
      "Accept-Language": "en-US,en;q=0.8",
      "Content-Type": `multipart/form-data; boundary=${
        (data as any)._boundary
      }`,
      Authorization: `Bearer ${token}`
    }
  });
}

export function useSignupUser(router: any) {
  const data = reactive<SignupData>({
    user_type: "",
    email: "",
    password: ""
  });

  function submit() {
    Loading.show();
    data.user_type = "client";
    signupUser(data)
      .then(function(result) {
        localStorage.setItem("token", JSON.stringify(result.data));
        setSession(result.data);
        router.replace("/home");
        Notify.create({
          message: "Votre compte a bien ete creer",
          type: "positive",
          position: "top"
        });
      })
      .catch(function(error) {
        Notify.create({
          message: "Email non diponible",
          type: "negative",
          position: "top"
        });
      })
      .then(function() {
        Loading.hide();
        data.email = "";
        data.password = "";
      });
  }

  return {
    data,
    submit
  };
}

export function useSignupRestaurateur(router: any) {
  const defaultState = function(): ISellerForm {
    return {
      email: "",
      password: "",
      restoName: "",
      address: "",
      minPrice: "",
      maxPrice: "",
      restoPhoto: null,
      speciality: null
    };
  };

  const form = reactive<ISellerForm>(defaultState());

  function reset() {
    form.email = "";
    form.password = "";
    form.speciality = "";
    form.address = "";
    form.minPrice = "";
    form.maxPrice = "";
    form.restoName = "";
    form.restoPhoto = null;
  }

  const submit = function() {
    Loading.show();
    signupUser({
      email: form.email,
      user_type: "restaurateur",
      password: form.password
    })
      .then(function(result: any) {
        const restoData = new FormData();
        restoData.append("nom_restaurant", form.restoName);
        restoData.append("prix", `${form.minPrice}-${form.maxPrice}`);
        restoData.append("adress", form.address);
        restoData.append("speciality", form.speciality!);
        restoData.append("users_id", result.data.user);
        restoData.append("photo", form.restoPhoto);

        signupRestaurateur(restoData, result.data.csrf)
          .then(function(result) {
            router.replace("/home");
          })
          .catch(function(error) {
            Notify.create({
              message: "Nom du restaurant non disponible",
              type: "negative",
              position: "top"
            });
          })
          .then(function() {
            Loading.hide();
            reset();
          });
      })
      .catch(function() {
        Notify.create({
          message: "Email invalide ou non disponible",
          type: "negative",
          position: "top"
        });
      })
      .then(function() {
        Loading.hide();
        reset();
      });
  };

  return {
    form,
    submit
  };
}
