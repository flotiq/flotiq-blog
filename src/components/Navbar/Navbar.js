import { graphql, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import FlotiqLinkButton from '../FlotiqLinkButton/FlotiqLinkButton';

import Logo from '../../assets/Logo3.svg';
import Logo2 from '../../assets/Logo4.svg';
import Search from '../../assets/search.svg';
import Button from '../Button/Button';

const CustomNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [visible, setVisible] = React.useState(false);
    const data = useStaticQuery(query);
    return (
        <Navbar collapseOnSelect expand="md" sticky="top" id="navbar" className={isOpen ? 'open' : ''}>
            {visible
            && (
                <div className="backdrop" onClick={() => setVisible(false)} />
            )}
            <Container fluid className="position-relative">
                {visible
                && (
                    <div className="features-tab-dropdown-menu d-none d-md-block">
                        <div className="row">
                            <div className="col-6 col-xl-4">
                                {data.allFeatures.nodes.map((feature, index) => (index < 5 ? (
                                    <a
                                        href={`https://flotiq.com/features?feature=${index}`}
                                        className="dropdown-item"
                                        key={feature.id}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="dropdown-item__icon">
                                            <img src={feature.menu_icon[0].localFile.publicURL} alt={feature.name} />
                                        </span>
                                        {feature.name}
                                    </a>
                                ) : null))}
                            </div>
                            <div className="col-6 col-xl-4">
                                {data.allFeatures.nodes.map((feature, index) => (index > 4 && index < 10 ? (
                                    <a
                                        href={`https://flotiq.com/features?feature=${index}`}
                                        className="dropdown-item"
                                        key={feature.id}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="dropdown-item__icon">
                                            <img src={feature.menu_icon[0].localFile.publicURL} alt={feature.name} />
                                        </span>
                                        {feature.name}
                                    </a>
                                ) : null))}
                                <div className="dropdown-item dropdown-item__missing-feature d-flex d-xl-none">
                                    <p>Missing a feature?</p>
                                    <a href="mailto:hello@flotiq.com" className="link-with-arrow">
                                        Request new feature
                                    </a>
                                </div>
                            </div>
                            <div className="col-6 col-xl-4 d-none d-xl-block">
                                {data.allFeatures.nodes.map((feature, index) => (index > 9 ? (
                                    <a
                                        href={`https://flotiq.com/features?feature=${index}`}
                                        className="dropdown-item"
                                        key={feature.id}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="dropdown-item__icon">
                                            <img src={feature.menu_icon[0].localFile.publicURL} alt={feature.name} />
                                        </span>
                                        {feature.name}
                                    </a>
                                ) : null))}
                                <div className="dropdown-item dropdown-item__missing-feature">
                                    <p>Missing a feature?</p>
                                    <a href="mailto:hello@flotiq.com" className="link-with-arrow">
                                        Request new feature
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <Navbar.Brand href={`${data.site.siteMetadata.pathPrefix}/`}>
                    <img src={Logo} alt="Flotiq" className="d-none d-lg-inline" />
                    <img src={Logo2} alt="Flotiq" className="d-inline d-lg-none" />
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
                                    <Button additionalClasses={['btn--icon', 'search-button']} click={() => {}}>
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
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setIsOpen(!isOpen)} />
                </div>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-3">
                        <Nav.Item
                            role="button"
                            className="dropdown-toggle nav-link nav-link__features-dropdown d-none d-md-block"
                            onClick={() => setVisible(!visible)}
                        >
                            {visible ? <span className="nav-link__opened">Features</span>
                                : <span className="nav-link__closed">Features</span>}
                        </Nav.Item>
                        <NavDropdown title="Features" id="basic-nav-dropdown" className=" d-block d-md-none">
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
                            href="https://flotiq.com/solutions"
                            onClick={() => { setIsOpen(false); setVisible(false); }}
                        >
                            Solutions
                        </Nav.Link>
                        <Nav.Link
                            href="https://flotiq.com/pricing"
                            onClick={() => { setIsOpen(false); setVisible(false); }}
                        >
                            Pricing
                        </Nav.Link>
                        <NavDropdown title="Resources" id="basic-nav-dropdown" onClick={() => setVisible(false)}>
                            <a
                                href="https://flotiq.com/"
                                className="dropdown-item"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Main page
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
                                href="https://flotiq.productlift.dev"
                                className="dropdown-item"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Roadmap
                            </a>
                            <a
                                href="https://flotiq.com/starters/"
                                className="dropdown-item"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Starters
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
                                <Button additionalClasses={['btn--icon', 'search-button']} click={() => {}}>
                                    <img src={Search} alt="search" />
                                </Button>
                            </form>
                        </Nav.Item>
                        <FlotiqLinkButton/>
                    </Nav>
                    <div className="d-md-none d-lg-none bottom-mobile-nav">
                        <div>
                            <FlotiqLinkButton additionalClasses={['btn-mobile-big']} />
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
