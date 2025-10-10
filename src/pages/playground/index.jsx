import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { BeatLoader } from "react-spinners";
import Layout from "@theme/Layout";

export default function App() {
  return (
    <Layout>
      <BrowserOnly
        fallback={
          <div className="w-full h-screen flex justify-center items-center">
            <BeatLoader color="#00A0D1" size={45} />
          </div>
        }
      >
        {() => {
          const PG = require("./_components/Playground").Playground;
          return <PG />;
        }}
      </BrowserOnly>
    </Layout>
  );
}
