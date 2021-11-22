import React, { Fragment } from 'react';
import './TextContent.scss';
import { Container } from 'react-bootstrap';

const Header = ({ block }) => {
    switch (block.data.level) {
    case 1:
        return (
            <h1 className="text-content-header" dangerouslySetInnerHTML={{ __html: block.data.text }} />
        );
    case 2:
        return (
            <h2 className="text-content-header" dangerouslySetInnerHTML={{ __html: block.data.text }} />
        );
    case 3:
        return (
            <h3 className="text-content-header" dangerouslySetInnerHTML={{ __html: block.data.text }} />
        );
    case 4:
        return (
            <h4 className="text-content-header" dangerouslySetInnerHTML={{ __html: block.data.text }} />
        );
    case 5:
        return (
            <h5 className="text-content-header" dangerouslySetInnerHTML={{ __html: block.data.text }} />
        );
    case 6:
        return (
            <h6 className="text-content-header" dangerouslySetInnerHTML={{ __html: block.data.text }} />
        );
    default:
        return null;
    }
};

const Text = ({ block }) => (
    <p className="text-content-paragraph" dangerouslySetInnerHTML={{ __html: block.data.text }} />
);

const List = ({ block }) => {
    const children = block.items.map((item) => (
        <Fragment key={item.content}>
            <li dangerouslySetInnerHTML={{ __html: item.content }} />
            {item.items.length > 0 && <List block={{ items: item.items, style: block.style }} />}
        </Fragment>
    ));
    return block.style === 'ordered'
        ? <ol className="text-content-list">{children}</ol>
        : <ul className="text-content-list">{children}</ul>;
};

const Image = ({ block }) => (
    <div className="text-content-image pt-2 pb-2">
        <img
            src={block.url}
            alt={block.caption}
            className={block.stretched === 'true'
                ? 'text-content-image-image text-content-image-image__stretched'
                : 'text-content-image-image'}
        />
        <p className="text-content-image-caption pt-2">{block.caption}</p>
    </div>
);

const Quote = ({ block }) => (
    <div className="text-content-quote mt-2 mb-4">
        <p className="text-content-quote-quote text-m">{block.text}</p>
        <p className="text-content-quote-caption pt-4">{block.caption}</p>
    </div>
);

const YouTubeEmbed = ({ block }) => {
    const url = block.url.replace('/watch?v=', '/embed/');
    return (
        <iframe
            id="ytplayer"
            type="text/html"
            width="640"
            height="360"
            src={url}
            frameBorder="0"
            allowFullScreen
            title="Youtube video"
        />
    );
};

const TextContent = ({ content }) => (
    <Container className="text-content">
        {content.map((block) => {
            switch (block.type) {
            case 'header':
                return <Header block={block} key={block.id} />;
            case 'paragraph':
                return <Text block={block} key={block.id} />;
            case 'list':
                return <List block={block.data} key={block.id} />;
            case 'image':
                return <Image block={block.data} key={block.id} />;
            case 'quote':
                return <Quote block={block.data} key={block.id} />;
            case 'youtubeEmbed':
                return <YouTubeEmbed block={block.data} key={block.id} />;
            default:
                return null;
            }
        })}
    </Container>
);

export default TextContent;
