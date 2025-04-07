import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { RootState } from "@/features/store";

import { useTranslation } from "react-i18next";
import { setLanguage } from "../features/language/languageSlice";
import i18n from "@/utils/translations/i18n";

interface HeaderProps {
  isAuthenticated: boolean;
}

const Header = ({ isAuthenticated }: HeaderProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.current
  );

  const handleLanguageChange = (lang: string) => {
    dispatch(setLanguage(lang)); // Set language in Redux store
    i18n.changeLanguage(lang); // Change language in i18next
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="header__title">Weather App</div>
      
      <div className="header__actions">
        <div className="language-selector">
          <button
            className={`language-btn ${currentLanguage === "en" ? "active" : ""}`}
            onClick={() => handleLanguageChange("en")}
          >
            EN
          </button>
          <button
            className={`language-btn ${currentLanguage === "es" ? "active" : ""}`}
            onClick={() => handleLanguageChange("es")}
          >
            ES
          </button>
        </div>
        
        {isAuthenticated && (
          <button className="logout-btn" onClick={handleLogout}>
            {t("logout")}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
