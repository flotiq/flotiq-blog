import RegisterBanner from "../components/RegisterBanner/RegisterBanner";
import React from "react";


const blocksMap = {
    ['register_banner']: <RegisterBanner/>,
}


export const blocksEmbed = (data) => {
    for (const property in data) {
        Object.keys(blocksMap).map((code) => {
            if (
                (data[property].data.text instanceof String
                    || typeof data[property].data.text === 'string')
                && data[property].data.text.indexOf(`[[${code}]]`) > -1
            ) {
                data[property].data.text = blocksMap[code];
            }
        })
    }
    return data;
};

export default blocksEmbed;