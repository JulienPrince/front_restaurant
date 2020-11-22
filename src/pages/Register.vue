<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <RegisterClient v-if="accountType" />
        <RegisterSeller v-else />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import RegisterClient from "components/register/RegisterClient.vue";
import RegisterSeller from "components/register/RegisterSeller.vue";
import { useAccountType } from "../compositions/accountType";

export default defineComponent({
  name: "Register",
  components: {
    RegisterClient,
    RegisterSeller
  },
  setup() {
    const accountType = useAccountType();
    return {
      accountType
    };
  }
});
</script>

<style></style>
