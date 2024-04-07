export const formatDate = (dateString) => {
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear().toString().slice(-2); // Extract last two digits of the year
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${day}/${month}/${year}`;
};
