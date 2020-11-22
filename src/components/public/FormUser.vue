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
      :rules="[val => !!val || 'Champ requis']"
    />
    <q-input
      square
      filled
      clearable
      :value="value.password"
      @input="onChange('password', $event)"
      type="password"
      label="mot de passe"
      :rules="[val => !!val || 'Champ requis']"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";

interface FormUserInput {
  email: string;
  password: string;
}

export default defineComponent({
  name: "FormUser",
  props: {
    value: {
      type: Object as PropType<FormUserInput>,
      required: true
    }
  },
  setup(props, { emit }) {
    function onChange(key: keyof FormUserInput, value: string) {
      emit("input", { ...props.value, [key]: value });
    }

    return {
      onChange
    };
  }
});
</script>

<style></style>
