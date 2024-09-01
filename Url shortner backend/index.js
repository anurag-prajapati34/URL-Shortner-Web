const express =require('express')
const cors =require('cors')
const generateUniqueId = require('generate-unique-id');
const mongoose=require('mongoose') //mongoose package

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

console.log("request header Host. is",req.headers['host'])
console.log("request header. From is",req.headers['from'])
console.log("request header origin. is",req.headers['origin'])
    const shortId=req.params.shortId
 await ShortUrl.findOneAndUpdate({shortId:shortId},{$push:{
    visitHistory:{
        timestamps:Date.now()
    }
 }}).then((shortUrlData)=>{

if(shortUrlData){
    console.log("short url data is :",shortUrlData)

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




app.listen(PORT,()=>console.log("Server started at PORT ",PORT))