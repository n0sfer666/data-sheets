import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/app/app';
import randomData from './utils/getRandomData';

function importAll(r: __WebpackModuleApi.RequireContext) {
  r.keys().forEach(r);
}
importAll(require.context('./', true, /\.scss$/));

function Index() {
  const data = randomData();
  return (<App data={data} />);
}

const root = createRoot(document.getElementById('root')!);
root.render(<Index />);
