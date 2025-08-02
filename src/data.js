// export const API_KEY = "AIzaSyDe39lvOy5LwqcgHsUr5__A19Gma3vWwD0";//An

import { useState } from "react";

export const API_KEY = "AIzaSyAEkALhmWMWkgAH2lazBYXbVBLbz8pGSJI"; //vuagi

export const value_converter = (value) => {
  if (value >= 1000000) {
    return Math.floor(value / 1000000) + "M";
  } else if (value >= 1000) {
    return Math.floor(value / 1000) + "K";
  } else {
    return value;
  }
};
// ✅ Fisher-Yates shuffle (robust & fast)
export const shuffleArray = (array) => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
