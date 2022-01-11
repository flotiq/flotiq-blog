// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    pathPrefix: '/blog',
    siteMetadata: {
        title: 'Flotiq',
        description: 'Effortless headless CMS',
        siteUrl: 'https://flotiq.com', // full path to blog - no ending slash
        apiKey: process.env.SCOPED_FLOTIQ_API_KEY,
        pathPrefix: process.env.NODE_ENV === 'production' ? '/blog' : '',
    },
    plugins: [
        'gatsby-plugin-sass',
        {
            resolve: 'gatsby-plugin-google-analytics',
            options: {
                trackingId: process.env.GA_TRACKING_ID || '',
                // Puts tracking script in the head instead of the body
                head: true,
                // IP anonymization for GDPR compliance
                anonymize: true,
                // Disable analytics for users with `Do Not Track` enabled
                respectDNT: true,
                // Avoids sending pageview hits from custom paths
                exclude: ['/preview/**'],
                // Specifies what percentage of users should be tracked
                sampleRate: 100,
                // Determines how often site speed tracking beacons will be sent
                siteSpeedSampleRate: 10,
            },
        },
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sitemap',
        {
            resolve: 'gatsby-source-flotiq',
            options: {
                authToken: process.env.FLOTIQ_API_KEY,
                timeout: 30000,
                downloadMediaFile: true,
                forceReload: true,
                includeTypes: [
                    '_media',
                    'flotiq_main_settings',
                    'static_pages',
                    'flotiqBlogAuthor',
                    'flotiqBlogPost',
                    'flotiqBlogTag',
                    'features',
                ],
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'placeholder',
                path: `${__dirname}/gatsby-config.js`,
            },
        },
        'gatsby-plugin-image',
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                host: 'https://flotiq.com',
                sitemap: 'https://flotiq.com/blog/sitemap.xml',
                policy: [{ userAgent: '*', allow: '/' }],
            },
        },
        {
            resolve: 'gatsby-plugin-hotjar',
            options: {
                includeInDevelopment: false, // optional parameter to include script in development
                id: 2524177,
                sv: 6,
            },
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                icon: 'src/assets/favicons/favicon-32x32.png',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: 'src/assets/favicons/favicon-92x92.png',
                        sizes: '92x92',
                        type: 'image/png',
                    },
                    {
                        src: 'src/assets/favicons/favicon-32x32.png',
                        sizes: '32x32',
                        type: 'image/png',
                    },
                    {
                        src: 'src/assets/favicons/android-icon-36x36.png',
                        sizes: '36x36',
                        type: 'image/png',
                    },
                    {
                        src: 'src/assets/favicons/android-icon-48x48.png',
                        sizes: '48x48',
                        type: 'image/png',
                    },
                    {
                        src: 'src/assets/favicons/apple-icon-57x57.png',
                        sizes: '57x57',
                        type: 'image/png',
                    },
                    {
                        src: 'src/assets/favicons/apple-icon-60x60.png',
                        sizes: '60x60',
                        type: 'image/png',
                    },
                    {
                        src: 'src/assets/favicons/android-icon-72x72.png',
                        sizes: '72x72',
                        type: 'image/png',
                    },
                    {
                        src: 'src/assets/favicons/apple-icon-76x76.png',
                        sizes: '76x76',
                        type: 'image/png',
                    },
                    {
                        src: 'src/assets/favicons/android-icon-96x96.png',
                        sizes: '96x96',
                        type: 'image/png',
                    },
                    {
                        src: 'src/assets/favicons/apple-icon-114x114.png',
                        sizes: '114x114',
                        type: 'image/png',
                    },
                    {
                        src: 'src/assets/favicons/apple-icon-120x120.png',
                        sizes: '120x120',
                        type: 'image/png',
                    },
                    {
                        src: 'src/assets/favicons/android-icon-144x144.png',
                        sizes: '144x144',
                        type: 'image/png',
                    },
                    {
                        src: 'src/assets/favicons/apple-icon-152x152.png',
                        sizes: '152x152',
                        type: 'image/png',
                    },
                    {
                        src: 'src/assets/favicons/apple-icon-180x180.png',
                        sizes: '180x180',
                        type: 'image/png',
                    },
                    {
                        src: 'src/assets/favicons/android-icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                ],
            },
        },
        {
            resolve: 'gatsby-plugin-disqus',
            options: {
                shortname: 'flotiq',
            },
        },
    ],
};
