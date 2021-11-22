import React, { useState } from 'react';
import './SharePostButtons.scss';

const SharePostButtons = () => {
    const [copied, setCopied] = useState(false);
    return (
        <>
            <a
                className="socials-item linkedin-share-button"
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                target="_blank"
                rel="noreferrer"
                title="Share on LinkedIn"
            >
                <em />
            </a>
            <a
                className="socials-item twitter-share-button"
                href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                target="_blank"
                rel="noreferrer"
                title="Share on Twitter"
            >
                <em />
            </a>
            <span
                className="socials-item facebook-share-button"
                onClick={() => window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
                    'facebook-share-dialog',
                    'width=626, height=436',
                )}
                title="Share on Facebook"
            >
                <em />
            </span>
            <span
                className="socials-item link-share-button"
                onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopied(true);
                    setTimeout(() => {
                        setCopied(false);
                    }, 1000);
                }}
                title="Copy URL"
            >
                {copied ? <em className="copied">copied</em> : <em />}
            </span>
        </>
    );
};

export default SharePostButtons;
