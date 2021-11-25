import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Container } from 'react-bootstrap';
import { graphql, useStaticQuery } from 'gatsby';
import HeaderImage from '../assets/404-header.png';
import Button from '../components/Button/Button';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../sections/Footer/Footer';
import CookieInfo from '../components/CookieInfo/CookieInfo';

const NotFoundPage = () => {
    const data = useStaticQuery(query);
    return (
        <main className="light-blue-background">
            <Helmet>
                <title>
                    Page not found -
                    {' '}
                    {data.allFlotiqMainSettings.nodes[0].title}
                </title>
            </Helmet>
            <Navbar />
            <Container className="text-center pt-5 pb-5">
                <img src={HeaderImage} alt="404" className="pt-5 pb-5" />
                <h1 className="pb-5">Whooops!</h1>
                <p className="text-gray pb-2">404 Not Found</p>
                <h4 className="pb-3">Sorry, the page you are looking for doesn&apos;t exist</h4>
                <Button
                    click={() => { window.location.href = '/'; }}
                    additionalClasses={['btn-with-chevron mt-5 mb-5 ml-auto mr-auto']}
                >
                    Go back Home
                </Button>
            </Container>
            <Footer />
            <CookieInfo cookieText={data.allFlotiqMainSettings.nodes[0].cookie_policy_popup_text} />
        </main>
    );
};

const query = graphql`
  query NotFoundQuery {
    allFlotiqMainSettings {
      nodes {
        cookie_policy_popup_text
        title
      }
    }
  }
`;

export default NotFoundPage;
