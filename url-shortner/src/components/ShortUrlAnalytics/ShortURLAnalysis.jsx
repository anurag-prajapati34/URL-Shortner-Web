import React, { useContext, useEffect, useRef, useState } from "react";
import "./ShortUrlAnalysis.css";
import { NavBar } from "../Navbar/NavBar";

import { MyChart } from "../MyChart/MyChart";
import { URLContext } from "../../contexts/URLContext.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { Loader } from "../Loader/Loader.jsx";

const ShortURLAnalysis = () => {
  const SERVER_STRING = import.meta.env.VITE_SERVER_CONNECTION_LINK;
  const [urlAnalyticsData, setUrlAnalticsData] = useState();
  const { handleCopy, validateUrl } = useContext(URLContext);
  const [url, setUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [shortUrlData, setShortUrlData] = useState();

  const [shortUrlMetaInfo, setShortUrlMetaInfo] = useState({
    tClicks: 61,
    createdAt: "12 jan 2024",
    lastVisitAt: "6 Sep 2024",
  });
  const [ogUrl, setOgUrl] = useState();
  const ogUrlRef = useRef();
  //function that formate take timestamps and then return formate it in normal date that can be understood
  function formatDate(timestamp) {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 24-hour to 12-hour format

    return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  }

  const fetchShortUrlAnalytics = () => {
    setLoading(true);
    fetch(`${SERVER_STRING}/analysis`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        url: url,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          const responseData = await response.json();
          const shortUrlData = responseData.shortUrlData;
          console.log("response data is :", shortUrlData);
          setShortUrlData(shortUrlData);
          setOgUrl(shortUrlData.originalUrl);
          setShortUrlMetaInfo({
            tClicks: shortUrlData.visitHistory.length,
            createdAt: shortUrlData.createdAt,
            lastVisitAt:
              shortUrlData.visitHistory.length > 0
                ? shortUrlData.visitHistory[
                    shortUrlData.visitHistory.length - 1
                  ].timestamps
                : "0",
          });

          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("folowing error occured:", err);
      });
  };

  //function that handle url input
  const handleInputUrl = (e) => {
    const url = e.target.value;
    setUrl(url);
  };
  //function that handle submit button click
  const handleSubmitUrl = () => {
    if (!url) {
      alert("Please Enter an Short URL");
    } else {
      fetchShortUrlAnalytics();
    }
  };
  
  //useEffect that run to start page from top instead of bottom or andywhere else
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <NavBar />
      <div className="main-container">
        <div>
          <h1 className="center-text">Get Short URL Analytics</h1>
        </div>
        <p>Transform Data into Action: Deep Dive into Your URL Metrics</p>
        <div className="input-bg">
          <div className="url-input-bg">
            <input
              className="url-input"
              name="url-to-analysis"
              onChange={handleInputUrl}
              placeholder="Enter your long URL"
            ></input>

            <button onClick={handleSubmitUrl}>
              <h2 className="btn-text">Analyse</h2>
              <i class="fa-solid fa-chart-simple"></i>
            </button>
          </div>
        </div>
        {loading ? (
          <div className="mt-10">
            <Loader />
          </div>
        ) : (
          <div className="url-container mt-10 flex align-text-bottom">
            {ogUrl ? (
              <span className="url" >
                <b className="og-url">Original URL : </b>
                <p ref={ogUrlRef} className="flex gap-3 max-w-[900px]">
                  {ogUrl}
                  <i
                    onClick={() => handleCopy(ogUrlRef)}
                    class="fa-regular fa-copy copy-icon"
                  ></i>
                </p>
              </span>
            ) : (
              ""
            )}
          </div>
        )}
      </div>

      <div className="w-full text-start">
        <h1 className="url-analysis-heading">SHORT URL PERFORMANCE</h1>
        <p className="url-analysis-subheading">
          Transform Data into Action: Deep Dive into Your URL Metrics
        </p>
        <MyChart shortUrlData={shortUrlData} />

        {/* /// */}
        <h1 className="meta-info-heading mt-[50px]">URL META INFO</h1>
        <p className="meta-info-subheading">
          Meta information realted to short url
        </p>
        <div className="url-meta-info">
          <div className="meta-info">
            {/* //icon */}
            <div className="info-icon-bg">
              <i class="fa-regular fa-hand-pointer info-icon"></i>
            </div>
            {/* //info-name */}
            <div>
              <h1 className="info-name">{shortUrlMetaInfo.tClicks}</h1>
              {/* //detail */}
              <p className="info-desc">Total Clicks</p>
            </div>
          </div>
          <div className="meta-info">
            {/* //icon */}
            <div className="info-icon-bg">
              <i class="fa-solid fa-calendar-days info-icon"></i>
            </div>
            {/* //info-name */}
            <div>
              <h1 className="info-name">
                {formatDate(shortUrlMetaInfo.createdAt)}
              </h1>
              {/* //detail */}
              <p className="info-desc">Created at</p>
            </div>
          </div>
          <div className="meta-info">
            {/* //icon */}
            <div className="info-icon-bg">
              <i class="fa-solid fa-clock info-icon"></i>
            </div>
            {/* //info-name */}
            <div>
              <h1 className="info-name">
                {shortUrlMetaInfo.lastVisitAt == "0"
                  ? "No visits yet"
                  : formatDate(shortUrlMetaInfo.lastVisitAt)}
              </h1>
              {/* //detail */}
              <p className="info-desc">Last visit at</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShortURLAnalysis;
