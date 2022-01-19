import './Button.scss';

import React from 'react';

function Button({ additionalClasses = [], additionalAttributes, children, click }) {
    return (
        <button className={['btn', ...additionalClasses].join(' ')} onClick={click} {...additionalAttributes}>
            {children}
        </button>
    );
}

export default Button;
