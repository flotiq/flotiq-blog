import React from 'react';
import './TagPill.scss';
import { Link } from 'gatsby';

const TagPill = ({ tag }) => (
    <Link to={`/tags/${tag.tag}`} className="tag-pill">{tag.tag_name}</Link>
);

export default TagPill;
