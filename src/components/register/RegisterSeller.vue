<template>
  <div class="row">
    <div class="col" style="height: 100vh;">
      <q-img
        src="https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg?auto=compress&cs=tinysrgb&h=650&w=940 940w, https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260 1260w, https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940 1880w, https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260 2520w"
        style="height: 100%; max-width: 100%"
      />
    </div>
    <div class="col row" style="height: 100vh; margin: 20px">
      <q-card
        square
        bordered
        class="q-pa-lg shadow-1"
        style="margin: auto; width: 75%"
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
            <div class="q-gutter-md">
              <q-input
                square
                filled
                clearable
                v-model="form.email"
                type="email"
                label="email"
              />
              <q-input
                square
                filled
                clearable
                v-model="form.password"
                type="password"
                label="mot de passe"
              />
              <q-input
                square
                filled
                clearable
                v-model="form.restoName"
                label="nom du restaurant"
              />
              <q-input
                square
                filled
                clearable
                v-model="form.address"
                label="adresse"
              />
              <div class="row q-gutter-xs">
                <q-input
                  v-model.number="form.minPrice"
                  type="number"
                  filled
                  style=""
                  prefix="Ar"
                  label="prix min"
                  :min="0"
                />
                <q-input
                  v-model.number="form.maxPrice"
                  type="number"
                  filled
                  style=""
                  prefix="Ar"
                  label="prix max"
                  :min="0"
                />
              </div>
              <q-input
                square
                filled
                clearable
                v-model="form.speciality"
                label="specialite"
              />
              <div class="row items-start">
                <q-card style="width: 125px; height: 125px;">
                  <q-img
                    v-if="form.restoPhoto"
                    :src="photoUrl"
                    basic
                    alt="P"
                    style="width: 125px; height: 125px;"
                  >
                    <div class="absolute-bottom text-subtitle2 text-center">
                      Photo restaurant
                    </div>
                  </q-img>
                  <q-img
                    v-else
                    src="https://images.pexels.com/photos/744780/pexels-photo-744780.jpeg?auto=compress&cs=tinysrgb&h=650&w=940 940w, https://images.pexels.com/photos/744780/pexels-photo-744780.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260 1260w, https://images.pexels.com/photos/744780/pexels-photo-744780.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940 1880w, https://images.pexels.com/photos/744780/pexels-photo-744780.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260 2520w"
                    basic
                    alt="P"
                    style="width: 125px; height: 125px;"
                  />
                </q-card>
                <q-file
                  class="col"
                  filled
                  v-model="form.restoPhoto"
                  label="image path"
                  style="margin-left: 10px;"
                />
              </div>
            </div>
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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from "@vue/composition-api";
import ToogleClientSellerLogin from "../public/ToogleClientSellerLogin.vue";
import FormSeller from "../public/FormSeller.vue";
import { ISellerForm } from "src/types";
import { useSignupRestaurateur } from "src/api/register";

export default defineComponent({
  name: "RegisterSeller",
  components: {
    ToogleClientSellerLogin,
    FormSeller
  },
  setup(_, ctx) {
    const { form, submit } = useSignupRestaurateur(ctx.root.$router);
    const photoUrl = computed(() =>
      form.restoPhoto ? URL.createObjectURL(form.restoPhoto) : ""
    );

    return {
      form,
      submit,
      photoUrl
    };
  }
});
</script>

<style></style>
