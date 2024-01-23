import React, { useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { UrlContext } from "../context/UrlContext";
import "./UrlList.css";

const UrlList = () => {
  const { urlData, addUrl } = useContext(UrlContext);
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/get-all-short-urls"
        );
        const data = await response.json();
        data.forEach((url) => {
          if (
            !urlData.some(
              (u) => u.shortUrl === `http://localhost:5000/${url.shorturlid}`
            )
          ) {
            addUrl({
              longUrl: url.longurl,
              shortUrl: `http://localhost:5000/${url.shorturlid}`,
              count: url.count,
            });
          }
        });
      } catch (error) {
        console.error("Error fetching URLs:", error);
      }
    };

    fetchUrls();
  }, [addUrl, urlData]); // Include urlData in dependencies

  return (
    <div className="list">
      <h2>Shorten Links</h2>
      <Table responsive="lg" striped bordered>
        <thead>
          <tr>
            <th>Long URL</th>
            <th>Short URL</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {urlData.map((url, index) => (
            <tr key={index}>
              <td>{url.longUrl}</td>
              <td>
                <a
                  href={url.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {url.shortUrl}
                </a>
              </td>
              <td>{url.count}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UrlList;
