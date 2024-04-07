export const formatNumber = (number) => {
  // Convert the number to a string
  let numStr = number.toString();

  // Split the number into integer and decimal parts (if any)
  let parts = numStr.split(".");
  let integerPart = parts[0];
  let decimalPart = parts[1] || "";

  // Add commas to the integer part
  let formattedInteger = "";
  let integerLength = integerPart.length;
  let commaIndex = integerLength % 3 || 3;
  formattedInteger += integerPart.substr(0, commaIndex);
  while (commaIndex < integerLength) {
    formattedInteger += "," + integerPart.substr(commaIndex, 3);
    commaIndex += 3;
  }

  // Combine integer and decimal parts, if decimal part exists
  let formattedNumber =
    formattedInteger + (decimalPart ? "." + decimalPart : "");

  return formattedNumber;
};
