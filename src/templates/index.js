import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { Container } from 'react-bootstrap';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Navbar from '../components/Navbar/Navbar';
import CookieInfo from '../components/CookieInfo/CookieInfo';
import Footer from '../sections/Footer/Footer';
import { getReadingTime } from '../helpers/readingTime';
import MadeInFlotiq from '../components/MadeInFlotiq/MadeInFlotiq';

const IndexPage = ({ data }) => {
    const posts = data.allFlotiqBlogPost.nodes;
    return (
        <main>
            <Helmet>
                <title>
                    Blog
                    {' - '}
                    {data.allFlotiqMainSettings.nodes[0].title}
                </title>
            </Helmet>
            <Navbar />
            <Container fluid>
                {posts.map((post) => (
                    <div onClick={() => { window.location.href = `/${post.slug}`; }}>
                        {
                            post.headerImage[0].extension !== 'svg'
                                ? <GatsbyImage image={getImage(post.headerImage[0].localFile)} alt={post.title} />
                                : <img src={`https://api.flotiq.com${post.headerImage[0].url}`} alt={post.title} />
                        }
                        {post.tags.map((tag) => (
                            <a href={`/tags/${tag.tag}`}>{tag.tag_name}</a>))}
                        <h2>{post.title}</h2>
                        <span>{getReadingTime(post.content.blocks)}</span>
                    </div>
                ))}
            </Container>
            <Footer />
            <CookieInfo cookieText={data.allFlotiqMainSettings.nodes[0].cookie_policy_popup_text} />
            <MadeInFlotiq />
        </main>
    );
};

export default IndexPage;

export const pageQuery = graphql`
    query blogPageQuery($skip: Int!, $limit: Int!) {
        allFlotiqBlogPost(
            sort: { fields: [publish_date], order: DESC },
            limit: $limit,
            skip: $skip,
            filter: {status: {eq: "public"}}
        ) {
            nodes {
                id
                slug
                title
                excerpt
                publish_date
                content {
                    blocks {
                        data {
                            caption
                            items {
                                content
                                items {
                                    content
                                    items {
                                        content
                                    }
                                }
                            }
                            message
                            text
                            title
                        }
                    }
                }
                tags {
                    id
                    tag
                    tag_name
                }
                headerImage {
                    extension
                    url
                    localFile {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                }
                author {
                    id
                    name
                    slug
                    avatar {
                        extension
                        id
                    }
                    bio
                }
            }
        }
        allFlotiqMainSettings {
            nodes {
                cookie_policy_popup_text
                title
            }
        }
    }
`;
