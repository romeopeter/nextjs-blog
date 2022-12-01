import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/_utils.module.css";

import { getSortedBlogPostData } from "../lib/posts";

export async function getStaticProps() {
  const allPostsData = getSortedBlogPostData();

  return {
    props: {
      allPostsData: JSON.parse(allPostsData),
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>
          Hi, I'm Romeo 👋🏿 <br /> I'm a Software developer, Technical writer and
          Creator.
        </p>

        <p>
          This is a<a href="https://nextjs.org/learn"> Next.js</a> sample
          website.
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, matterResult }) => {
            
            const title = matterResult.data.title;
            const date = matterResult.data.date;

            console.log(matterResult);

            return (
              <li className={utilStyles.listItem} key={id}>
                {title}
                <br />
                {id}
                <br />
                {date}
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
}
