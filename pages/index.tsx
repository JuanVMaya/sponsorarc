import Head from "next/head";
import type { ReactElement } from "react";
import Layout from "../components/layout";
import type { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
  return <p>hello world</p>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
    <Head>
      <title>SponsorArc</title>
    </Head>
    <Layout>
      <div>
        <h1 className="font-sans font-bold">This is the main content</h1>
      </div>
    </Layout>
    </>
  );
};

export default Page;
