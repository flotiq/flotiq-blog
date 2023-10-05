import React, {useCallback} from "react";
import Button from "../Button/Button";
import registerBannerIcon from '../../assets/register-banner-icon.svg';

export const RegisterBanner = () => {

    const Url = 'https://editor.flotiq.com';

    const handleButton = useCallback(() => window.open(Url), [Url])


    return <div
        className="register-banner d-flex justify-content-between items-center w-full"
    >
        <div>
            <div className={"mb-5"}>
                <h2>Discover how to build </h2>
                <h2>Better products with Flotiq</h2>
            </div>

            <Button click={handleButton} additionalClasses={['p-2', 'px-4']}>
                Start for Free
            </Button>
        </div>

        <img src={registerBannerIcon} alt="Flotiq"/>
    </div>
}


export default RegisterBanner;