<template>
  <div class="q-gutter-md">
    <q-input
      square
      filled
      clearable
      :value="value.email"
      @input="onChange('email', $event)"
      type="email"
      label="email"
    />
    <q-input
      square
      filled
      clearable
      :value="value.password"
      @input="onChange('password', $event)"
      type="password"
      label="mot de passe"
    />
    <q-input
      square
      filled
      clearable
      :value="value.restoName"
      @input="onChange('restoName', $event)"
      label="nom du restaurant"
    />
    <q-input
      square
      filled
      clearable
      :value="value.address"
      @input="onChange('address', $event)"
      label="adresse"
    />
    <div class="row q-gutter-xs">
      <q-input
        :value.number="value.minPrice"
        @input="onChange('minPrice', $event)"
        type="number"
        filled
        style="max-width: 200px"
        prefix="Ar"
        label="prix min"
        :min="0"
      />
      <q-input
        :value.number="value.maxPrice"
        @input="onChange('maxPrice', $event)"
        type="number"
        filled
        style="max-width: 200px"
        prefix="Ar"
        label="prix max"
        :min="0"
      />
    </div>
    <q-input
      square
      filled
      clearable
      :value="value.speciality"
      @input="onChange('speciality', $event)"
      label="specialite"
    />
    <div class="row items-start">
      <q-card style="width: 125px; height: 125px;">
        <q-img
          v-if="value.restoPhoto"
          :src="photoUrl"
          basic
          alt="P"
          style="width: 125px; height: 125px;"
        >
          <div class="absolute-bottom text-subtitle2 text-center">
            Photo restaurant
          </div>
        </q-img>
        <q-img
          v-else
          src="~/assets/restaurant3.jpg"
          basic
          alt="P"
          style="width: 125px; height: 125px;"
        />
      </q-card>
      <q-file
        class="col"
        filled
        :value="value.restoPhoto"
        @input="onChange('restoPhoto', $event)"
        label="image path"
        style="margin-left: 10px;"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "@vue/composition-api";
import { ISellerForm } from "src/types";

export default defineComponent({
  name: "FormSeller",
  props: {
    value: {
      type: Object as PropType<ISellerForm>,
      required: true
    }
  },
  setup(props, { emit }) {
    const photoUrl = computed(() =>
      props.value.restoPhoto ? URL.createObjectURL(props.value.restoPhoto) : ""
    );

    function onChange(key: keyof ISellerForm, value: string) {
      emit("input", { ...props.value, [key]: value });
    }

    return {
      photoUrl,
      onChange
    };
  }
});
</script>

<style></style>
