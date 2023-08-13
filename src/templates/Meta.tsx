import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { AppConfig } from '../utils/AppConfig';

// Props type definition for Meta component
type IMetaProps = {
  title: string;
  description: string;
  canonical?: string;
};

// Meta component for setting metadata and SEO
const Meta = (props: IMetaProps) => {
  // Access the router instance from Next.js
  const router = useRouter();

  return (
    <>
      {/* Head element to set metadata */}
      <Head>
        {/* Set character set */}
        <meta charSet="UTF-8" key="charset" />
        {/* Set viewport */}
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        {/* Apple touch icon */}
        <link
          rel="apple-touch-icon"
          href={`${router.basePath}/apple-touch-icon.png`}
          key="apple"
        />
        {/* Favicon for various sizes */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${router.basePath}/favicon-32x32.png`}
          key="icon32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${router.basePath}/favicon-16x16.png`}
          key="icon16"
        />
        <link
          rel="icon"
          href={`${router.basePath}/favicon.ico`}
          key="favicon"
        />
      </Head>
      {/* NextSeo component for advanced SEO settings */}
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={props.canonical}
        openGraph={{
          title: props.title,
          description: props.description,
          url: props.canonical,
          site_name: AppConfig.site_name,
        }}
      />
    </>
  );
};

export { Meta };
