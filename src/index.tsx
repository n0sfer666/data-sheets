import React from 'react';
import { createRoot } from 'react-dom/client';
import randomData from './utils/getRandomData';
import { TRandomData } from './utils/randomData.types';

function importAll(r: __WebpackModuleApi.RequireContext) {
  r.keys().forEach(r);
}
importAll(require.context('./', true, /\.scss$/));

function Index() {
  const data: TRandomData[] = randomData();
  return (
    <div>
      <main>
        <h1>Place for Net</h1>
      </main>
      <footer>
        <h2>Search</h2>
        <h2>Hidden</h2>
      </footer>
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<Index />);
