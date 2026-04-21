<template>
  <v-snackbar v-model="snackbarModel" :color="color" :timeout="timeout">
    {{ text }}

    <template v-slot:actions>
      <v-btn variant="text" @click="closeSnackbar"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
const props = defineProps({
  snackbar: { type: Boolean, required: true },
  text: { type: String, required: true },
  color: { type: String, default: "success" },
  timeout: { type: Number, default: 3000 },
});

const emit = defineEmits(["update:snackbar"]);

// ✅ single source of truth
const snackbarModel = computed({
  get: () => props.snackbar,
  set: (val) => emit("update:snackbar", val),
});

const closeSnackbar = () => {
  snackbarModel.value = false;
};
</script>
