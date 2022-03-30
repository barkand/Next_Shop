import UseGlobalContext from "/src/context/global";

var persian_number = [
  "۰",
  "۱",
  "۲",
  "۳",
  "۴",
  "۵",
  "۶",
  "۷",
  "۸",
  "۹",
  ".",
  ",",
  "٪",
];
var english_number = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
  ",",
  "%",
];

function Persian_Number(num) {
  let numStr = String(num);

  var result = "";
  for (var i = 0; i < numStr.length; i++) {
    var index = english_number.indexOf(numStr[i]);
    if (index !== -1) {
      result += persian_number[index];
    } else {
      result += numStr[i];
    }
  }
  return result;
}

function English_Number(str) {
  var result = "";
  for (var i = 0; i < str.length; i++) {
    var index = persian_number.indexOf(str[i]);
    if (index !== -1) {
      result += english_number[index];
    } else {
      result += str[i];
    }
  }
  return result;
}

function Convert_To_Int(str) {
  let enStr = English_Number(str);
  enStr = enStr.replace(/[,]/g, "");
  return parseInt(enStr);
}

export function Local_Number(num) {
  const globalContext = UseGlobalContext();
  
  if (globalContext.culture.language === "fa") {
    return Persian_Number(num);
  } else {
    return num;
  }
}
