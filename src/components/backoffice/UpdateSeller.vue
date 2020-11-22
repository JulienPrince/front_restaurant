<template>
  <div class="class row">
    <div class="col row">
      <q-card
        square
        bordered
        class="q-pa-lg shadow-1"
        style="width: 75%; margin: auto;"
      >
        <q-card-section class="row items-center">
          <div class="text-h6">
            Modifier compte
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md">
            <FormSeller v-model="form" />
          </q-form>
        </q-card-section>
        <q-card-actions class="q-px-md">
          <q-btn
            unelevated
            color="light-green-7"
            size="lg"
            class="full-width"
            label="Creer compte"
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
import { defineComponent, reactive } from "@vue/composition-api";
import FormSeller from "components/public/FormSeller.vue";
import { ISellerForm } from "../../types";

export default defineComponent({
  name: "UpdateSeller",
  components: {
    FormSeller
  },
  setup() {
    const form = reactive<ISellerForm>({
      email: "",
      password: "",
      restoName: "",
      address: "",
      minPrice: "",
      maxPrice: "",
      restoPhoto: null,
      speciality: null
    });

    return {
      form
    };
  }
});
</script>

<style></style>
