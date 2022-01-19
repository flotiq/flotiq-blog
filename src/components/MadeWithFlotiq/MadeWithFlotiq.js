import './MadeWithFlotiq.scss';

import React from 'react';

import Logo from '../../assets/favicons/favicon-16x16.png';

const MadeWithFlotiq = () => (
    <div className="made-with-flotiq">
        <img src={Logo} width="11" height="11" alt="Flotiq logo" />
        Made with Flotiq
    </div>
);

export default MadeWithFlotiq;
