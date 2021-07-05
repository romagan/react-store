import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC0D4AusEo0IA7CWi_Q4A_lngkgaPNHx_0",
  authDomain: "react-goods-store.firebaseapp.com",
  projectId: "react-goods-store",
  storageBucket: "react-goods-store.appspot.com",
  messagingSenderId: "637316421679",
  appId: "1:637316421679:web:50263fdfecb8af1010ceda"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById(`root`));
