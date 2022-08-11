import React from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './components/layout/layout';
import randomData from './utils/getRandomData';
import { TRandomData } from './utils/randomData.types';

function importAll(r: __WebpackModuleApi.RequireContext) {
  r.keys().forEach(r);
}
importAll(require.context('./', true, /\.scss$/));

function Index() {
  const data: TRandomData[] = randomData();
  return (
    <Layout footer={(
      <>
        <span>X</span>
        <span>O</span>
      </>
)}
    >
      {
        new Array(100).fill(<h1>NET</h1>).map((item) => (<div key={Math.random()}>{item}</div>))
      }
    </Layout>

  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<Index />);
