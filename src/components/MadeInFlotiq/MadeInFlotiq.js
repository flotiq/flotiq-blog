import React from 'react';
import './MadeInFlotiq.scss';
import Logo from '../../assets/favicons/favicon-16x16.png';

const MadeInFlotiq = () => (
    <div className="made-in-flotiq">
        <img src={Logo} width="11" height="11" alt="Flotiq logo" />
        Made in Flotiq
    </div>
);

export default MadeInFlotiq;
