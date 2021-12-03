import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { Row, Col, Container } from 'react-bootstrap';
import Navbar from '../components/Navbar/Navbar';
import CookieInfo from '../components/CookieInfo/CookieInfo';
import Footer from '../sections/Footer/Footer';
import MadeInFlotiq from '../components/MadeInFlotiq/MadeInFlotiq';
import PostCard from '../components/PostCard/PostCard';
import JoinNewsletter from '../components/JoinNewsletter/JoinNewsletter';
import Pagination from '../components/Pagination/Pagination';
import FlotiqPlatform from '../sections/FlotiqPlatform/FlotiqPlatform';

const IndexPage = ({ data, pageContext }) => {
    const posts = data.allFlotiqBlogPost.nodes;
    const skip = pageContext.currentPage === 1 ? 3 : 0;
    return (
        <main>
            <Helmet>
                <html lang="en" />
                <title>
                    Blog
                    {' - '}
                    {data.allFlotiqMainSettings.nodes[0].title}
                </title>
                <meta name="description" content={data.allFlotiqMainSettings.nodes[0].description} />
                <meta property="og:site_name" content={data.allFlotiqMainSettings.nodes[0].title} />
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content={`Blog - ${data.allFlotiqMainSettings.nodes[0].title}`}
                />
                <meta property="og:url" content={window.location.href} />
                {data.allFlotiqMainSettings.nodes[0].facebook_url && (
                    <meta property="article:publisher" content={data.allFlotiqMainSettings.nodes[0].facebook_url} />)}
                {data.allFlotiqMainSettings.nodes[0].facebook_url && (
                    <meta property="article:author" content={data.allFlotiqMainSettings.nodes[0].facebook_url} />)}
                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:title"
                    content={`Blog - ${data.allFlotiqMainSettings.nodes[0].title}`}
                />
                <meta name="twitter:url" content={window.location.href} />
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
            <Navbar />
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
                                <PostCard post={posts[1]} key={posts[1].id} additionalClass="post-card__no-height" />
                                <PostCard post={posts[2]} key={posts[2].id} additionalClass="post-card__no-height" />
                            </Col>
                        </Row>
                        <Row className="pt-5 pb-5 mb-5">
                            <JoinNewsletter />
                        </Row>
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
                    <Row className="pt-5 pb-5 mb-5">
                        <JoinNewsletter />
                    </Row>
                )}
                <Pagination page={pageContext.currentPage} numOfPages={pageContext.numPages} />
            </Container>
            <FlotiqPlatform />
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
                description
                facebook_url
                twitter_url
            }
        }
    }
`;
