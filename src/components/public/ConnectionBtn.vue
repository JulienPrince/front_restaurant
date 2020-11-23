<template>
  <div>
    <q-btn
      v-if="session.connected"
      icon="login"
      @click="logout"
      label="out"
      to="/home"
      flat
      class="q-mr-md text-red"
      size="xl"
    />
    <q-btn
      v-if="!session.connected"
      @click="$router.replace('/login')"
      icon="login"
      label="in"
      flat
      size="xl"
      class="q-mr-md text-primary"
    />
    <q-btn
      to="/admin"
      icon="settings"
      round
      v-if="session.role === 'restaurateur'"
      class="bg-primary text-white"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { session, useLogout } from "src/compositions/session";

export default defineComponent({
  name: "ConnectionBtn",
  setup() {
    const logout = useLogout();
    return {
      session,
      logout
    };
  }
});
</script>

<style></style>
