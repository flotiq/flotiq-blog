import React from 'react';
import { Container } from 'react-bootstrap';
import Image from '../../assets/blog-footer-image.svg';
import Button from '../../components/Button/Button';
import './FlotiqPlatform.scss';

const FlotiqPlatform = () => (
    <Container fluid className="flotiq-platform">
        <img src={Image} alt="Flotiq headless CMS platform" className="pt-5 mt-5 flotiq-platform-image" />
        <h3 className="pt-5">Enjoy fast and painless content delivery to any channel.</h3>
        <div className="button-container">
            <Button
                click={() => window.open('mailto:hello@flotiq.com')}
                additionalClasses={['btn--white', 'btn--large']}
            >
                Contact sales
            </Button>
            <Button
                click={() => window.open('https://editor.flotiq.com/register.html')}
                additionalClasses={['btn-with-chevron']}
            >
                Get started for free
            </Button>
        </div>
    </Container>
);

export default FlotiqPlatform;
