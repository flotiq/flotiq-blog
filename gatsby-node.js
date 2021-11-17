const path = require('path');
const _ = require('lodash');

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await graphql(`
        query MainQuery {
            allFlotiqBlogPost(sort: {fields: flotiqInternal___updatedAt, order: DESC}, limit: 2000) {
                edges {
                    node {
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
                        id
                        slug
                        title
                        tags {
                            id
                            tag
                            description
                            image {
                                id
                                extension
                            }
                        }
                        headerImage {
                            extension
                            id
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
                }
                totalCount
            }
            allFlotiqBlogAuthor {
                edges {
                    node {
                        id
                        avatar {
                            extension
                            id
                        }
                        bio
                        name
                        slug
                    }
                }
            }
        }
    `);

    if (result.errors) {
        console.error(result.errors);
        throw new Error(result.errors);
    }

    // Create post pages
    const posts = result.data.allFlotiqBlogPost.edges;

    // Create paginated index
    const postsPerPage = 9;
    const numPages = Math.ceil(posts.length / postsPerPage);

    Array.from({ length: numPages }).forEach((item, i) => {
        createPage({
            path: i === 0 ? '/' : `/${i + 1}`,
            component: path.resolve('./src/templates/index.js'),
            context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages,
                currentPage: i + 1,
            },
        });
    });

    posts.forEach(({ node }, index) => {
        const { slug } = node;
        const prev = index === 0 ? null : posts[index - 1].node;
        const next = index === posts.length - 1 ? null : posts[index + 1].node;

        createPage({
            path: slug,
            component: path.resolve('./src/templates/post.js'),
            context: {
                // Data passed to context is available in page queries as GraphQL variables.
                slug,
                prev,
                next,
                primaryTag: (node.tags && node.tags[0]) ? node.tags[0].tag : '',
            },
        });
    });

    // Create tag pages
    const tagTemplate = path.resolve('./src/templates/tags.js');
    const tags = _.uniq(
        _.flatten(
            result.data.allFlotiqBlogPost.edges.map((edge) => _.castArray(_.get(edge, 'node.tags', []))),
        ),
    );
    tags.forEach((tag) => {
        createPage({
            path: `/tags/${tag.tag}/`,
            component: tagTemplate,
            context: {
                tag: tag.tag,
            },
        });
    });

    // Create author pages
    const authorTemplate = path.resolve('./src/templates/author.js');
    result.data.allFlotiqBlogAuthor.edges.forEach((edge) => {
        createPage({
            path: `/author/${_.kebabCase(edge.node.slug)}/`,
            component: authorTemplate,
            context: {
                author: edge.node.slug,
            },
        });
    });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
    // adds sourcemaps for tsx in dev mode
    if (stage === 'develop' || stage === 'develop-html') {
        actions.setWebpackConfig({
            devtool: 'eval-source-map',
        });
    }
};
