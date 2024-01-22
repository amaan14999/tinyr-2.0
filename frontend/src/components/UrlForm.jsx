import React, { useState, useContext } from "react";
import { UrlContext } from "../context/UrlContext";

const UrlForm = () => {
  const [longUrl, setLongUrl] = useState("");
  const { addUrl } = useContext(UrlContext);

  const handleSubmit = async () => {
    if (!longUrl) {
      alert("Enter valid URL!");
      return;
    }

    // Add your fetch logic here to interact with the backend
    // On success:
    // addUrl({ longUrl, shortUrl: 'Generated Short URL', count: 0 });
    try {
      const response = await fetch(
        "http://localhost:5000/api/create-short-url",
        {
          method: "POST",
          body: JSON.stringify({ longurl: longUrl }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.status === "ok") {
        addUrl({
          longUrl,
          shortUrl: `http://localhost:5000/${data.shorturlid}`,
          count: 0,
        });
        // Reset the input field
        setLongUrl("");
      } else {
        // Handle error
        alert("Failed to create short URL");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the short URL");
    }
  };

  return (
    <div className="form">
      <div className="form-element">
        <label htmlFor="longurl">Enter Link</label>
        <input
          type="text"
          id="longurl"
          placeholder="Enter Long URL here"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
      </div>
      <div className="form-element">
        <button onClick={handleSubmit}>Create Short URL</button>
      </div>
    </div>
  );
};

export default UrlForm;
