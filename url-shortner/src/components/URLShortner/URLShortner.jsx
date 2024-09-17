import React, { useContext, useEffect, useRef, useState } from "react";
import { URLContext } from "../../contexts/URLContext.jsx";
import "./URLShortner.css";
import { Loader } from "../Loader/Loader.jsx";

export const URLShortner = () => {
  const [longUrl, setLongUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState();
  const SERVER_STRING = import.meta.env.VITE_SERVER_CONNECTION_LINK;
  const { handleCopy, validateUrl } = useContext(URLContext);
  const shortUrlRef = useRef();

  //function that connect with backend and generate short url for long urls
  const createShortUrl = () => {
    setLoading(true);
    fetch(`${SERVER_STRING}/shorten`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        url: longUrl,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          const responseData = await response.json();
          setShortUrl(responseData.shortUrl);
          console.log("response short url is:", responseData.shortUrl);
          setLoading(false);
        }
      })
      .catch((err) => console.log("Following error occured:", err));
  };

  //function that hanvle create btn click for url
  const handleCreateShortUrlBtn = () => {
    if (!longUrl) {
      alert("Please Enter an URL");
    } else {
      if (validateUrl(longUrl)) {
        createShortUrl();
      } else {
        alert("Please Enter Valid URL");
      }
    }
  };

  //funtion that handle url input change in input field
  const handleUrlInputChange = (e) => {
    const url = e.target.value;
    setLongUrl(url);
  };

  return (
    <div id="short-url" className="main-container ">
      <div>
        <h1>Get Your</h1>
        <h1 className="center-text">Easy Short URLs</h1>
        <h1> For Free</h1>
      </div>
      <p>Simplify Your Links: Turn Long URLs into Shareable Short Links Instantly!</p>
      <div className="input-bg">
        <div className="url-input-bg">
          <input
            name="create-short-url"
            className="url-input"
            placeholder="Enter your long URL"
            onChange={handleUrlInputChange}
          ></input>

          <button onClick={handleCreateShortUrlBtn}>
            <h2 className="btn-text">Generate</h2>
            <i class="fa-solid fa-wand-magic-sparkles"></i>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="mt-10">
          <Loader />
        </div>
      ) : (
        <div className="url-container">
          <h2 ref={shortUrlRef} className="url">
            {shortUrl}
          </h2>

          {shortUrl ? (
            <i
              onClick={() => {
                handleCopy(shortUrlRef);
              }}
              class="fa-regular fa-copy copy-icon"
            ></i>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};
