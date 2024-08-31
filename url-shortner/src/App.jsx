import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [currentUrl,setCurrenUrl]=useState();
  const [shortUrl,setShortUrl]=useState();
  const [shortURLtoAnalyze,setShortURLtoAnalyze]=useState();
  const [shortURLData,setShortURLData]=useState();

  const SERVER_CONNECTION_LINK=import.meta.env.VITE_SERVER_CONNECTION_LINK

  console.log("server connection link is:",SERVER_CONNECTION_LINK)

const createShortenUrl=()=>{
 
  setShortURLtoAnalyze('')
  setShortURLData('')
  fetch(`${SERVER_CONNECTION_LINK}/shorten`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      url:currentUrl
    })
  }).then(async (response)=>{
    if(response.ok){
      const responseData=await response.json()
      console.log("Successfully URL shorten.")
      setShortUrl(responseData.shortUrl)
      console.log("response data is :",responseData)
      console.log("Generated short url is :",responseData.shortUrl)
      

    }
  })

}

const getShortUrlData=()=>{

  fetch(`${SERVER_CONNECTION_LINK}/analysis`,{

  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },

  body:JSON.stringify({
    url:shortURLtoAnalyze
  })
  }).then(async (response)=>{
    if(response.ok){

      const responseData=await response.json();
      console.log("short url data is :",responseData.shortUrlData
      )
      setShortURLData(responseData.shortUrlData)
    }


  }).catch(()=>{
    console.log("Connot get Short url data ")
  }
  )
}

const handleURLInput=(e)=>{
  const UrlInput=e.target.value;
  const inputFieldName=e.target.name;

  switch(inputFieldName){
    case 'shorten-url':
      setCurrenUrl(UrlInput)
      break;
    case 'analyze-short-url':
      setShortURLtoAnalyze(UrlInput)
      break;
  }
 
}

const handleShortnBtnClick=()=>{
  if(currentUrl){
    createShortenUrl()

  }
  else{
    alert("Please Enter URL")
  }

}

const handleGetAnalysisBtnClick=()=>{
  if(shortURLtoAnalyze){
    getShortUrlData()

  }
  else{
    alert("Please Enter your short URL")
  }
}

  return (
    <div className='main-container'>

      <h1 className='main-heading' >Convert your long URls into easy Short URLs</h1>

      <h3 className='headings'>Long URLs to Short URLs </h3>
    <div className='container'>
      
      <input onChange={handleURLInput} name='shorten-url' value={currentUrl} className="url-input" placeholder='Enter your URL'></input>

      <button onClick={handleShortnBtnClick} className='button'>Short</button>

    </div>
    <p>{shortUrl}</p>
    <hr></hr>
    <h3 className='headings'> Get Short URL Analytics</h3>
    <div className='container'>
      
      <input onChange={handleURLInput} name='analyze-short-url'  className="url-input" value={shortURLtoAnalyze} placeholder='Enter your Short URL'></input>

      <button onClick={handleGetAnalysisBtnClick} className='button'>Get Analysis</button>

    </div>

    {
   
      (shortURLData)?<div>
<p>Total visit:{shortURLData.visitHistory
        .length}</p>
        <p>Created At: {shortURLData.createdAt}</p>
        <p>Last Updated At: {shortURLData.updatedAt}</p>
        <p>Last visit At: {
        
        shortURLData.visitHistory.length>0?   Date(shortURLData.visitHistory[shortURLData.visitHistory.length-1].timestamps):'No visit'
        
        }</p>

      </div>:''
    }
    </div>
  )
}

export default App
