import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { Col, Container, Row } from 'react-bootstrap';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../sections/Footer/Footer';
import CookieInfo from '../components/CookieInfo/CookieInfo';
import MadeInFlotiq from '../components/MadeInFlotiq/MadeInFlotiq';
import PostCard from '../components/PostCard/PostCard';
import Button from '../components/Button/Button';
import DiscoverMoreTopics from '../components/DiscoverMoreTopics/DiscoverMoreTopics';

const AuthorPage = ({ data, pageContext }) => {
    const author = data.flotiqBlogAuthor;
    return (
        <main>
            <Helmet>
                <title>
                    {author.name}
                    {' - '}
                    {data.allFlotiqMainSettings.nodes[0].title}
                </title>
            </Helmet>
            <Navbar />
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
                <DiscoverMoreTopics tags={pageContext.tags} primaryTag={{}} />
            </Container>
            <Footer />
            <CookieInfo cookieText={data.allFlotiqMainSettings.nodes[0].cookie_policy_popup_text} />
            <MadeInFlotiq />
        </main>
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
            }
        }
    }
`;
