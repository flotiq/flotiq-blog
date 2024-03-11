import { graphql } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import JoinNewsletter from '../components/JoinNewsletter/JoinNewsletter';
import Pagination from '../components/Pagination/Pagination';
import PostCard from '../components/PostCard/PostCard';
import Layout from '../layouts/layout';
import FlotiqPlatform from '../sections/FlotiqPlatform/FlotiqPlatform';

const IndexPage = ({ data, pageContext }) => {
    const posts = data.allFlotiqBlogPost.nodes;
    const siteMeta = data.site.siteMetadata;
    const skip = pageContext.currentPage === 1 ? 3 : 0;
    const [url, setUrl] = useState('');
    useEffect(() => {
        setUrl(window.location.href.split('/?')[0]);
    }, []);
    return (
        <Layout>
            <Helmet>
                <html lang="en" />
                <title>
                    Flotiq - API first headless CMS | Blog for developers and content editors
                </title>
                <meta
                    name="description"
                    content={'The Flotiq\'s blog helps developers and content editors to simplify workflow and create '
                        + `effortless experience${pageContext.currentPage > 1
                            ? ` - Page ${pageContext.currentPage}` : ''}`}
                />
                {pageContext.currentPage > 1 && (
                    <link
                        rel="prev"
                        href={pageContext.currentPage > 2 ? `${siteMeta.siteUrl}${siteMeta.pathPrefix}/${pageContext.currentPage - 1}` : `${siteMeta.siteUrl}${siteMeta.pathPrefix}/`}
                    />
                )}
                {pageContext.currentPage + 1 < pageContext.numPages && (
                    <link
                        rel="next"
                        href={`${siteMeta.siteUrl}${siteMeta.pathPrefix}/${pageContext.currentPage + 1}`}
                    />
                )}
                <meta property="og:site_name" content={data.allFlotiqMainSettings.nodes[0].title} />
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="Flotiq - API first headless CMS | Blog for developers and content editors"
                />
                <meta property="og:url" content={url} />
                {data.allFlotiqMainSettings.nodes[0].facebook_url && (
                    <meta property="article:publisher" content={data.allFlotiqMainSettings.nodes[0].facebook_url} />)}
                {data.allFlotiqMainSettings.nodes[0].facebook_url && (
                    <meta property="article:author" content={data.allFlotiqMainSettings.nodes[0].facebook_url} />)}
                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:title"
                    content="Flotiq - API first headless CMS | Blog for developers and content editors"
                />
                <meta name="twitter:url" content={url} />
                {data.allFlotiqMainSettings.nodes[0].twitter_url
                && (
                    <meta
                        name="twitter:site"
                        content={`@${data.allFlotiqMainSettings.nodes[0].twitter_url.split('https://twitter.com/')[1]}`}
                    />
                )}
                {data.allFlotiqMainSettings.nodes[0].twitter_url && (
                    <meta
                        name="twitter:creator"
                        content={`@${data.allFlotiqMainSettings.nodes[0].twitter_url.split('https://twitter.com/')[1]}`}
                    />
                )}
            </Helmet>
            <Container fluid className="container-fluid__bigger-padding mt-5">
                {pageContext.currentPage === 1 && (
                    <>
                        <Row>
                            <Col lg={8} md={8} sm={12} sx={12}>
                                <PostCard
                                    post={posts[0]}
                                    key={posts[0].id}
                                    showDescription
                                    additionalClass="post-card__no-height"
                                />
                            </Col>
                            <Col>
                                <PostCard
                                    post={posts[1]}
                                    key={posts[1].id}
                                    additionalClass="post-card__no-height"
                                />
                                <PostCard
                                    post={posts[2]}
                                    key={posts[2].id}
                                    additionalClass="post-card__no-height"
                                />
                            </Col>
                        </Row>
                        <JoinNewsletter addMargin />
                    </>
                )}
                <Row xs={1} sm={1} md={2} lg={3}>
                    {posts.map((post, index) => (index >= skip ? (
                        <Col key={post.id}>
                            <PostCard post={post} />
                        </Col>
                    ) : null))}
                </Row>
                {pageContext.currentPage !== 1 && (
                    <JoinNewsletter addMargin />
                )}
                <Pagination page={pageContext.currentPage} numOfPages={pageContext.numPages} />
            </Container>
            <FlotiqPlatform />
        </Layout>
    );
};

export default IndexPage;

export const pageQuery = graphql`
    query blogPageQuery($skip: Int!, $limit: Int!) {
        allFlotiqBlogPost(
            sort: { publish_date: DESC },
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
                            code
                            content
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
                            gatsbyImageData(layout: FULL_WIDTH)
                        }
                    }
                }
                author {
                    id
                    name
                    slug
                    bio
                }
            }
        }
        allFlotiqMainSettings {
            nodes {
                cookie_policy_popup_text
                title
                description
                facebook_url
                twitter_url
            }
        }
        site {
            siteMetadata {
                siteUrl
                pathPrefix
            }
        }
    }
`;
