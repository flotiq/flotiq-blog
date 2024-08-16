import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

import ContextAwareToggle from '../ContextAwareToggle/ContextAwareToggle';
import SubscriptionForm from '../SubscriptionForm/SubscriptionForm';

const FooterAccordion = ({ data }) => (
    <Accordion>
        <Card>
            <Card.Header>
                <ContextAwareToggle eventKey="0">
                    {data.footer_1_column_header}
                </ContextAwareToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <ul className="main-footer-list">
                        {data.footer_1_column.map((item) => (
                            <li key={item.text}>
                                <a target="_blank" href={item.url} rel="noreferrer">{item.text}</a>
                            </li>
                        ))}
                    </ul>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Card.Header>
                <ContextAwareToggle eventKey="1">
                    {data.footer_2_column_header}
                </ContextAwareToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
                <Card.Body>
                    <ul className="main-footer-list">
                        {data.footer_2_column.map((item) => (
                            <li key={item.text}>
                                <a target="_blank" href={item.url} rel="noreferrer">{item.text}</a>
                            </li>
                        ))}
                    </ul>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Card.Header>
                <ContextAwareToggle eventKey="2">
                    {data.footer_3_column_header}
                </ContextAwareToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
                <Card.Body>
                    <ul className="main-footer-list">
                        {data.footer_3_column.map((item) => (
                            <li key={item.text}>
                                <a target="_blank" href={item.url} rel="noreferrer">{item.text}</a>
                            </li>
                        ))}
                    </ul>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    </Accordion>
);

export default FooterAccordion;
