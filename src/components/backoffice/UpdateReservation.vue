<template>
  <q-dialog :value="open" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Modifier la reservation</div>
      </q-card-section>

      <q-card-section class="q-pt-none q-gutter-md">
        <q-date minimal />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Annuler" v-close-popup />
        <q-btn flat label="Enregistrer" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "UpdateReservation",
  props: {
    open: Boolean
  }
});
</script>

<style></style>
