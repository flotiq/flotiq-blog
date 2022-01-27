import React from 'react';

import Button from '../Button/Button';

const DiscoverMoreTopics = ({ tags, primaryTag, pathPrefix }) => (
    <div className="discover pb-5 mb-0 mb-sm-5">
        <h4>
            <strong>Discover more topics</strong>
        </h4>
        <div className="discover-tags">
            {tags.map((tag) => (
                <Button
                    additionalClasses={
                        tag.tag === primaryTag ? [] : ['btn--white', 'btn__with-border']
                    }
                    key={tag.id}
                >
                    <a href={`${pathPrefix}/tags/${tag.tag}`}>
                        {tag.tag_name}
                    </a>
                </Button>
            ))}
        </div>
    </div>
);

export default DiscoverMoreTopics;
