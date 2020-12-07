import Document, { Html, Head, Main, NextScript } from "next/document";
import config, { isDev } from "../config";

class AlphaDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/img/icons/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/img/icons/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/img/icons/favicon-16x16.png"
					/>
					<link rel="manifest" href="/img/icons/site.webmanifest" />
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="true"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Merriweather:wght@400;700&display=swap"
						rel="stylesheet"
					/>
					{!isDev && (
						<>
							<script
								async
								src={`https://www.googletagmanager.com/gtag/js?id=${config.GA_UA}`}
							></script>
							<script
								dangerouslySetInnerHTML={{
									__html: `window.dataLayer = window.dataLayer || [];
                                            function gtag(){dataLayer.push(arguments);}
                                            gtag('js', new Date());
                                            gtag('config', '${config.GA_UA}');
                                    `,
								}}
							/>

							<script
								dangerouslySetInnerHTML={{
									__html: `(function(h,o,t,j,a,r){
											h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
											h._hjSettings={hjid:1849482,hjsv:6};
											a=o.getElementsByTagName('head')[0];
											r=o.createElement('script');r.async=1;
											r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
											a.appendChild(r);
										})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
								}}
							/>
						</>
					)}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default AlphaDocument;
