export const formatNumber = (number) => {
  if (!number && number !== 0) return 0;

  // Convert the number to a string
  let numStr = number.toString();

  // Check if the number is negative
  let isNegative = false;
  if (numStr.startsWith("-")) {
    isNegative = true;
    numStr = numStr.substring(1); // Remove the negative sign temporarily
  }

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
    if (
      formattedInteger !== "" ||
      (formattedInteger === "" && integerPart[0] === "0")
    ) {
      formattedInteger += "," + integerPart.substr(commaIndex, 3);
    } else {
      formattedInteger += integerPart.substr(commaIndex, 3);
    }
    commaIndex += 3;
  }

  // Add the negative sign back if necessary
  if (isNegative) {
    formattedInteger = "-" + formattedInteger;
  }

  // Combine integer and decimal parts, if decimal part exists
  let formattedNumber =
    formattedInteger + (decimalPart ? "." + decimalPart : "");

  return formattedNumber;
};
