import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

import CookieInfo from '../components/CookieInfo/CookieInfo';
import MadeWithFlotiq from '../components/MadeWithFlotiq/MadeWithFlotiq';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../sections/Footer/Footer';

const Layout = ({ children, navbarSettings = {}, mainSettings = {} }) => {
    const data = useStaticQuery(query);
    return (
        <main {...mainSettings}>
            <Helmet>
                <html lang="en" />
                <meta charSet="utf-8" />
                <script>
                    history.scrollRestoration = 'manual'
                </script>
            </Helmet>
            <Navbar {...navbarSettings} />
            {children}
            <Footer />
            <CookieInfo cookieText={data.allFlotiqMainSettings.nodes[0].cookie_policy_popup_text} />
            <MadeWithFlotiq />
        </main>
    );
};

const query = graphql`
    query LayoutQuery {
        allFlotiqMainSettings {
            nodes {
                cookie_policy_popup_text
            }
        }
    }`;

export default Layout;
