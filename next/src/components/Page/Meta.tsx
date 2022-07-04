import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Config from '../../Config';

type IMetaProps = {
  title: string;
  description?: string;
  canonical?: string;
  reverseTitle?: boolean;
  customImage?: string;
};

const Meta = (props: IMetaProps) => {
  const router = useRouter();

  const useTitle = props.reverseTitle ? `${props.title} - ${Config.name}` : `${Config.name} - ${props.title}`;
  const useDescription = props.description || Config.seo.description;

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta name="viewport" content="width=device-width,initial-scale=1" key="viewport" />
        <meta name="theme-color" content="#FFF" />
        <link rel="apple-touch-icon" href={`${router.basePath}/favicon/apple-touch-icon.png`} key="apple" />
        <link rel="icon" type="image/png" sizes="32x32" href={`${router.basePath}/favicon/favicon-32x32.png`} key="icon32" />
        <link rel="icon" type="image/png" sizes="16x16" href={`${router.basePath}/favicon/favicon-16x16.png`} key="icon16" />
        <link rel="icon" href={`${router.basePath}/favicon/favicon.ico`} key="favicon" />
        <link rel="manifest" href="/site.webmanifest"></link>
        <title>{useTitle}</title>
      </Head>
      <NextSeo
        title={useTitle}
        description={useDescription}
        canonical={props.canonical}
        openGraph={{
          type: 'website',
          title: useTitle,
          description: useDescription,
          url: props.canonical || router.asPath,
          site_name: Config.name,
          images: [{ url: props.customImage || Config.seo.defaultImage, alt: useTitle }],
        }}
        additionalMetaTags={[{ name: 'keywords', content: Config.seo.keywords }]}
      />
    </>
  );
};

export { Meta };