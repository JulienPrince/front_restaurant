<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <div class="q-pa-md row justify-between">
          <div class="row q-gutter-md items-center">
            <q-btn
              round
              class="bg-primary"
              text-color="white"
              icon="home"
              size="lg"
              to="/home"
            />
            <div class="text-h6">{{ session.email }}</div>
          </div>
          <ConnectionBtn />
        </div>

        <div class="row q-pa-md">
          <div class="col">
            <q-table
              title="Reservations"
              :data="data"
              :columns="columns"
              row-key="name"
              selection="single"
              :selected.sync="selected"
            >
              <template v-slot:top>
                <q-btn color="primary" :disable="true" label="Modifier" />
                <q-btn
                  class="q-ml-sm"
                  color="primary"
                  :disable="true"
                  label="Supprimer"
                />
              </template>
            </q-table>
          </div>
          <div class="col">
            <UpdateSeller />
          </div>
        </div>

        <UpdateReservation :open="selected.length ? true : false" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onBeforeMount,
  onMounted,
  toRefs
} from "@vue/composition-api";
import UpdateSeller from "components/backoffice/UpdateSeller.vue";
import UpdateReservation from "components/backoffice/UpdateReservation.vue";
import ConnectionBtn from "../components/public/ConnectionBtn.vue";
import { checkToken, session } from "../compositions/session";

export default defineComponent({
  name: "Backoffice",
  components: {
    UpdateSeller,
    UpdateReservation,
    ConnectionBtn
  },
  setup(_, ctx) {
    const state = reactive({
      selected: [],
      columns: [
        { name: "client", label: "Client", field: "client", align: "left" },
        {
          name: "reservation",
          label: "Reservation",
          field: "reservation",
          align: "left"
        }
      ],
      data: [
        {
          name: "1",
          client: "joseph",
          reservation: "12-03-2020"
        },
        {
          name: "2",
          client: "jean",
          reservation: "13-03-2020"
        }
      ]
    });

    onMounted(function() {
      checkToken();
      if (!session.connected && session.role !== "restaurateur") {
        ctx.root.$router.replace("/login");
      }
    });

    return {
      ...toRefs(state),
      session
    };
  }
});
</script>
