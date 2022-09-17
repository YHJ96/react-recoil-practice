import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import Store from './Store';
import { RecoilRoot } from 'recoil';

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <RecoilRoot>
    <React.Suspense fallback={<div>...준비중</div>}>
      <Store />
    </React.Suspense>
  </RecoilRoot>,
);
