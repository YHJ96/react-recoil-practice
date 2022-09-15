import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import Store from './Store';
import { RecoilRoot } from 'recoil';

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <RecoilRoot>
    <Store />
  </RecoilRoot>,
);
