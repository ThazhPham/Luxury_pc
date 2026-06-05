let currentLang = localStorage.getItem("lang") || "vi";

export const getLang = () => currentLang;

export const setLang = (lang) => {
    currentLang = lang;
    localStorage.setItem("lang", lang);
};