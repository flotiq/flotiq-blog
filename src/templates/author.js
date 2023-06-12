import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import DiscoverMoreTopics from '../components/DiscoverMoreTopics/DiscoverMoreTopics';
import PostCard from '../components/PostCard/PostCard';
import Layout from '../layouts/layout';

const AuthorPage = ({ data, pageContext }) => {
    const author = data.flotiqBlogAuthor;
    const [url, setUrl] = useState('');
    useEffect(() => {
        setUrl(window.location.href.split('/?')[0]);
    }, []);
    return (
        <Layout>
            <Helmet>
                <html lang="en" />
                <title>
                    {author.name}
                    {' - '}
                    {data.allFlotiqMainSettings.nodes[0].title}
                </title>
                <meta name="description" content={author.bio} />
                <meta property="og:site_name" content={data.allFlotiqMainSettings.nodes[0].title} />
                <meta property="og:type" content="profile" />
                <meta property="og:title" content={`${author.name} - ${data.allFlotiqMainSettings.nodes[0].title}`} />
                <meta property="og:url" content={url} />
                {data.allFlotiqMainSettings.nodes[0].facebook_url && (
                    <meta property="article:publisher" content={data.allFlotiqMainSettings.nodes[0].facebook_url} />)}
                {data.allFlotiqMainSettings.nodes[0].facebook_url && (
                    <meta property="article:author" content={data.allFlotiqMainSettings.nodes[0].facebook_url} />)}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={`${author.name} - ${data.allFlotiqMainSettings.nodes[0].title}`} />
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
            <Container>
                <h1 className="text-center pt-4 pb-4">
                    <GatsbyImage alt={author.name} image={getImage(author.avatar[0].localFile)} className="mr-4" />
                    {author.name}
                </h1>
                <h4 className="text-center pb-4">
                    {author.bio}
                </h4>
            </Container>
            <Container fluid className="container-fluid__bigger-padding">
                <Row xs={1} sm={1} md={3} lg={3}>
                    {data.allFlotiqBlogPost.nodes.map((post) => (
                        <Col key={post.id}><PostCard post={post} /></Col>
                    ))}
                </Row>
                <DiscoverMoreTopics
                    tags={pageContext.tags}
                    primaryTag={{}}
                />
            </Container>
        </Layout>
    );
};

export default AuthorPage;

export const pageQuery = graphql`
    query($author: String) {
        flotiqBlogAuthor(slug: {eq: $author}) {
            bio
            id
            name
            slug
            avatar {
                localFile {
                    childImageSharp {
                        gatsbyImageData(width: 80)
                    }
                }
            }
        }
        allFlotiqBlogPost(
            sort: {fields: publish_date, order: DESC},
            limit: 2000,
            filter: {status: {eq: "public"}}
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
                excerpt
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
                    avatar {
                        extension
                        id
                    }
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
                facebook_url
                twitter_url
            }
        }
    }
`;
