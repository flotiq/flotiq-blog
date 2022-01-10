import React, { useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Row, Col, Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import * as queryString from 'query-string';
import PostCard from '../components/PostCard/PostCard';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../sections/Footer/Footer';
import CookieInfo from '../components/CookieInfo/CookieInfo';
import MadeInFlotiq from '../components/MadeInFlotiq/MadeInFlotiq';
import DiscoverMoreTopics from '../components/DiscoverMoreTopics/DiscoverMoreTopics';

const SearchPage = ({ location }) => {
    const siteMeta = useStaticQuery(query);
    const { q } = queryString.parse(location.search);
    const [posts, setPosts] = useState([]);
    let tags = {};
    siteMeta.allFlotiqBlogPost.nodes.forEach((node) => {
        node.tags.forEach((tag) => {
            tags[tag.tag] = tag;
        });
    });
    tags = Object.values(tags);
    useEffect(() => {
        fetch(`https://api.flotiq.com/api/v1/search?q=${q}`
            + '&fields%5B%5D=title^5&fields%5B%5D=content&page=1&limit=200'
            + '&content_type%5B%5D=flotiqBlogPost&filters%5Bstatus%5D=public'
            + `&auth_token=${siteMeta.site.siteMetadata.apiKey}`)
            .then((response) => response.json())
            .then((resultData) => {
                if (resultData.data) {
                    const ids = [];
                    resultData.data.forEach((data) => {
                        ids.push(data.item.id);
                    });
                    fetch('https://api.flotiq.com/api/v1/content/flotiqBlogPost?limit=200&hydrate=1'
                    + `&ids[]=${ids.join('&ids[]=')}&auth_token=${siteMeta.site.siteMetadata.apiKey}`)
                        .then((response) => response.json())
                        .then((resData) => {
                            if (resData.data) {
                                const tmpPosts = [];
                                ids.forEach((id) => {
                                    tmpPosts.push(resData.data.find((data) => data.id === id));
                                });
                                setPosts(tmpPosts);
                            }
                        });
                }
            });
    }, [q, siteMeta.site.siteMetadata.apiKey]);
    return (
        <main>
            <Helmet>
                <title>
                    Search results
                    {' - '}
                    {siteMeta.allFlotiqMainSettings.nodes[0].title}
                </title>
            </Helmet>
            <Navbar />
            <Container>
                <p className="text-center link-s text-gray">
                    Showing
                    {' '}
                    {posts.length}
                    {' '}
                    result
                    {posts.length > 1 && 's'}
                    {' '}
                    for
                </p>
                <h1 className="text-center mb-5 pb-5">{q}</h1>
            </Container>
            <Container fluid className="container-fluid__bigger-padding">
                <Row xs={1} sm={1} md={2} lg={3}>
                    {posts.map((post) => (
                        <Col key={post.id}>
                            <PostCard post={post} showDescription />
                        </Col>
                    ))}
                </Row>
                <DiscoverMoreTopics tags={tags} primaryTag={{}} />
            </Container>
            <Footer />
            <CookieInfo cookieText={siteMeta.allFlotiqMainSettings.nodes[0].cookie_policy_popup_text} />
            <MadeInFlotiq />
        </main>
    );
};

const query = graphql`
    query SearchQuery {
        site {
            siteMetadata {
                apiKey
            }
        }
        allFlotiqMainSettings {
            nodes {
                cookie_policy_popup_text
                title
            }
        }
        allFlotiqBlogPost(sort: {fields: publish_date, order: DESC}, limit: 10000) {
            nodes {
                tags {
                    id
                    tag
                    tag_name
                    description
                }
            }
        }
    }`;

export default SearchPage;
