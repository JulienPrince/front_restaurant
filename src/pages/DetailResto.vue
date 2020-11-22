<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="q-pa-lg ">
        <div class="text-h4 q-mb-md row justify-between text-primary text-bold">
          <q-btn
            flat
            icon="arrow_back"
            @click="$router.replace('/home')"
            size="xl"
          />

          <p v-if="resto">
            {{ resto.nom_restaurant.toUpperCase() }}
          </p>

          <ConnectionBtn />
        </div>

        <div style=" margin: auto;" class="row q-gutter-md">
          <div class="col">
            <q-card class="my-card">
              <q-card-section horizontal>
                <q-img
                  style="max-height: 250px"
                  v-if="resto"
                  class="col-7"
                  :src="resto.image | imageUrl"
                />
                <q-skeleton v-else height="200px" square width="400px" />

                <q-card-section v-if="resto" style="position: relative;">
                  <p class="text-bold">
                    <q-icon name="fastfood" size="md" class="q-mr-md" />{{
                      resto.nom_restaurant.toUpperCase()
                    }}
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
                  <p class="text-bold">
                    <q-icon name="menu_book" size="md" class="q-mr-md" />
                    {{ resto.speciality }}
                  </p>
                  <q-rating
                    :disable="!session.connected"
                    v-model="rating"
                    size="2em"
                    icon="restaurant_menu"
                    class="text-info"
                  />
                </q-card-section>

                <q-card-section v-else style="position: relative; width: 100%;">
                  <div
                    v-for="(elt, i) in new Array(5)"
                    :key="i"
                    style="width: 100%"
                    class="row q-mb-xs"
                  >
                    <q-skeleton type="circle" class="q-mr-xs" />
                    <q-skeleton type="text" class="col" />
                  </div>
                </q-card-section>
              </q-card-section>

              <q-separator />

              <q-card-actions class="row justify-center">
                <q-btn flat color="primary">
                  <ReservationForm />
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>

          <div class="col">
            <div class="q-gutter-md q-mb-md">
              <q-input
                filled
                type="textarea"
                label="Commentaire"
                :disable="!session.connected"
                v-model="comment"
              />
              <div class="row justify-end">
                <q-btn
                  color="primary"
                  rounded
                  label="Envoyer"
                  icon="send"
                  :disable="!session.connected"
                  @click="addComments"
                  :loading="loadingAddComment"
                />
              </div>
            </div>

            <div v-if="commentsLoading" class="row justify-center">
              <q-spinner color="primary" size="3em" />
            </div>
            <q-list v-else>
              <q-item
                class="q-mb-md shadow-1"
                v-for="com in comments"
                :key="com.id"
              >
                <q-item-section>
                  <q-item-label class="text-bold">{{ com.email }}</q-item-label>
                  <q-item-label caption>{{ com.comment }}</q-item-label>
                </q-item-section>

                <q-item-section side top>
                  <q-item-label caption>{{
                    com.created_at | formatDate
                  }}</q-item-label>
                  <q-icon name="face" size="lg" />
                </q-item-section>
              </q-item>

              <q-separator spaced inset />
            </q-list>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Axios from "axios";
import FormUser from "components/public/FormUser.vue";
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRef,
  toRefs,
  watch
} from "@vue/composition-api";
import { useGetRestaurant } from "../api/getRestaurant";
import { useGetComments } from "../api/getComments";
import { useGetOneResto } from "../api/getOneResto";
import { useAddComments } from "../api/addComment";
import { checkToken, session, useLogout } from "../compositions/session";
import { date } from "quasar";
import { BASE_URL } from "src/configs";
import { imageUrl } from "src/utils/imageUrl";
import ConnectionBtn from "src/components/public/ConnectionBtn.vue";
import ReservationForm from "src/components/detail-resto/ReservationForm.vue";

export default defineComponent({
  name: "DetailResto",
  setup(_, ctx) {
    const rating = ref(0);
    const logout = useLogout();
    const { state: oneRestoState } = useGetOneResto(ctx.root.$route.params.id);
    const { data: resto, loading: restoLoading } = { ...toRefs(oneRestoState) };
    const { state: commentsState } = useGetComments(ctx.root.$route.params.id);
    const { comments, loading: commentsLoading } = { ...toRefs(commentsState) };
    const { addComments, loadingAddComment, commentInput } = useAddComments(
      ctx.root.$route.params.id
    );

    onMounted(function() {
      checkToken();
    });

    return {
      rating,
      session,
      logout,
      comments,
      commentsLoading,
      comment: commentInput,
      loadingAddComment,
      addComments,
      resto,
      restoLoading
    };
  },
  components: {
    ConnectionBtn,
    ReservationForm
  },
  filters: {
    formatDate(strDate: string) {
      const myDate = new Date(strDate);
      return date.formatDate(myDate.getTime(), "YYYY-MM-DD");
    },
    imageUrl
  }
});
</script>

<style></style>
