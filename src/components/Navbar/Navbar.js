import React, { useState } from 'react';
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
import Button from '../Button/Button';
import './Navbar.scss';
import Logo from '../../assets/Logo.svg';

const CustomNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Navbar collapseOnSelect expand="md" sticky="top" id="navbar" className={isOpen ? 'open' : ''}>
            <Container fluid>
                <Navbar.Brand href="/">
                    <img src={Logo} alt="Flotiq" />
                </Navbar.Brand>
                <div className="mobile-header-right">
                    <Nav className="d-sm-inline d-lg-none d-md-none">
                        <Button click={() => window.open('https://editor.flotiq.com/register.html')}>
                            <Nav.Item>
                                Go to Flotiq
                            </Nav.Item>
                        </Button>
                    </Nav>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setIsOpen(!isOpen)} />
                </div>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="https://flotiq.com/#features" onClick={() => setIsOpen(false)}>
                            Features
                        </Nav.Link>
                        <Nav.Link href="https://flotiq.com/#solutions" onClick={() => setIsOpen(false)}>
                            Solutions
                        </Nav.Link>
                        <Nav.Link href="https://flotiq.com/pricing" onClick={() => setIsOpen(false)}>
                            Pricing
                        </Nav.Link>
                        <NavDropdown title="Resources" id="basic-nav-dropdown">
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
                        </NavDropdown>
                    </Nav>
                    <Nav className="d-none d-md-flex d-lg-flex">
                        <Button click={() => window.open('https://editor.flotiq.com/register.html')}>
                            <Nav.Item>
                                Go to Flotiq
                            </Nav.Item>
                        </Button>
                    </Nav>
                    <div className="d-md-none d-lg-none bottom-mobile-nav">
                        <div>
                            <Button
                                click={() => window.open('https://editor.flotiq.com/register.html')}
                                additionalClasses={['btn-mobile-big']}
                            >
                                <Nav.Item>
                                    Go to Flotiq
                                </Nav.Item>
                            </Button>
                        </div>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
