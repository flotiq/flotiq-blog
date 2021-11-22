import React from 'react';
import Button from '../Button/Button';
import './DiscoverMoreTopics.scss';

const DiscoverMoreTopics = ({ tags, primaryTag }) => (
    <h4 className="discover pb-5 mb-5">
        <strong>Discover more topics</strong>
        {' '}
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
    </h4>
);

export default DiscoverMoreTopics;
