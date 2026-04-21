<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Secret santa game - Export data</h1>

        <v-form ref="form" v-model="formModel" @submit.prevent="exportData">
          <v-row>
            <v-col cols="12">
              <v-file-input
                clearable
                label="Employees List (csv)"
                variant="solo-filled"
                v-model="employeesList"
                :rules="[rules.required, rules.isCsv]"
              ></v-file-input>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-file-input
                clearable
                label="Previous year's data (csv)"
                variant="solo-filled"
                v-model="previousYearData"
                :rules="[rules.sometimes, rules.isCsv]"
              ></v-file-input>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-btn color="primary" :loading="loading" type="submit"
                >Export data</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <Snackbar
      v-model:snackbar="snackbar"
      :text="snackbarText"
      :color="snackbarColor"
    />
  </v-container>
</template>

<script setup>
import Snackbar from "~/components/Snackbar.vue";
import rules from "~/utils/validations";
import { downloadFileAsCsv } from "~/utils/file";

const { $api } = useNuxtApp();
const loading = ref(false);

const processData = async () => {
  try {
    loading.value = true;
    const formData = new FormData();

    formData.append("employees_file", employeesList.value);

    if (previousYearData.value) {
      formData.append("previous_year_file", previousYearData.value);
    }

    const res = await $api.post("/employee/process", formData);
    downloadFileAsCsv(res.data, "secret_santa.csv");

    snackbar.value = true;
    snackbarText.value = "Data exported successfully";
    snackbarColor.value = "success";
  } catch (err) {
    snackbar.value = true;
    snackbarText.value = "Error exporting data";
    snackbarColor.value = "error";
  } finally {
    loading.value = false;
  }
};

const formModel = ref(false);
const form = ref(null);
const employeesList = ref(null);
const previousYearData = ref(null);

const snackbar = ref(false);
const snackbarText = ref("");
const snackbarColor = ref("success");

const exportData = async () => {
  const result = await form.value.validate();

  if (result.valid) {
    await processData();
  }
};
</script>
