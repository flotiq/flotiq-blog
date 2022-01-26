import React from 'react';
import { Container } from 'react-bootstrap';

import Image from '../../assets/blog-footer-image.svg';
import ImageMobile from '../../assets/blog-footer-image-mobile.svg';
import Button from '../../components/Button/Button';

const FlotiqPlatform = () => (
    <Container fluid className="flotiq-platform">
        <img
            src={Image}
            alt="Flotiq headless CMS platform"
            className="d-none d-md-block pt-5 mt-5 flotiq-platform-image"
        />
        <img
            src={ImageMobile}
            alt="Flotiq headless CMS platform"
            className="d-block d-md-none pt-5 mt-5 flotiq-platform-image"
        />
        <h3 className="pt-5">Enjoy fast and painless content delivery to any channel.</h3>
        <div className="button-container pb-4">
            <Button
                click={() => window.open('mailto:hello@flotiq.com')}
                additionalClasses={['btn-white-large', 'btn-mobile-big', 'mt-4', 'mx-2']}
            >
                Contact sales
            </Button>
            <Button
                click={() => window.open('https://editor.flotiq.com/register.html')}
                additionalClasses={['btn-with-chevron', 'btn-mobile-big', 'mt-4', 'mx-2']}
            >
                Get started for free
            </Button>
        </div>
    </Container>
);

export default FlotiqPlatform;
