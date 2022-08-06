import Head from "next/head";
import Layout from "../components/layout";
import NestedLayout from "../components/nested-layout";
import BrowseCreators from "../components/BrowseCreators";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
  return <BrowseCreators />;
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
