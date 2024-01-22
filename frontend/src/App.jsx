import React from "react";
import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";
import { UrlProvider } from "./context/UrlContext";

function App() {
  return (
    <UrlProvider>
      <div className="App">
        <h1>Tinyr</h1>
        <div className="container">
          <UrlForm />
          <UrlList />
        </div>
      </div>
    </UrlProvider>
  );
}

export default App;
