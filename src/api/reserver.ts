import Axios from "axios";
import { reactive } from "@vue/composition-api";
import { BASE_URL } from "src/configs";
import { session } from "src/compositions/session";
import { Notify, date } from "quasar";

export function useReserver(restaurantId: string) {
  const state = reactive({
    reservationDate: date.formatDate(Date.now(), "YYYY-MM-DD HH:mm"),
    open: false,
    loading: false
  });

  const submit = function() {
    state.loading = true;
    Axios.post(
      `${BASE_URL}/api/v1/restaurants/${restaurantId}/reservations
    `,
      {
        user_email: session.email,
        users_id: session.id,
        reservation: state.reservationDate
      },
      {
        headers: {
          Authorization: `Bearer ${session.csrf}`
        }
      }
    )
      .then(function(result) {})
      .then(function() {
        state.loading = false;
        state.open = false;
        Notify.create({
          message: `Reservation pour le ${state.reservationDate} a ete pris en compte`,
          type: "positive",
          position: "top"
        });
      });
  };

  return {
    state,
    submit
  };
}
