import Head from "next/head";

import Layout from "../../components/layout";
import { getAllBlogIds, getAllBlogData } from "../../lib/posts";
import Date from "../../components/date";
import utilStyles from "../../styles/_utils.module.css";

export async function getStaticPaths() {
  const paths = getAllBlogIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const blogData = await getAllBlogData(params.id);

  return {
    props: {
      blogData,
    },
  };
}

export default function Post({ blogData }) {
  return (
    <Layout>
      <Head>
        <title>{blogData.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{blogData.title}</h1>

        <div className={utilStyles.lightText}>
          <Date dateString={blogData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: blogData.contentHTML }} />
      </article>
    </Layout>
  );
}
