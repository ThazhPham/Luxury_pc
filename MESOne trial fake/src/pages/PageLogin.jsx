import {
    useState,
    useRef,
    useEffect
} from 'react';

import apiServer
    from '../api/apiServer';

import { Popup } from 'devextreme-react/popup';
import { Button } from 'devextreme-react/button';


import '../css/PageLogin.css';
import { useNavigate } from 'react-router-dom';

import {
    getLang,
    setLang
} from '../api/languages';

export default function PageLogin() {
    //tk: 1admin
    //mk: Hoanghuyday1!

    const navigate = useNavigate();
    const [username, setUsername] =
        useState('1admin');

    const [password, setPassword] =
        useState('Hoanghuyday1!');

    // =====================
    // LANGUAGE STATE
    // =====================

    const [currentLang, setCurrentLang] =
        useState(getLang());

    const [showLangPopup, setShowLangPopup] =
        useState(false);

    const [pendingLang, setPendingLang] =
        useState(null);

    const [showDropdown, setShowDropdown] =
        useState(false);

    const dropdownRef = useRef(null);

    const [loading, setLoading] = useState(false);

    // =====================
    // CLOSE DROPDOWN ON OUTSIDE CLICK
    // =====================

    useEffect(() => {

        const handleClickOutside = (e) => {

            if (dropdownRef.current &&
                !dropdownRef.current.contains(e.target)) {

                setShowDropdown(false);
            }
        };

        document.addEventListener(
            'mousedown',
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside
            );
        };
    }, []);

    // =====================
    // LANGUAGE LABELS
    // =====================

    const languages = [
        {
            code: 'en',
            label: 'English',
            flag: '🇺🇸'
        },
        {
            code: 'vi',
            label: 'Vietnamese',
            flag: '🇻🇳'
        }
    ];

    // =====================
    // LANGUAGE HANDLERS
    // =====================

    const onLangClick = (langCode) => {

        if (langCode === currentLang) {
            setShowDropdown(false);
            return;
        }

        setShowDropdown(false);
        setPendingLang(langCode);
        setShowLangPopup(true);
    };

    const confirmLangChange = () => {

        if (pendingLang) {

            setLang(pendingLang);
            setCurrentLang(pendingLang);
        }

        setShowLangPopup(false);
        setPendingLang(null);
    };

    const cancelLangChange = () => {

        setShowLangPopup(false);
        setPendingLang(null);
    };

    // =====================
    // LOGIN
    // =====================

    const handleLogin = async () => {
        setLoading(true); // 👈 bật loading

        try {
            const user = await apiServer.login(username, password); // hoặc axios login của bạn

            if (user) {
                // giả lập delay (nếu bạn muốn thấy loading)
                await new Promise(resolve => setTimeout(resolve, 1000));

                // chuyển trang
                navigate("/dashboard");
            } else {
                alert("Login Failed");
            }

        } catch (err) {
            console.log(err);
            alert("Error login");
        } finally {
            setLoading(false); // 👈 luôn tắt loading
        }
    };

    // =====================
    // GET LABEL BY LANG
    // =====================

    const t = (vi, en) =>
        currentLang === 'vi' ? vi : en;

    return (

        <div className="login-page">

            {/* LEFT */}

            <div className="login-left">

                <div className="overlay" />

                <div className="left-content">

                    <h1>
                        MES SYSTEM
                    </h1>

                    <p>
                        {t(
                            'Bảng điều khiển nhà máy thông minh',
                            'Smart Factory Dashboard'
                        )}
                    </p>

                    <span>
                        DevExtreme Enterprise UI
                    </span>

                </div>

            </div>

            {/* RIGHT */}

            <div className="login-right">

                <div className="login-card">

                    <h2>
                        {t('Chào mừng trở lại', 'Welcome Back')}
                    </h2>

                    <p>
                        {t('Đăng nhập để tiếp tục', 'Sign in to continue')}
                    </p>

                    <input

                        type="text"

                        placeholder={t('Mã nhân viên', 'Employee Code')}

                        value={username}

                        onChange={(e) =>
                            setUsername(
                                e.target.value
                            )
                        }

                    />

                    <input

                        type="password"

                        placeholder={t('Mật khẩu', 'Password')}

                        value={password}

                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }

                    />

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? "Đang đăng nhập..." : "Login"}
                    </button>

                    {/* ===================== */}
                    {/* LANGUAGE DROPDOWN     */}
                    {/* ===================== */}

                    <div
                        className="lang-dropdown"
                        ref={dropdownRef}
                    >

                        <button
                            type="button"
                            className="lang-dropbtn"
                            onClick={() =>
                                setShowDropdown(!showDropdown)
                            }
                        >

                            <span className="lang-flag">
                                {languages.find(
                                    l => l.code === currentLang
                                )?.flag}
                            </span>

                            <span className="lang-label">
                                {languages.find(
                                    l => l.code === currentLang
                                )?.label}
                            </span>

                            <span className={
                                `lang-arrow ${showDropdown ? 'open' : ''
                                }`
                            }>
                                ▾
                            </span>

                        </button>

                        {showDropdown && (

                            <div className="lang-dropdown-content">

                                {languages.map((lang) => (

                                    <div
                                        key={lang.code}
                                        className={
                                            `lang-option ${currentLang === lang.code
                                                ? 'lang-active'
                                                : ''
                                            }`
                                        }
                                        onClick={() =>
                                            onLangClick(lang.code)
                                        }
                                    >

                                        <img
                                            className="lang-flag"
                                            src={lang.flag}
                                            alt={lang.label}
                                        />

                                        <span className="lang-label">
                                            {lang.label}
                                        </span>

                                        {currentLang === lang.code && (
                                            <span className="lang-check">
                                                ✓
                                            </span>
                                        )}

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </div>

            </div>

            {/* ===================== */}
            {/* LANGUAGE CONFIRM POPUP */}
            {/* ===================== */}

            <Popup
                visible={showLangPopup}
                onHiding={cancelLangChange}
                dragEnabled={false}
                hideOnOutsideClick={true}
                showCloseButton={false}
                showTitle={true}
                title={t(
                    '⚠️ Xác nhận thay đổi',
                    '⚠️ Confirm Change'
                )}
                width={420}
                height="auto"
                wrapperAttr={{
                    class: 'lang-popup-wrapper'
                }}
            >

                <div className="lang-popup-content">

                    <p className="lang-popup-message">
                        {t(
                            'Bạn có muốn thay đổi ngôn ngữ hiển thị không?\nDữ liệu trên trang sẽ được cập nhật theo ngôn ngữ mới.',
                            'Do you want to change the display language?\nPage data will be updated to the new language.'
                        )}
                    </p>

                    <div className="lang-popup-preview">

                        <img
                            className="lang-popup-flag"
                            src={languages.find(
                                l => l.code === pendingLang
                            )?.flag}
                            alt=""
                        />

                        <span className="lang-popup-name">
                            {languages.find(
                                l => l.code === pendingLang
                            )?.label}
                        </span>

                    </div>

                    <div className="lang-popup-actions">

                        <Button
                            text={t('Hủy', 'Cancel')}
                            type="normal"
                            stylingMode="outlined"
                            onClick={cancelLangChange}
                            width={140}
                            height={40}
                        />

                        <Button
                            text={t('Đồng ý', 'Confirm')}
                            type="default"
                            stylingMode="contained"
                            onClick={confirmLangChange}
                            width={140}
                            height={40}
                        />

                    </div>

                </div>

            </Popup>

        </div>
    );
}