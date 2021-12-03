import React from 'react';
import Button from '../Button/Button';
import './DiscoverMoreTopics.scss';

const DiscoverMoreTopics = ({ tags, primaryTag }) => (
    <div className="discover pb-5 mb-0 mb-sm-5">
        <h4>
            <strong>Discover more topics</strong>
        </h4>
        <div className="discover-tags">
            {tags.map((tag) => (
                <Button
                    click={() => { window.location.href = `/tags/${tag.tag}`; }}
                    additionalClasses={
                        tag.tag === primaryTag ? [] : ['btn--white', 'btn__with-border']
                    }
                    key={tag.id}
                >
                    {tag.tag_name}
                </Button>
            ))}
        </div>
    </div>
);

export default DiscoverMoreTopics;
