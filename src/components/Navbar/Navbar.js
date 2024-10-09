import { graphql, useStaticQuery, Link } from 'gatsby';
import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import FlotiqLinkButton from '../FlotiqLinkButton/FlotiqLinkButton';

import FlotiqLogo from '../../assets/Logo.svg';
import FlotiqBadge from '../../assets/Logo5.svg';
import BlogBadge from '../../assets/blog-badge.svg';
import Search from '../../assets/search.svg';
import Button from '../Button/Button';

const CustomNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [visible, setVisible] = React.useState(false);
    const data = useStaticQuery(query);
    return (
        <Navbar
            collapseOnSelect
            expand="md"
            sticky="top"
            id="navbar"
            className={isOpen ? 'open' : ''}
        >
            {visible && (
                <div className="backdrop" onClick={() => setVisible(false)} />
            )}
            <Container fluid className="position-relative">
                {visible && (
                    <div className="features-tab-dropdown-menu d-none d-md-block">
                        <div className="row">
                            <div className="col-6 col-xl-4">
                                {data.allFeatures.nodes.map((feature, index) =>
                                    index < 5 ? (
                                        <a
                                            href={`https://flotiq.com/features?feature=${index}`}
                                            className="dropdown-item"
                                            key={feature.id}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <span className="dropdown-item__icon">
                                                <img
                                                    src={
                                                        feature.menu_icon[0]
                                                            .localFile.publicURL
                                                    }
                                                    alt={feature.name}
                                                />
                                            </span>
                                            {feature.name}
                                        </a>
                                    ) : null
                                )}
                            </div>
                            <div className="col-6 col-xl-4">
                                {data.allFeatures.nodes.map((feature, index) =>
                                    index > 4 && index < 10 ? (
                                        <a
                                            href={`https://flotiq.com/features?feature=${index}`}
                                            className="dropdown-item"
                                            key={feature.id}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <span className="dropdown-item__icon">
                                                <img
                                                    src={
                                                        feature.menu_icon[0]
                                                            .localFile.publicURL
                                                    }
                                                    alt={feature.name}
                                                />
                                            </span>
                                            {feature.name}
                                        </a>
                                    ) : null
                                )}
                                <div className="dropdown-item dropdown-item__missing-feature d-flex d-xl-none">
                                    <p>Missing a feature?</p>
                                    <a
                                        href="mailto:hello@flotiq.com"
                                        className="link-with-arrow"
                                    >
                                        Request new feature
                                    </a>
                                </div>
                            </div>
                            <div className="col-6 col-xl-4 d-none d-xl-block">
                                {data.allFeatures.nodes.map((feature, index) =>
                                    index > 9 ? (
                                        <a
                                            href={`https://flotiq.com/features?feature=${index}`}
                                            className="dropdown-item"
                                            key={feature.id}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <span className="dropdown-item__icon">
                                                <img
                                                    src={
                                                        feature.menu_icon[0]
                                                            .localFile.publicURL
                                                    }
                                                    alt={feature.name}
                                                />
                                            </span>
                                            {feature.name}
                                        </a>
                                    ) : null
                                )}
                                <div className="dropdown-item dropdown-item__missing-feature">
                                    <p>Missing a feature?</p>
                                    <a
                                        href="mailto:hello@flotiq.com"
                                        className="link-with-arrow"
                                    >
                                        Request new feature
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <Navbar.Brand>
                    <div className="d-none d-lg-flex align-items-center">
                        <a href="https://flotiq.com/">
                            <img src={FlotiqLogo} className="brand-logo" alt="Flotiq" />
                        </a>
                        <a href="/">
                            <img src={BlogBadge} className="brand-blog-badge ml-3" alt="Flotiq Blog" />
                        </a>
                    </div>
                    <div className="d-inline-flex align-items-center d-lg-none">
                        <a href="https://flotiq.com/">
                            <img src={FlotiqBadge} className="brand-logo--mobile" alt="Flotiq"/>
                        </a>
                        <a href="/">
                            <img src={BlogBadge} className="brand-blog-badge--mobile ml-3" alt="Flotiq Blog"/>
                        </a>
                    </div>

                </Navbar.Brand>
                <div className="mobile-header-right">
                    <Nav className="d-inline d-md-none">
                        <FlotiqLinkButton/>
                        <Nav.Item>
                            <form
                              action={`${data.site.siteMetadata.pathPrefix}/search/`}
                                className={`search ${searchOpen ? 'open' : ''}`}
                            >
                                <div className="position-relative">
                                    <input
                                        name="q"
                                        placeholder="Type to search..."
                                        required
                                        className="search-input"
                                        autoComplete="off"
                                        onFocus={() => setSearchOpen(true)}
                                        onBlur={() => setSearchOpen(false)}
                                    />
                                    <Button
                                        additionalClasses={[
                                            'btn--icon',
                                            'search-button',
                                        ]}
                                        click={() => {}}
                                    >
                                        <img src={Search} alt="search" />
                                    </Button>
                                </div>
                            </form>
                        </Nav.Item>
                    </Nav>
                    <Button
                        additionalClasses={['btn--icon', 'search-open-button']}
                        click={() => setSearchOpen(!searchOpen)}
                    >
                        <span />
                    </Button>
                    <Navbar.Toggle
                        aria-controls="responsive-navbar-nav"
                        onClick={() => setIsOpen(!isOpen)}
                    />
                </div>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-3">
                        <Nav.Item
                            role="button"
                            className="dropdown-toggle nav-link nav-link__features-dropdown d-none d-md-block"
                            onClick={() => setVisible(!visible)}
                        >
                            {visible ? (
                                <span className="nav-link__opened">
                                    Features
                                </span>
                            ) : (
                                <span className="nav-link__closed">
                                    Features
                                </span>
                            )}
                        </Nav.Item>
                        <NavDropdown
                            title="Features"
                            id="basic-nav-dropdown"
                            className=" d-block d-md-none"
                        >
                            {data.allFeatures.nodes.map((feature, index) => (
                                <a
                                    href={`/features?feature=${index}`}
                                    className="dropdown-item"
                                    key={feature.id}
                                >
                                    {feature.name}
                                </a>
                            ))}
                        </NavDropdown>
                        <Nav.Link
                            href="https://flotiq.com/solutions/"
                            onClick={() => {
                                setIsOpen(false);
                                setVisible(false);
                            }}
                        >
                            Solutions
                        </Nav.Link>
                        <Nav.Link
                            href="https://flotiq.com/pricing/"
                            onClick={() => {
                                setIsOpen(false);
                                setVisible(false);
                            }}
                        >
                            Pricing
                        </Nav.Link>
                        <NavDropdown
                            title="Resources"
                            id="basic-nav-dropdown"
                            onClick={() => setVisible(false)}
                        >
                            <a
                                href="https://flotiq.com/case-studies/"
                                className="dropdown-item"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Case studies
                            </a>
                            <a
                                href="https://flotiq.com/docs/"
                                className="dropdown-item"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Docs
                            </a>
                            <a
                                href="https://flotiq.com/docs/faq/"
                                className="dropdown-item"
                                target="_blank"
                                rel="noreferrer"
                            >
                                FAQ
                            </a>
                            <a
                                href="https://flotiq.com/starters/"
                                className="dropdown-item"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Starters
                            </a>
                            <a
                                href="https://flotiq.com/integrations/"
                                className="dropdown-item"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Integrations
                            </a>
                        </NavDropdown>
                    </Nav>
                    <Nav className="d-none d-md-flex d-lg-flex">
                        <Nav.Item>
                            <form
                                action={`${data.site.siteMetadata.pathPrefix}/search/`}
                                className={`search ${searchOpen ? 'open' : ''}`}
                            >
                                <input
                                    name="q"
                                    placeholder="Type to search..."
                                    required
                                    className="search-input"
                                    autoComplete="off"
                                    onFocus={() => setSearchOpen(true)}
                                    onBlur={() => setSearchOpen(false)}
                                />
                                <Button
                                    additionalClasses={[
                                        'btn--icon',
                                        'search-button',
                                    ]}
                                    click={() => {}}
                                >
                                    <img src={Search} alt="search" />
                                </Button>
                            </form>
                        </Nav.Item>
                        <FlotiqLinkButton />
                    </Nav>
                    <div className="d-md-none d-lg-none bottom-mobile-nav">
                        <div>
                            <FlotiqLinkButton
                                additionalClasses={['btn-mobile-big']}
                            />
                        </div>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

const query = graphql`
    query MenuQuery {
        allFeatures {
            nodes {
                id
                name
                order
                menu_icon {
                    localFile {
                        publicURL
                    }
                }
            }
        }
        site {
            siteMetadata {
                pathPrefix
            }
        }
    }
`;

export default CustomNavbar;
