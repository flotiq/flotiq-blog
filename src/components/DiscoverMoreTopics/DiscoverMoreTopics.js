import React from 'react';
import { Link } from 'gatsby';
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
                    additionalClasses={
                        tag.tag === primaryTag ? [] : ['btn--white', 'btn__with-border']
                    }
                    key={tag.id}
                >
                    <Link to={`/tags/${tag.tag}`}>
                        {tag.tag_name}
                    </Link>
                </Button>
            ))}
        </div>
    </div>
);

export default DiscoverMoreTopics;
