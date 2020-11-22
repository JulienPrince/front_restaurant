<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="bg-secondary">
      <div class="row window-height" style="border: 1px solid black;">
        <div class="col row">
          <q-card
            square
            bordered
            class="q-pa-lg shadow-1"
            style="width: 50%; margin: auto;"
          >
            <q-card-section class="row justify-center">
              <q-btn
                icon="restaurant"
                round
                style
                size="xl"
                color="primary"
                @click="$router.replace('/home')"
              />
            </q-card-section>
            <q-card-section>
              <q-form>
                <FormUser v-model="state.form" />
              </q-form>
            </q-card-section>
            <q-card-actions class="q-px-md">
              <q-btn
                unelevated
                color="primary"
                size="lg"
                class="full-width"
                label="Se connecter"
                @click="submit"
              />
            </q-card-actions>
            <q-card-section class="text-center q-pa-none">
              <p class="text-grey-6">Vous n'avez pas encore de compte ?</p>
              <q-btn flat to="/register" label="S'enregistrer" />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/composition-api";
import FormUser from "components/public/FormUser.vue";
import Axios from "axios";
import { BASE_URL } from "src/configs";
import { useLogin } from "../api/login";
import { session } from "../compositions/session";
import { Notify } from "quasar";

export default defineComponent({
  name: "Login",
  components: {
    FormUser
  },
  setup(_, ctx) {
    const { state, submit } = useLogin(ctx.root.$router);
    return { state, submit };
  }
});
</script>

<style></style>
