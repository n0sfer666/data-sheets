import React from 'react';
import { createRoot } from 'react-dom/client';
import Finder from './components/finder/finder';
import Layout from './components/layout/layout';
import App from './pages/app/app';
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
        <Finder />
      </>
)}
    >
      <App data={data} />
    </Layout>

  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<Index />);
