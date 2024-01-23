import React from "react";
import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";
import { UrlProvider } from "./context/UrlContext";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function App() {
  return (
    <UrlProvider>
      <div className="App">
        <header>
          <h1>Tinyr</h1>
        </header>

        <div className="containers">
          <UrlForm />
          <UrlList />
        </div>
      </div>
    </UrlProvider>
  );
}

export default App;
