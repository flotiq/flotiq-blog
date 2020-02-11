export interface WebsiteConfig {
  title: string;
  description: string;
  coverImage: string;
  logo: string;
  /**
   * Specifying a valid BCP 47 language helps screen readers announce text properly.
   * See: https://dequeuniversity.com/rules/axe/2.2/valid-lang
   */
  lang: string;
  /**
   * blog full path, no ending slash!
   */
  siteUrl: string;
  /**
   * full url, no username
   */
  facebook?: string;
  /**
   * full url, no username
   */
  youtube?: string;
  /**
   * full url, no username
   */
  twitter?: string;
  /**
   * full url, no username
   */
  github?: string;
  /**
   * hide or show all email subscribe boxes
   */
  showSubscribe: boolean;
  /**
   * create a list on mailchimp and then create an embeddable signup form. this is the form action
   */
  mailchimpAction?: string;
  /**
   * this is the hidden input field name
   */
  mailchimpName?: string;
  /**
   * name and id of the mailchimp email field
   */
  mailchimpEmailFieldName?: string;
  /**
  /**
   * Meta tag for Google Webmaster Tools
   */
  googleSiteVerification?: string;
  /**
  /**
   * Appears alongside the footer, after the credits
   */
  footer?: string;

    /**
     * Company logo - used for json+ld rich snippets
     */
    companyLogo?: string;

    /**
     * Company name - used for json+ld rich snippets
     */
    companyName?: string;
}

const config: WebsiteConfig = {
  title: 'CodeWave blog',
  description: 'CodeWave is a performance- and scalability-focused web development firm. We deliver custom software solutions and operate cloud-based infrastructure for clients across the globe - from startups to Fortune 500s.',
  coverImage: 'img/blog-cover.jpg',
  logo: 'img/logo_codewave_white_horizontal.svg',
  lang: 'en',
  siteUrl: 'https://codewave.eu/blog',
  github: 'https://github.com/cdwv',
  facebook: 'https://www.facebook.com/codewave.eu',
  twitter: 'https://twitter.com/code_wave',
    showSubscribe: false,
    footer: 'is based on Flotiq CMS',
    companyLogo: 'https://editor.flotiq.com/fonts/fq-logo.svg',
    companyName: 'Flotiq'

}

export default config;
