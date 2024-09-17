import React, { useContext, useEffect, useRef, useState } from "react";

import { NavBar } from "../Navbar/NavBar.jsx";
import "./QRCode.css";
import { URLContext } from "../../contexts/URLContext.jsx";
// import "../ShortUrlAnalytics/ShortURLAnalysis.css";
import { Loader } from "../Loader/Loader.jsx";
export const QRCode = () => {
  const [url, seturl] = useState();
  const [ogUrl, setOgUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [qrCodeData, setQrCodeData] = useState();
  const { handleCopy, validateUrl } = useContext(URLContext);
  const SERVER_STRING = import.meta.env.VITE_SERVER_CONNECTION_LINK;
  const ogUrlRef = useRef();


  //function that connect with backeng and generated qr code for urls
  const generateQrCode = () => {
    setLoading(true);
    fetch(`${SERVER_STRING}/qrcode`, {
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
          const qrcodeDatares = responseData.qrCodeData;
          console.log("Qr code data:", qrcodeDatares);
          setQrCodeData(qrcodeDatares);
          setOgUrl(url);

          setLoading(false);
        }
      })
      .catch((err) => console.log("Error occured:", err));
  };
//function that handle url input in input field
  const handleUrlInput = (e) => {
    const newurl = e.target.value;
    seturl(newurl);
  };

  //function that take element id and then scroll to that
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.offsetTop; // Get the vertical position of the section
      window.scrollTo({
        top: topOffset,
        behavior: "smooth", // Smooth scroll
      });
    }
  };

  //function that handle generate button click
  const handleGenerate = () => {
    if (!url) {
      alert("Please Enter an URL");
    } else {
      if (validateUrl(url)) {
        generateQrCode();
      } else {
        alert("Plaese Enter Valid URL");
      }
    }
  };

  //useEffect that run when original url is avialable or change means when qr code is generated then it run
  useEffect(() => {
    scrollToSection("qr");
  }, [ogUrl]);


  return (
    <>
      <NavBar />
      <div className="main-container   w-full ">
        <div>
    
          <h1 className="center-text">QR Code for URLs</h1>
        
        </div>
        <p className="max-w-[800px]">Transform your long URLs into quick-scan QR codes in seconds, hassle-free and shareable anywhere!</p>

        <div className="input-bg">

{/*input field to enter url */}
          <div className="url-input-bg">
            <input
              className="url-input"
              placeholder="Enter your long URL"
              onChange={handleUrlInput}
            ></input>

            <button onClick={handleGenerate}>
              <h2 className="btn-text">Generate</h2>
              <i class="fa-solid fa-qrcode"></i>
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
                <p className="flex gap-3">
                <p ref={ogUrlRef} className="show-og-url">  {ogUrl}</p>
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

      {qrCodeData ? (
        <div id="qr" className="qr-container ">
          <img className="qr" src={qrCodeData} alt="QR code"></img>
          <br></br>
          <a className="" href={qrCodeData} download={"QR Image"}>
            <button className=" download-btn text-white items-center flex gap-2">
              <i class="fa-solid fa-download"></i> Download
            </button>
          </a>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
