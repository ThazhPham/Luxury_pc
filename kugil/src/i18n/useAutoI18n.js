import { useTranslation } from "react-i18next";
import { toAutoKey } from "./autoKey";
import { registerKeyToLocize } from "./autoRegister";
import { useRef } from "react";

export const useAutoI18n = () => {
  const { t } = useTranslation();

  const cacheRef = useRef(new Set());

  const translate = (text) => {
    if (!text) return "";

    const key = toAutoKey(text);

    // ❗ tránh spam API khi re-render
    if (!cacheRef.current.has(key)) {
      cacheRef.current.add(key);
      registerKeyToLocize(key, text);
    }

    return t(key, text);
  };

  return { translate };
};