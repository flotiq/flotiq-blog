import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import PostCard from '../components/PostCard/PostCard';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../sections/Footer/Footer';
import CookieInfo from '../components/CookieInfo/CookieInfo';
import MadeInFlotiq from '../components/MadeInFlotiq/MadeInFlotiq';
import DiscoverMoreTopics from '../components/DiscoverMoreTopics/DiscoverMoreTopics';

const TagsPage = ({ data, pageContext }) => {
    const tag = (pageContext.tag) ? pageContext.tag : '';
    const tagData = data.allFlotiqBlogTag.edges.find(
        (n) => n.node.tag.toLowerCase() === tag.toLowerCase(),
    ).node;
    const [url, setUrl] = useState('');
    useEffect(() => {
        setUrl(window.location.href.split('/?')[0]);
    }, []);
    return (
        <main>
            <Helmet>
                <html lang="en" />
                <title>
                    {tagData.tag_name}
                    {' - '}
                    {data.allFlotiqMainSettings.nodes[0].title}
                </title>
                <meta name="description" content={tagData.description} />
                <meta property="og:site_name" content={data.allFlotiqMainSettings.nodes[0].title} />
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content={`${tagData.tag_name} - ${data.allFlotiqMainSettings.nodes[0].title}`}
                />
                <meta property="og:url" content={url} />
                {data.allFlotiqMainSettings.nodes[0].facebook_url && (
                    <meta property="article:publisher" content={data.allFlotiqMainSettings.nodes[0].facebook_url} />)}
                {data.allFlotiqMainSettings.nodes[0].facebook_url && (
                    <meta property="article:author" content={data.allFlotiqMainSettings.nodes[0].facebook_url} />)}
                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:title"
                    content={`${tagData.tag_name} - ${data.allFlotiqMainSettings.nodes[0].title}`}
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
            <Navbar />
            <Container>
                <h1 className="text-center pt-4 pb-4">{tagData.tag_name}</h1>
                <h4 className="text-center pb-4">
                    {tagData.description}
                </h4>
            </Container>
            <Container fluid className="container-fluid__bigger-padding">
                <Row xs={1} sm={1} md={3} lg={3}>
                    {data.allFlotiqBlogPost.nodes.map((post) => (
                        <Col key={post.id}><PostCard post={post} /></Col>
                    ))}
                </Row>
                <DiscoverMoreTopics tags={pageContext.tags} primaryTag={tagData} />
            </Container>
            <Footer />
            <CookieInfo cookieText={data.allFlotiqMainSettings.nodes[0].cookie_policy_popup_text} />
            <MadeInFlotiq />
        </main>
    );
};

export default TagsPage;

export const pageQuery = graphql`
    query($tag: String) {
        allFlotiqBlogTag {
            edges {
                node {
                    description
                    id
                    tag
                    tag_name
                }
            }
        }
        allFlotiqBlogPost(
            limit: 2000,
            sort: {fields: [publish_date], order: DESC},
            filter: {
                tags: {elemMatch: {tag: {eq: $tag}}},
                status: {eq: "public"}}
        ) {
            nodes {
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
                id
                slug
                title
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
                    bio
                }
                flotiqInternal {
                    createdAt
                }
            }
            totalCount
        }
        allFlotiqMainSettings {
            nodes {
                cookie_policy_popup_text
                title
            }
        }
    }
`;
