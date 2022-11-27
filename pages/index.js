import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/_utils.module.css";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hi, I'm Romeo 👋🏿 <br /> I'm a Software developer, Technical writer and Creator.
        </p>
        <p>
          This is a
          <a href="https://nextjs.org/learn"> Next.js</a> sample website.
        </p>
      </section>
    </Layout>
  );
}
