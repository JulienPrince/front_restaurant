<template>
  <q-card-section class="row items-center">
    <div class="text-h6" :class="{ 'text-grey-5': accountType }">
      Compte Restaurateur
    </div>
    <q-toggle v-model="accountType" />
    <div class="text-h6" :class="{ 'text-grey-5': !accountType }">
      Compte Client
    </div>
  </q-card-section>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { useAccountType } from "../../compositions/accountType";

export default defineComponent({
  name: "ToogleClientSellerLogin",
  setup() {
    const accountType = useAccountType();
    return {
      accountType
    };
  }
});
</script>

<style></style>
