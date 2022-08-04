import Head from "next/head";
import Layout from "../components/layout";
import NestedLayout from "../components/nested-layout";
import Profile from "../components/Profile";
import { ReactElement} from "react";
import { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
  return <Profile />;
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
