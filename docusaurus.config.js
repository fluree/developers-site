const lightCodeTheme = require('prism-react-renderer/themes/okaidia');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
	title: 'Fluree Developers',
	tagline: 'Semantic graph data management system built with web3 tech',
	url: 'https://developers.flur.ee',
	baseUrl: '/',
	trailingSlash: true,
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'throw',
	favicon: 'img/favicon.ico',
	organizationName: 'fluree', 		// GitHub org name.
	projectName: 'developers-site', 		// Repo name.
	/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
	themeConfig: {
		image: './static/img/Dark Stacked.png',
		colorMode: {
			// light | dark
			defaultMode: 'light',

			// remove default sun-moon icons for dark mode switch
			switchConfig: {
				darkIcon: ' ',
				lightIcon: ' '
			}
		},
		navbar: {
			// title: 'Fluree',
			hideOnScroll: true,
			// Main logo which links to fluree marketing site
			logo: {
				alt: 'Fluree Yeti Logo',
				src: 'img/Dark Horizontal.svg',
				srcDark: 'img/White Horizontal.svg',
				href: 'https://flur.ee',
			},

			// Navbar links - left aligned
			items: [
				{
					// Home Link
					label: '/docs',
					to: '/',
					position: 'left',
					className: 'navbar-home-link'
				},
				{
					type: 'doc',
					docId: 'overview/about',
					position: 'left',
					label: 'Overview',
				},
				{
					to: '/guides',
					docId: 'guides/guides',
					type: 'doc',
					position: 'left',
					label: 'Guides'
				},
				{
					to: '/refence',
					docId: 'reference/reference',
					type: 'doc',
					position: 'left',
					label: 'Reference'
				},
				{
					to: '/concepts',
					docId: 'concepts/concepts',
					type: 'doc',
					position: 'left',
					label: 'Concepts'
				},
				{
					to: 'community/',
					label: 'Community',
					position: 'left'
				},

				// Docusaurus template stuff
				// { to: '/blog', label: 'Blog', position: 'left' },

				// Navbar links - right aligned
				{
					href: 'https://github.com/fluree/developers-site',
					className: 'header-github-link',
					position: 'right',
					'aria-label': 'Github repository'
				},
			],
		},
		// Config for collapsing sidebar
		hideableSidebar: true,
		footer: {
			style: 'dark',
			logo: {
				alt: 'Fluree Yeti Logo',
				src: 'img/White Horizontal.svg',
				href: 'https://flur.ee'
			},
			copyright: `
				Copyright © ${new Date().getFullYear()} Fluree, PBC. 
				Built with Docusaurus, Diataxis, and ♥️.
			`,
			links: [
				{
					title: 'Docs',
					items: [
						{
							label: 'Get Started',
							to: 'docs/overview/getting_started',
						},
						{
							label: 'Guides',
							to: 'docs/guides/guides',
						},
						{
							label: 'Tools',
							to: '/docs/guides/tools',
						},
						{
							label: 'Dev Hub',
							to: '/docs/overview/demos/developer-hub'
						},
					],
				},
				{
					title: 'Community',
					items: [
						{
							label: 'Forum',
							href: 'https://github.com/fluree/db/discussions'
						},
						{
							label: 'Slack',
							href: 'https://launchpass.com/flureedb',
						},
						{
							label: 'Twitter',
							href: 'https://twitter.com/flureepbc',
						},
						{
							label: 'r/Fluree',
							href: 'https://reddit.com/r/Fluree'
						},
					],
				},
				{
					title: 'Media',
					items: [
						{
							label: 'Blog',
							href: 'https://flur.ee/blog'
						},
						{
							label: 'YouTube',
							href: 'https://youtube.com/c/fluree'
						},
						{
							label: 'Dev.to',
							href: 'https://dev.to/fluree'
						},
						{
							label: 'Github',
							href: 'https://github.com/fluree',
						},
					],
				},
			],
		},
		// Config for themeing syntax highlighting
		prism: {
			theme: lightCodeTheme,
			darkTheme: darkCodeTheme,
			additionalLanguages: ['turtle', 'sparql', 'clojure', 'http', 'xml-doc']
		},
		algolia: {
			apiKey: 'ddaedd196fe7a6c9072a37b94a11aa13',
			appId: 'N3MISUHO2H',
			indexName: 'prod_dev_site'
		},
		gtag: {
			// You can also use your "G-" Measurement ID here.
			trackingID: 'G-XDLKYE388T',
			// Optional fields.
			anonymizeIP: true, // Should IPs be anonymized?
		},
		baseUrlIssueBanner: false, // Defaults to `true`
	},
	presets: [
		[
			'@docusaurus/preset-classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			{
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					editUrl:
						'https://github.com/fluree/developers-site',
				},
				// blog: {
				//   showReadingTime: true,
				//   // TODO: Please change this to your repo.
				//   editUrl:
				//     'https://github.com/fluree/docs.flur.ee',
				//   // editUrl:
				//   //   'https://github.com/fluree/docs.flur.ee/edit/master/website/blog/',
				// },
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			},
		],
	],
};
