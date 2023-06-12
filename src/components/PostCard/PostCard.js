import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';

import { getReadingTime } from '../../helpers/readingTime';
import TagPill from '../TagPill/TagPill';

const PostCard = ({ post, showDescription, additionalClass }) => (

    <div
        className={`post-card pb-4 ${additionalClass}`}
    >
        <div>
            <Link to={`/${post.slug}`} className="post-card-link">
                {
                // eslint-disable-next-line no-nested-ternary
                    post.headerImage ? (
                        post.headerImage[0].extension !== 'svg'
                        && post.headerImage[0].localFile
                        && post.headerImage[0].localFile.childImageSharp
                            ? (
                                <GatsbyImage
                                    image={getImage(post.headerImage[0].localFile)}
                                    alt={post.title}
                                    className="post-card-image"
                                />
                            )
                            : (
                                <img
                                    src={`https://api.flotiq.com${post.headerImage[0].url}`}
                                    alt={post.title}
                                    className="post-card-image"
                                />
                            )) : null
                }
            </Link>
            <div className="mt-3">
                {post.tags && post.tags.map((tag) => (
                    <TagPill tag={tag} key={tag.id} />))}
            </div>
            <Link to={`/${post.slug}`} className="post-card-link">
                <h2 className="mt-3">{post.title}</h2>
                {showDescription && <div className="mt-3 post-card-description">{post.excerpt}</div>}
            </Link>
        </div>
        {post.content && typeof post.content === 'object' && (
            <Link to={`/${post.slug}`} className="post-card-link">
                <p className="mt-3 mb-3 reading-time">{getReadingTime(post.content.blocks)}</p>
            </Link>
        )}
    </div>
);

export default PostCard;
