import Head from "next/head";
import Layout from "../components/layout";
import NestedLayout from "../components/nested-layout";
import type { ReactElement } from "react";
import Home from "../components/Home";
import { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
  return <Home />;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>SponsorArc</title>
      </Head>
      <Layout>
        <NestedLayout>{page}</NestedLayout>
      </Layout>
    </>
  );
};

export default Page;
