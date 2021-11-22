import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { graphql } from 'gatsby';
import { Row, Col, Container } from 'react-bootstrap';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Helmet } from 'react-helmet';
import { Disqus, CommentCount } from 'gatsby-plugin-disqus';
import { getReadingTime } from '../helpers/readingTime';
import TextContent from '../sections/TextContent/TextContent';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../sections/Footer/Footer';
import CookieInfo from '../components/CookieInfo/CookieInfo';
import MadeInFlotiq from '../components/MadeInFlotiq/MadeInFlotiq';
import PostCard from '../components/PostCard/PostCard';
import TagPill from '../components/TagPill/TagPill';
import JoinNewsletter from '../components/JoinNewsletter/JoinNewsletter';
import SharePostButtons from '../components/SharePostButtons/SharePostButtons';
import DiscoverMoreTopics from '../components/DiscoverMoreTopics/DiscoverMoreTopics';
import Sygnet from '../assets/sygnet.svg';

const PostPage = ({ data, pageContext }) => {
    const post = data.flotiqBlogPost;
    const disqusConfig = {
        url: `${data.site.siteMetadata.siteUrl}/${post.slug}`,
        identifier: post.slug,
        title: post.title,
    };
    const [offset, setOffset] = useState(0);
    const [visible, setVisible] = useState(false);
    const [progressBar, setProgressBar] = useState(0);
    const [progressHeight, setProgressHeight] = useState(0);
    const progress = useRef(0);

    useEffect(() => {
        window.onscroll = () => {
            setOffset(window.pageYOffset);
        };
    }, []);

    useEffect(() => {
        const height = progress.current.clientHeight;
        if (offset > progress.current.offsetTop) {
            setVisible(true);
            setProgressHeight(progress.current.offsetTop);
        } else {
            setVisible(false);
            setProgressHeight(0);
        }
        const width = (offset / height) * 100;
        setProgressBar(width <= 100 ? width : 100);
    }, [offset]);
    return (
        <main>
            <Helmet>
                <title>
                    {post.title}
                    {' - '}
                    {data.allFlotiqMainSettings.nodes[0].title}
                </title>
            </Helmet>
            <Navbar />
            <div ref={progress}>
                <Container
                    fluid
                    className="post-reading"
                    style={{ opacity: visible ? 1 : 0, height: `${progressHeight}px` }}
                >
                    <div className="post-reading-content">
                        <img src={Sygnet} alt="Flotiq" />
                        <div>
                            <p><strong>{post.title}</strong></p>
                            <span className="reading-time">{getReadingTime(post.content.blocks)}</span>
                        </div>
                    </div>
                    <div className="post-reading-progress" style={{ width: `${progressBar}%` }} />
                </Container>
                <Container>
                    <p className="text-center post-date pt-4 pb-4">
                        {moment(post.publish_date).format('DD MMM YYYY') }
                    </p>
                    <h1 className="text-center pr-5 pl-5">{post.title}</h1>
                    <div className="text-center pt-4 pb-4">
                        {post.tags.map((tag) => (
                            <TagPill tag={tag} key={tag.id} />))}
                    </div>
                    <h4 className="text-center pb-5">{post.excerpt}</h4>
                    <div className="author-box pb-5">
                        <span className="reading-time">{getReadingTime(post.content.blocks)}</span>
                        <GatsbyImage
                            alt={post.author[0].name}
                            image={getImage(post.author[0].avatar[0].localFile)}
                            className="author-box-image"
                        />
                        <span>
                            By
                            {' '}
                            <a href={`/author/${post.author[0].slug}`}>{post.author[0].name}</a>
                        </span>
                    </div>
                    <div className="pt-3 pb-5">
                        <GatsbyImage
                            alt={post.title}
                            image={getImage(post.headerImage[0].localFile)}
                            className="post-image"
                        />
                    </div>
                    <Row>
                        <Col lg={1} md={1} sm={0} xs={0}>
                            <div className="floating-socials d-md-block d-lg-block d-sm-none d-xs-none">
                                <SharePostButtons />
                            </div>
                        </Col>
                        <Col>
                            <TextContent content={post.content.blocks} />
                        </Col>
                        <Col lg={1} md={1} sm={0} xs={0} />
                    </Row>
                </Container>
            </div>
            <Container>
                <Row>
                    <Col lg={1} md={1} sm={0} xs={0} />
                    <Col>
                        <div className="mt-5 mb-3 text-center">
                            <p className="link-s bottom-socials-title">Share this article</p>
                            <div className="bottom-socials">
                                <SharePostButtons />
                            </div>
                        </div>
                        <div className="mt-5 pb-5 mb-5">
                            <CommentCount config={disqusConfig} placeholder="..." />
                            <Disqus config={disqusConfig} />
                        </div>
                    </Col>
                    <Col lg={1} md={1} sm={0} xs={0} />
                </Row>
            </Container>
            <Container fluid className="container-fluid__bigger-padding">
                {data.relatedPostsFromTags.nodes.length > 0 && (
                    <>
                        <h4 className="related mb-4">
                            <strong>
                                Posts related to
                                {' '}
                                <a href={`/tags/${post.tags[0].tag}`}>{post.tags[0].tag_name}</a>
                            </strong>
                            <a href={`/tags/${post.tags[0].tag}`} className="see-all">See all</a>
                        </h4>
                        <Row xs={1} sm={1} md={3} lg={3}>
                            {data.relatedPostsFromTags.nodes.map((relatedPost) => (
                                <Col key={relatedPost.id}><PostCard post={relatedPost} /></Col>
                            ))}
                        </Row>
                    </>
                )}
                <DiscoverMoreTopics tags={pageContext.tags} primaryTag={pageContext.primaryTag} />
            </Container>
            <Footer />
            <CookieInfo cookieText={data.allFlotiqMainSettings.nodes[0].cookie_policy_popup_text} />
            <MadeInFlotiq />
            <div className="join-newsletter-floating">
                <JoinNewsletter />
            </div>
        </main>
    );
};

export default PostPage;

export const query = graphql`
    query($slug: String, $primaryTag: String) {
        site {
            siteMetadata {
                siteUrl
            }
        }
        flotiqBlogPost( slug: { eq: $slug }, status: {eq: "public"} ) {
            excerpt
            title
            publish_date
            content {
                blocks {
                    data {
                        alignment
                        anchor
                        caption
                        extension
                        fileName
                        height
                        items {
                            content
                            items {
                                content
                                items {
                                    content
                                }
                            }
                        }
                        level
                        message
                        stretched
                        style
                        text
                        title
                        url
                        width
                        withBackground
                        withBorder
                    }
                    tunes {
                        alignmentTuneTool {
                            alignment
                        }
                    }
                    id
                    type
                }
            }
            metaDescription
            flotiqInternal {
                createdAt
                updatedAt
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
                bio
                slug
                avatar {
                    extension
                    url
                    localFile {
                        childImageSharp {
                            gatsbyImageData(width: 40)
                        }
                    }
                }
            }
        }
        relatedPostsFromTags: allFlotiqBlogPost(
            filter:{tags: {elemMatch: {tag: {eq:  $primaryTag } } }, status: {eq: "public"}, slug: {ne: $slug} }
            limit: 3
        ) {
            totalCount
            nodes {
                id
                excerpt
                title
                slug
                headerImage {
                    extension
                    url
                    localFile {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                }
                tags {
                    id
                    tag
                    tag_name
                    description
                }
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
