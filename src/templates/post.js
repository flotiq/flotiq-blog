import { graphql, Link } from 'gatsby';
import { CommentCount, Disqus } from 'gatsby-plugin-disqus';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import Sygnet from '../assets/sygnet.svg';

import Navbar from '../components/Navbar/Navbar';
import CookieInfo from '../components/CookieInfo/CookieInfo';
import JoinNewsletter from '../components/JoinNewsletter/JoinNewsletter';
import DiscoverMoreTopics from '../components/DiscoverMoreTopics/DiscoverMoreTopics';
import MadeWithFlotiq from '../components/MadeWithFlotiq/MadeWithFlotiq';
import PostCard from '../components/PostCard/PostCard';
import SharePostButtons from '../components/SharePostButtons/SharePostButtons';
import TagPill from '../components/TagPill/TagPill';
import { getReadingTime } from '../helpers/readingTime';
import Footer from '../sections/Footer/Footer';
import TextContent from '../sections/TextContent/TextContent';

const PostPage = ({ data, pageContext }) => {
    const post = data.flotiqBlogPost;
    const [offset, setOffset] = useState(0);
    const [visible, setVisible] = useState(false);
    const [progressBar, setProgressBar] = useState(0);
    const [progressHeight, setProgressHeight] = useState(0);
    const progress = useRef(0);
    const [url, setUrl] = useState('');
    const [origin, setOrigin] = useState('');
    useEffect(() => {
        setUrl(window.location.href.split('/?')[0]);
        setOrigin(window.location.origin);
    }, []);

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
    if (!post) {
        return (<div>NO DATA</div>);
    }
    const disqusConfig = {
        url: `${data.site.siteMetadata.siteUrl}/${post.slug}`,
        identifier: post.slug,
        title: post.title,
    };
    return (
        <main>
            <Helmet>
                <html lang="en" />
                <title>
                    {post.title}
                    {' - '}
                    {data.allFlotiqMainSettings.nodes[0].title}
                </title>
                <meta name="description" content={post.metaDescription} />
                <meta property="og:site_name" content={data.allFlotiqMainSettings.nodes[0].title} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={`${post.title} - ${data.allFlotiqMainSettings.nodes[0].title}`} />
                <meta property="og:description" content={post.metaDescription} />
                <meta property="og:url" content={url} />
                {(post.headerImage) && (
                    <meta
                        property="og:image"
                        content={origin + post.headerImage[0].localFile.publicURL}
                    />
                )}
                <meta property="article:published_time" content={post.publish_date} />
                {post.tags && (
                    <meta property="article:tag" content={post.tags[0].tag_name} />
                )}

                {data.allFlotiqMainSettings.nodes[0].facebook_url && (
                    <meta property="article:publisher" content={data.allFlotiqMainSettings.nodes[0].facebook_url} />)}
                {data.allFlotiqMainSettings.nodes[0].facebook_url && (
                    <meta property="article:author" content={data.allFlotiqMainSettings.nodes[0].facebook_url} />)}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${post.title} - ${data.allFlotiqMainSettings.nodes[0].title}`} />
                <meta name="twitter:description" content={post.metaDescription} />
                <meta name="twitter:url" content={url} />
                {(post.headerImage) && (
                    <meta
                        name="twitter:image"
                        content={origin + post.headerImage[0].localFile.publicURL}
                    />
                )}
                <meta name="twitter:label1" content="Written by" />
                <meta name="twitter:data1" content={post.author[0].name} />
                <meta name="twitter:label2" content="Filed under" />
                {post.tags && <meta name="twitter:data2" content={post.tags[0].tag} />}
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
                {post.headerImage[0] && <meta property="og:image:width" content={post.headerImage[0].width} />}
                {post.headerImage[0] && <meta property="og:image:height" content={post.headerImage[0].height} />}
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
                    <h1 className="text-center px-0 px-sm-3 px-md-5">{post.title}</h1>
                    <div className="text-center py-4">
                        {post.tags.map((tag) => (
                            <TagPill tag={tag} key={tag.id} />))}
                    </div>
                    <h4 className="text-center pb-4 pb-sm-5">{post.excerpt}</h4>
                    <div className="author-box pb-4 pb-sm-5">
                        <span className="reading-time">{getReadingTime(post.content.blocks)}</span>
                        <GatsbyImage
                            alt={post.author[0].name}
                            image={getImage(post.author[0].avatar[0].localFile)}
                            className="author-box-image"
                        />
                        <span>
                            By
                            {' '}
                            <Link to={`/author/${post.author[0].slug}`}>{post.author[0].name}</Link>
                        </span>
                    </div>
                    <div className="pt-3 pb-4 pb-sm-5">
                        <GatsbyImage
                            alt={post.title}
                            image={getImage(post.headerImage[0].localFile)}
                            className="post-image"
                        />
                    </div>
                    <Row>
                        <Col lg={1} md={1} sm={0} xs={0}>
                            <div className="floating-socials d-none d-md-block">
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
                        <div className="my-5 pb-5">
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
                        <div className="related-posts">
                            <Row xs={1} sm={1} md={3} lg={3}>
                                {data.relatedPostsFromTags.nodes.map((relatedPost) => (
                                    <Col key={relatedPost.id}><PostCard post={relatedPost} /></Col>
                                ))}
                            </Row>
                        </div>
                    </>
                )}
                <DiscoverMoreTopics tags={pageContext.tags} primaryTag={pageContext.primaryTag} />
            </Container>
            <Footer />
            <CookieInfo cookieText={data.allFlotiqMainSettings.nodes[0].cookie_policy_popup_text} />
            <MadeWithFlotiq />
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
                        code
                        content
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
                        withHeadings
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
                width
                height
                localFile {
                    publicURL
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
                facebook_url
                twitter_url
            }
        }
    }
`;
