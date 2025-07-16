import plStrings from "../locale/pl-PL/String";

const locales = {
  "pl-PL": plStrings,
  // 'en-US': enStrings,
};

let currentLanguage = "pl-PL";

export function setLanguage(lang) {
  if (locales[lang]) {
    currentLanguage = lang;
  } else {
    console.warn(`Brak tłumaczeń dla języka: ${lang}`);
  }
}

function resolvePath(obj, path) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

export function getString(key) {
  const result = resolvePath(locales[currentLanguage], key);
  return result || key;
}
