// tslint:disable:no-http-string
// import { Link } from 'gatsby';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { SocialLink } from '../../styles/shared';
import config from '../../website-config';

import Twitter from '../icons/twitter';
import YouTube from '../icons/youtube';
import GitHub from '../icons/github';
import Flotiq from '../icons/flotiq';
import SubscribeModal from '../subscribe/SubscribeOverlay';
import SiteNavLogo from './SiteNavLogo';
import Discord from '../icons/discord';

const HomeNavRaise = css`
  @media (min-width: 900px) {
    position: relative;
  }
`;

const SiteNavStyles = css`
  position: relative;
  z-index: 300;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  overflow-y: hidden;
  height: 40px;
  font-size: 1.2rem;
`;

const SiteNavLeft = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  margin-right: 10px;
  padding-bottom: 80px;
  letter-spacing: 0.4px;
  white-space: nowrap;

  -ms-overflow-scrolling: touch;

  @media (max-width: 700px) {
    margin-right: 0;
    padding-left: 4vw;
  }
`;

/* const NavStyles = css`
  display: flex;
  margin: 0 0 0 -12px;
  padding: 0;
  list-style: none;

  li {
    display: block;
    margin: 0;
    padding: 0;
    text-transform: uppercase;
  }

  li a {
    display: block;
    margin: 0;
    padding: 10px 12px;
    color: #fff;
    opacity: 0.8;
  }

  li a:hover {
    text-decoration: none;
    opacity: 1;
  }
`; */

const SiteNavRight = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: 40px;

  @media (max-width: 700px) {
    display: none;
  }
`;

const SocialLinks = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  a:last-of-type {
    padding-right: 20px;
  }
`;

const SubscribeButton = styled.a`
  display: block;
  padding: 4px 10px;
  border: #fff 1px solid;
  color: #fff;
  font-size: 1.2rem;
  line-height: 1em;
  border-radius: 10px;
  opacity: 0.8;

  :hover {
    text-decoration: none;
    opacity: 1;
    cursor: pointer;
  }
`;

interface SiteNavProps {
  isHome?: boolean;
}

class SiteNav extends React.Component<SiteNavProps> {
  subscribe = React.createRef<SubscribeModal>();

  openModal = () => {
    if (this.subscribe.current) {
      this.subscribe.current.open();
    }
  };

  render() {
    const { isHome = false } = this.props;
    return (
      <nav css={[isHome && HomeNavRaise, SiteNavStyles]}>
        <SiteNavLeft>
          {!isHome && <SiteNavLogo />}
          {/* <ul css={NavStyles} role="menu">
             TODO: mark current nav item - add class nav-current
            <li role="menuitem">
              <Link to="/">Home</Link>
            </li>
          </ul> */}
        </SiteNavLeft>
        <SiteNavRight>
          <SocialLinks>
            {config.discord && (
              <a href={config.discord} css={SocialLink} target="_blank" rel="noopener noreferrer">
                <Discord />
              </a>
            )}
            {config.youtube && (
              <a href={config.youtube} css={SocialLink} target="_blank" rel="noopener noreferrer">
                <YouTube />
              </a>
            )}
            {config.twitter && (
              <a href={config.twitter} css={SocialLink} target="_blank" rel="noopener noreferrer">
                <Twitter />
              </a>
            )}
            {config.github && (
              <a href={config.github} css={SocialLink} target="_blank" rel="noopener noreferrer">
                <GitHub />
              </a>
            )}
            <a href={config.siteUrl} css={SocialLink} target="_blank" rel="noopener noreferrer">
              <Flotiq />
            </a>
          </SocialLinks>
          {config.showSubscribe && (
            <SubscribeButton onClick={this.openModal}>Subscribe</SubscribeButton>
          )}
          {config.showSubscribe && <SubscribeModal ref={this.subscribe} />}
        </SiteNavRight>
      </nav>
    );
  }
}

export default SiteNav;
