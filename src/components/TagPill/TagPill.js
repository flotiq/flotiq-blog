import React from 'react';

const TagPill = ({ tag, pathPrefix }) => (
    <a href={`${pathPrefix}/tags/${tag.tag}`} className="tag-pill">{tag.tag_name}</a>
);

export default TagPill;
