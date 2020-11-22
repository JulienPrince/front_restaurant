<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <div class="row justify-between q-pt-lg q-pr-lg">
        <p class="text-h4 q-ml-xl text-bold text-primary">
          <q-icon name="restaurant" color="primary" /> Les meilleurs restaurants
          <q-icon name="local_bar" color="primary" />
        </p>

        <ConnectionBtn />
      </div>

      <q-page class="q-pa-lg">
        <div style="max-width: 60%; margin: auto;">
          <div v-if="search" class="text-caption q-mb-md">
            {{ filtered.length }} restaurants
          </div>

          <q-input
            filled
            bottom-slots
            v-model="search"
            label="Rechercher"
            class="q-mb-xs"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-slot:append>
              <q-icon name="close" @click="text = ''" class="cursor-pointer" />
            </template>
          </q-input>

          <div>
            <q-card
              v-for="resto in filtered"
              :key="resto.id"
              class="my-card q-mb-md shadow-5"
              style="border-radius: 2%;"
            >
              <q-card-section horizontal>
                <q-img
                  style="max-height: 200px"
                  class="col-5"
                  :src="resto.image | imageUrl"
                />

                <q-card-section class="column justify-center">
                  <p class="text-bold">
                    <q-icon name="fastfood" size="md" class="q-mr-md" />
                    {{ resto.nom_restaurant.toUpperCase() }}
                  </p>
                  <p>
                    <q-icon name="alternate_email" size="md" class="q-mr-md" />
                    {{ resto.adress }}
                  </p>
                  <p class="text-bold">
                    <q-icon name="request_quote" size="md" class="q-mr-md" />
                    Prix moyen:
                    {{ resto.prix }} Ar
                  </p>
                </q-card-section>
              </q-card-section>

              <q-separator />

              <q-card-actions class="row justify-end">
                <q-btn
                  flat
                  rounded
                  :to="`/home/${resto.id}`"
                  icon="info"
                  label="detail"
                  color="primary"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  computed,
  ref
} from "@vue/composition-api";
import { useGetRestaurant } from "../api/getRestaurant";
import { session, useLogout, checkToken } from "../compositions/session";
import { imageUrl } from "src/utils/imageUrl";
import ConnectionBtn from "src/components/public/ConnectionBtn.vue";

export default defineComponent({
  name: "Home",
  setup(_, ctx) {
    const { state } = useGetRestaurant();
    const logout = useLogout();
    const search = ref("");
    const filtered = computed(() => {
      return state.data.filter(elt =>
        elt.nom_restaurant.toUpperCase().includes(search.value.toUpperCase())
      );
    });

    return {
      logout,
      filtered,
      search,
      session
    };
  },
  components: {
    ConnectionBtn
  },
  filters: {
    imageUrl
  },
  mounted() {
    checkToken();
  }
});
</script>

<style></style>
