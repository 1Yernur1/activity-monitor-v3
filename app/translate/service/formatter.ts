export const getFormattedDate = (selectedDate: string) => {
  const timestamp = new Date(selectedDate);

  const day = String(timestamp.getDate()).padStart(2, "0");
  const month = String(timestamp.getMonth() + 1).padStart(2, "0");
  const year = timestamp.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};
