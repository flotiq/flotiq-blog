import React from 'react';
import Button from "../Button/Button";
import {Nav} from "react-bootstrap";
import {useCookies} from 'react-cookie';

const FlotiqLinkButton = ({additionalClasses = []}) => {
    const [cookies] = useCookies(['logged']);
    return (<>
        {cookies.logged ? (
            <Button click={() => window.open('https://editor.flotiq.com')}
                    className={['btn', ...additionalClasses].join(' ')}>
                <Nav.Item>
                    My Flotiq
                </Nav.Item>
            </Button>
        ) : (
            <Button click={() => window.open('https://editor.flotiq.com/register.html')}
                    className={['btn', ...additionalClasses].join(' ')}
            >
                <Nav.Item>
                    Go to Flotiq
                </Nav.Item>
            </Button>
        )}

    </>);
}

export default FlotiqLinkButton;
