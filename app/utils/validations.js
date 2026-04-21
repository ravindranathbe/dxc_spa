const rules = {
  required: (value) => !!value || "This field is required",
  sometimes: (value) => !value || !!value || "This field is required",
  isCsv: (v) => {
    if (!v) return true;
    return v.name?.endsWith(".csv") || "Only CSV files are allowed";
  },
};

export default rules;
