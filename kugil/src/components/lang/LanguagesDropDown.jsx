import { useState } from "react";
import { useTranslation } from "react-i18next";
import { GlobeIcon } from "../common/Icons";
import "../../css/LanguagesDropDown.css";


export default function LanguageDropdown( {
    showFlag = true, 
    shortLabel = false,
    showIcon =  false,
    showSmall = false,
    className=""
}) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const languages = [
    {
      code: "en",
      label: "English",
      short: "English",
      small: "EN",
      flag: "/images/flags/us.png"
    },
    {
      code: "vi-VN",
      label: "VietNamese",
      short:"Vietnam",
      small: "VN",
      flag: "/images/flags/vn.png"
    },
    {
      code: "ko-KR",
      label: "Korean",
      short: "Korean",
      small: "KR",
      flag: "/images/flags/kr.png"
    }
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language)
    || languages[0];

  const handleChangeLanguage = async (lng) => {
    await i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <div className={`language-dropdown ${className}`.trim()} >

      <button
        type="button"
        className="language-dropdown__button"
        onClick={() => setOpen(!open)}
      >

        {showIcon && (
            <GlobeIcon className="language-dropdown_globe"></GlobeIcon>
        )}

        {showFlag && (
        <img
          src={currentLanguage.flag}
          alt=""
        />
        )}
        <span>
            {showSmall 
              ? currentLanguage.small 
              : shortLabel 
                ? currentLanguage.short 
                : currentLanguage.label}
        </span>
      </button>

      {open && (
        <div className="language-dropdown__menu">

          {languages.map((lang) => (
            <div
              key={lang.code}
              className="language-dropdown__item"
              onClick={() => handleChangeLanguage(lang.code)}
            >
              <img
                src={lang.flag}
                alt=""
              />

              <span>
                {shortLabel ? lang.short : lang.label}
              </span>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}