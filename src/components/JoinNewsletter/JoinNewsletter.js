import React from 'react';
import { Container } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import Close from '../../assets/close-black.svg';
import './JoinNewsletter.scss';

const COOKIE_KEY2 = 'fq_join_newsletter_dismiss';

const JoinNewsletter = () => {
    const [cookies, setCookie] = useCookies([COOKIE_KEY2]);
    const isBrowser = () => typeof window !== 'undefined';

    const dismiss = () => {
        setCookie(COOKIE_KEY2, 1);
    };
    const action = 'https://flotiq.us18.list-manage.com/subscribe/post?u=5f7db102d539d8f65a3639f8d&amp;id=da58181767';
    return (
        (isBrowser() && cookies && !cookies[COOKIE_KEY2])
            ? (
                <Container>
                    <div id="mc_embed_signup">
                        <form
                            action={action}
                            method="post"
                            id="mc-embedded-subscribe-form"
                            name="mc-embedded-subscribe-form"
                            className="validate"
                            target="_blank"
                            noValidate
                        >
                            <div id="mc_embed_signup_scroll" className="join-newsletter-box">
                                <div className="join-newsletter-box-header">
                                    <h4><strong>Join our newsletter</strong></h4>
                                    <button
                                        aria-label="Close"
                                        className="join-newsletter-close-btn d-inline-block d-md-none"
                                        onClick={() => dismiss()}
                                    >
                                        <img
                                            alt="Close join newsletter box"
                                            src={Close}
                                        />
                                    </button>
                                </div>
                                <div className="join-newsletter-box-form">
                                    <input
                                        type="email"
                                        name="EMAIL"
                                        className="email join-newsletter-subscription"
                                        id="mce-EMAIL"
                                        placeholder="Enter your email address"
                                        required
                                    />
                                    <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                                        <input
                                            type="text"
                                            name="b_5f7db102d539d8f65a3639f8d_da58181767"
                                            tabIndex="-1"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        name="subscribe"
                                        id="mc-embedded-subscribe"
                                        className="btn join-newsletter-subscription-button"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                                <button
                                    aria-label="Close"
                                    className="join-newsletter-close-btn d-none d-md-inline-block"
                                    onClick={() => dismiss()}
                                >
                                    <img
                                        alt="Close join newsletter box"
                                        src={Close}
                                    />
                                </button>
                            </div>
                        </form>
                    </div>
                </Container>
            ) : null
    );
};

export default JoinNewsletter;
