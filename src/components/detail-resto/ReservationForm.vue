<template>
  <div>
    <q-btn flat color="primary" @click="open = true">
      Reserver
    </q-btn>

    <q-dialog v-model="open">
      <div class="q-pa-md column items-center shadow-0" style="min-width: 50%">
        <div class="q-gutter-sm">
          <q-badge color="teal"> Model: {{ reservationDate }} </q-badge>
        </div>

        <div class="q-gutter-md row items-start">
          <q-date
            v-model="reservationDate"
            mask="YYYY-MM-DD HH:mm"
            color="primary"
          />
          <q-time
            v-model="reservationDate"
            mask="YYYY-MM-DD HH:mm"
            color="primary"
          />
        </div>
        <q-btn
          label="reserver"
          color="primary"
          class="q-mt-md"
          size="md"
          @click="submit"
          :loading="loading"
          :disable="!session.connected"
        />
      </div>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "@vue/composition-api";
import { useReserver } from "src/api/reserver";
import { session } from "src/compositions/session";

export default defineComponent({
  name: "ReservationForm",
  setup(_, ctx) {
    const { state, submit } = useReserver(ctx.root.$route.params.id);

    return {
      session,
      submit,
      ...toRefs(state)
    };
  }
});
</script>

<style></style>
