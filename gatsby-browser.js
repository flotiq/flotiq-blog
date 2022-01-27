require('@fontsource/inter');
require('@fontsource/inter/latin-200.css');
require('@fontsource/inter/latin-ext-200.css');
require('@fontsource/inter/latin-300.css');
require('@fontsource/inter/latin-ext-300.css');
require('@fontsource/inter/latin-400.css');
require('@fontsource/inter/latin-ext-400.css');
require('@fontsource/inter/latin-500.css');
require('@fontsource/inter/latin-ext-500.css');
require('@fontsource/inter/latin-700.css');
require('@fontsource/inter/latin-ext-700.css');
require('./src/style/app.scss');

exports.onInitialClientRender = () => {
    window.scrollTo(0, 0);
};

exports.shouldUpdateScroll = (prevRouterProps, { location }) => {
    window.scrollTo(0, 0);
    const body = document.getElementsByTagName('body')[0];
    body.scrollTop = 0;
    return false;
};
