import React, { useContext } from 'react';
import { AccordionContext } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

const ContextAwareToggle = ({ children, eventKey, callback }) => {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey),
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <button
            type="button"
            className={isCurrentEventKey ? 'accordion-button open' : 'accordion-button'}
            onClick={decoratedOnClick}
        >
            {children}
        </button>
    );
};

export default ContextAwareToggle;
