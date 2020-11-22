<template>
  <div class="row">
    <div class="col row">
      <q-card
        square
        bordered
        class="q-pa-lg shadow-1"
        style="width: 75%; margin: auto;"
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
        <ToogleClientSellerLogin />
        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input
              square
              filled
              clearable
              v-model="data.email"
              type="email"
              label="email"
            />
            <q-input
              square
              filled
              clearable
              v-model="data.password"
              type="password"
              label="mot de passe"
            />
          </q-form>
        </q-card-section>
        <q-card-actions class="q-px-md">
          <q-btn
            unelevated
            color="light-green-7"
            size="lg"
            class="full-width"
            label="Creer compte"
            @click="submit"
          />
        </q-card-actions>
        <q-card-section class="text-center q-pa-none">
          <p class="text-grey-6">Vous avez deja un compte ?</p>
          <q-btn flat to="/login" label="Se connecter" />
        </q-card-section>
      </q-card>
    </div>
    <div class="col window-height">
      <q-img
        src="~/assets/restaurant1.jpg"
        style="height: 100%; max-width: 100%"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/composition-api";
import ToogleClientSellerLogin from "../public/ToogleClientSellerLogin.vue";
import { useSignupUser } from "../../api/register";

export default defineComponent({
  name: "RegisterClient",
  components: {
    ToogleClientSellerLogin
  },
  setup(_, ctx) {
    const { data, submit } = useSignupUser(ctx.root.$router);

    return {
      data,
      submit
    };
  }
});
</script>

<style></style>
