import Head from "next/head";
import Link from "next/link";

import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/_utils.module.css";
import Date from "../components/date";
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
          Hi, I'm Romeo! <br /> I'm a creator; I build and I write 👨🏿‍💻
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

            return (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`posts/${id}`}>{title}</Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
}
