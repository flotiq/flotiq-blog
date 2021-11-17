import React from 'react';

const SubscriptionForm = () => {
    const action = 'https://flotiq.us18.list-manage.com/subscribe/post?u=5f7db102d539d8f65a3639f8d&amp;id=da58181767';
    return (
        <>
            <li>
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
                        <div id="mc_embed_signup_scroll">
                            <input
                                type="email"
                                name="EMAIL"
                                className="email main-footer-subscription"
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
                            <input
                                type="submit"
                                value=""
                                name="subscribe"
                                id="mc-embedded-subscribe"
                                className="button main-footer-subscription-button"
                            />
                        </div>
                    </form>
                </div>
            </li>
            <li className="main-footer-item--opacity text-s">
                Join our newsletter to stay up to date on features and releases
            </li>
        </>
    );
};

export default SubscriptionForm;
