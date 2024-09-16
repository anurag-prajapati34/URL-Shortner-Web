import React, { createContext, useContext, useState } from 'react'
import copy from 'copy-to-clipboard'

const URLContext=createContext();
const URLContextProvider=({children})=>{

    // const SERVER_STRING=import.meta.env.VITE_SERVER_CONNECTION_LINK
const [pieChartData,setPieChartData]=useState();
const [browserData,setBrowserData]=useState();
const [osData,setOsData]=useState()

//fucntion that get url an then validate is it url or not
const validateUrl = (value) => {
  const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-zA-Z0-9\\-\\.]+)\\.[a-zA-Z]{2,})|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
    '(\\:\\d+)?(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?' + // port and path
    '(\\?[;&a-zA-Z0-9%_\\+.~#?&//=]*)?' + // query string
    '(\\#[-a-zA-Z0-9_]*)?$','i'); // fragment locator
  return !!value.match(urlPattern);
};

//function that copy andy text
const handleCopy=(element)=>{
  const copyValue=element.current.innerText;

copy(copyValue)
alert("Successfully copied")
}
 
    return <URLContext.Provider value={
        
      {
        
        pieChartData,setPieChartData,handleCopy,validateUrl
      
      }
        
    }>{children}</URLContext.Provider>
}

export {URLContext, URLContextProvider}