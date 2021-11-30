import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import CloseCircle from '../../assets/close-circle.svg';
import './CookieInfo.scss';

const COOKIE_KEY = 'fq_cookies_message_dismiss';

const CookieInfo = ({ cookieText }) => {
    const [cookies, setCookie] = useCookies([COOKIE_KEY]);
    const [isShown, setIsShown] = useState(true);
    const isBrowser = () => typeof window !== 'undefined';

    const dismiss = () => {
        setCookie(COOKIE_KEY, 1);
    };

    useEffect(() => {
        setIsShown(true);
        setTimeout(() => {
            setIsShown(false);
        }, 15000);
    }, []);

    return (
        (isBrowser() && cookies && !cookies[COOKIE_KEY] && isShown)
            ? (
                <div className="cookie-info">
                    {/* eslint-disable-next-line react/no-danger */}
                    <div className="cookie-info-text" dangerouslySetInnerHTML={{ __html: cookieText }} />
                    <button aria-label="Close" className="cookie-info-close-btn" onClick={() => dismiss()}>
                        <img
                            alt="Close cookie info"
                            src={CloseCircle}
                        />
                    </button>
                </div>
            ) : ''
    );
};

export default CookieInfo;
