import React from 'react';
import './TagPill.scss';

const TagPill = ({ tag }) => (
    <a href={`/tags/${tag.tag}`} className="tag-pill">{tag.tag_name}</a>
);

export default TagPill;
