import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import appstore from '../../assets/appstore.svg';
import FooterBottomImage from '../../assets/footer-bottom-image.jpg';
import gplay from '../../assets/gplay.svg';
import Logo from '../../assets/Logo5.svg';
import FooterAccordion from './FooterAccordion/FooterAccordion';
import FooterColumns from './FooterColumns/FooterColumns';
import FooterSocials from './FooterSocials/FooterSocials';

const Footer = () => {
    const data = useStaticQuery(query);
    const year = new Date().getFullYear();
    return (
        <footer className="main-footer">
            <div className="main-footer-inner">
                <FooterColumns data={data.allFlotiqMainSettings.nodes[0]} />
                <div className="d-xs-block d-sm-block d-md-none d-lg-none">
                    <div className="main-footer-header">
                        <div className="main-footer-header-logo"><img src={Logo} alt="" /></div>
                        <p><strong>Download Flotiq App</strong></p>
                        <div>
                            <a
                                target="_blank"
                                href={data.allFlotiqMainSettings.nodes[0].google_play_url}
                                rel="noreferrer"
                            >
                                <img src={gplay} alt="" className="store-img" />
                            </a>
                            <a
                                target="_blank"
                                href={data.allFlotiqMainSettings.nodes[0].app_store_url}
                                rel="noreferrer"
                            >
                                <img src={appstore} alt="" className="store-img" />
                            </a>
                        </div>
                    </div>
                    <FooterAccordion data={data.allFlotiqMainSettings.nodes[0]} />
                </div>
                <div className="main-footer-subfooter">
                    <div className="main-footer-subfooter--opacity text-s">
                        ©
                        {' '}
                        {year}
                        {' '}
                        Flotiq
                    </div>
                    <div className="main-footer-subfooter--opacity">
                        <a href="https://flotiq.com/privacy-policy/" className="text-s">Privacy Policy</a>
                        <a href="https://flotiq.com/terms-of-service/" className="text-s">Terms of Service</a>
                        <a href="https://flotiq.com/cookie-policy/" className="text-s">Cookie Policy</a>
                    </div>
                    <FooterSocials data={data.allFlotiqMainSettings.nodes[0]} />
                </div>
                <div className="main-footer-ue mt-3 mb-3">
                    <img
                        src={FooterBottomImage}
                        alt="European Funds Smart Growth,
                           Republic of Poland,
                           Polish Investment & Trade Agency PFR Group,
                           European Union European Regional Development Fund"
                    />
                </div>
            </div>
        </footer>
    );
};

const query = graphql`
query FooterQuery {
  allFlotiqMainSettings {
    nodes {
      app_store_url
      discord_url
      facebook_url
      footer_1_column_header
      footer_2_column_header
      footer_3_column_header
      github_url
      google_play_url
      linkedin_url
      twitter_url
      youtube_url
      footer_1_column {
        text
        url
      }
      footer_2_column {
        text
        url
      }
      footer_3_column {
        text
        url
      }
    }
  }
}
`;

export default Footer;
