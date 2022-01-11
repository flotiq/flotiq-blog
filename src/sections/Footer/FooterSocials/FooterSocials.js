import React from 'react';

const FooterSocials = ({ data }) => (
    <div className="footer-socials">
        <a
            target="_blank"
            href={data.github_url}
            className="social-button github"
            rel="noreferrer"
        >
            <em />
        </a>
        <a
            target="_blank"
            href={data.discord_url}
            className="social-button discord"
            rel="noreferrer"
        >
            <em />
        </a>
        <a
            target="_blank"
            href={data.youtube_url}
            className="social-button youtube"
            rel="noreferrer"
        >
            <em />
        </a>
        <a
            target="_blank"
            href={data.twitter_url}
            className="social-button twitter"
            rel="noreferrer"
        >
            <em />
        </a>
        <a
            target="_blank"
            href={data.facebook_url}
            className="social-button facebook"
            rel="noreferrer"
        >
            <em />
        </a>
        <a
            target="_blank"
            href={data.linkedin_url}
            className="social-button linkedin"
            rel="noreferrer"
        >
            <em />
        </a>
        <a
            target="_blank"
            href={data.reddit_url}
            className="social-button reddit"
            rel="noreferrer"
        >
            <em />
        </a>
    </div>
);

export default FooterSocials;
