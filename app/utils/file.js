/**
 * Download file as CSV
 * @param {Array} data
 * @param {String} fileName
 */
const downloadFileAsCsv = (data, fileName) => {
  try {
    const blob = new Blob([data], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
  }
};

export { downloadFileAsCsv };
