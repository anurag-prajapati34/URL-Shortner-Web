const express =require('express')
const cors =require('cors')
const generateUniqueId = require('generate-unique-id');
const UAParser  =require('ua-parser-js')
const mongoose=require('mongoose') //mongoose package
const qrcode=require('qrcode')

const dotenv=require('dotenv')
dotenv.config()
const PORT=process.env.PORT || 7000
const SERVER_STRING=process.env.SERVER_STRING
const app=express();
app.use(cors())
app.use(express.json())

//connecting mongodb

mongoose.connect(process.env.MONGODB_STRING)

const urlSchema=new mongoose.Schema({ //schema
    shortId:{
        type:String,
        required:true
    },
    originalUrl:{
        type:String,
        required:true,

    },
    shortUrl:{
        type:String,
        required:true
    },
    visitHistory:[
        {
            timestamps:{
                type:String
            },
            browser:{
                type:String
            },
            os:{
                type:String
            }
        }
    ]
    
},{
    timestamps:true,
},

)

//model

const ShortUrl=mongoose.model('shortUrls',urlSchema)

app.get('/:shortId',async (req,res)=>{
const parser=new UAParser();
const userAgent=req.headers['user-agent'];
const parsedResult=parser.setUA(userAgent).getResult();
const browser=parsedResult.browser.name;
const os=parsedResult.os.name;


    const shortId=req.params.shortId
 await ShortUrl.findOneAndUpdate({shortId:shortId},{$push:{
    visitHistory:{
        timestamps:new Date(),
        browser:browser,
        os:os

    }
 }}).then((shortUrlData)=>{

if(shortUrlData){
   

    return res.redirect(shortUrlData.originalUrl)

}
else{
    return res.status(404).send("URL not found")
}
    

}).catch(()=>{

    return res.status(500).send("Server error")

})




})

app.post('/analysis',async (req,res)=>{

    const body=req.body
    const shortUrl=body.url
console.log('url for ana.',shortUrl)
const extraClientInfo=req.headers['referer']
console.log("Client inro:",extraClientInfo)

   await ShortUrl.findOne({shortUrl:shortUrl}).then((shortUrlData)=>{

    if(!shortUrlData){
        console.log("analysis data not found")
        return res.status(400)
     
    }
        console.log("short url data for analysis:",shortUrlData)
        
        return res.status(200).json({shortUrlData:shortUrlData,test:"testing in on..."})
    }).catch(()=>{
        return res.status(500).send("Server error")
    })


})


app.post('/shorten',async (req,res)=>{

    const body=req.body
    console.log("Sent req body:",body)
    const originalUrl=body.url
console.log("Sent long url:",originalUrl)

const shortId=generateUniqueId({
    length:8,
})
const shortUrl=`${SERVER_STRING}/${shortId}`
console.log("short url is",shortUrl)


    if(!originalUrl){
        return res.send("Enter a url")
    }
  
   await ShortUrl.create({
        shortId:shortId,
        originalUrl:originalUrl,
        shortUrl:shortUrl
    }).then(()=>{
        return res.status(201).json({shortUrl:shortUrl,test:"just testing.."})
    }
    ).catch(()=>{
        return res.status(500).send("Server error")
    })
    
    
   

})

app.post('/qrcode',async (req,res)=>{

try{
    const body=req.body;
    const url=body.url;
const qrCodeData=await qrcode.toDataURL(url);
console.log("qrData:",qrCodeData
)
return res.status(200).json({qrCodeData:qrCodeData});
}
catch(err){
    console.log("Error :",err)
}



})


app.listen(PORT,()=>console.log("Server started at PORT ",PORT))