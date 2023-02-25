const http=require("http")
const fs=require("fs")
const stream=require("stream")
const url=require("url")
const path = require("path")
const os=require("os")

const midPathController=require("./middlewares/midPathController")
const pathHome=require("./paths/pathHome")
const pathJson=require("./paths/pathJson")
const pathText=require("./paths/pathText")
const pathImage=require("./paths/pathImage")
const pathVideo=require("./paths/pathVideo")



const server=http.createServer((req,res)=>{
    midPathController(req,res)
    if ((req.url=="/" || req.url=="/favicon.ico") && req.method=="GET") {
        pathHome(req,res)
        const myResObj={
            statusCode:res.statusCode,
            statusMessage:res.statusMessage,
            getHeader:res.getHeader("pathhome")
        }
        return
    }
    if (req.url=="/json" && req.method=="GET") {
        pathJson(req,res)
        return
    }
    if (req.url=="/json-home" && req.method=="GET") {
        const userfile=`${process.env.HOME}\\Desktop\\test.txt`
        const rs=fs.createReadStream(userfile)
        res.setHeader("content-type","application/json")
        stream.pipeline(
            rs,
            res,
            err=>{if (err) {console.log("json-home-error")}}
        )
    }
    if (req.url=="/text" && req.method=="GET") {
        pathText(req,res)
        return
    }
    if (req.url=="/image" && req.method=="GET") {
        pathImage(req,res)
        return
    }
    if (req.url=="/video" && req.method=="GET") {
        pathVideo(req,res)
        return
    }
    if (req.url=="/html-home" && req.method=="GET") {
        const homeHtml=path.join(__dirname,"./public/home.html")
        const rsHtml=fs.createReadStream(homeHtml)
        res.setHeader("content-type","text/html")
        stream.pipeline(
            rsHtml,
            res,
            err=>{if (err) {console.log("err-html-public")}}
        )
    }

    if (req.url=="/style.css") {
        const styeCss=path.join(__dirname,"./public/style.css")
        const rsCss=fs.createReadStream(styeCss)
        res.setHeader("content-type","text/css")
        stream.pipeline(
            rsCss,
            res,
            err=>{if (err) {console.log("err-css-public")}}
        )
    }
    if (req.url=="/app.js") {
        const appJs=path.join(__dirname,"./public/app.js")
        const rsJs=fs.createReadStream(appJs)
        res.setHeader("content-type","text/javascript")
        stream.pipeline(
            rsJs,
            res,
            err=>{if (err) {console.log("err-js-public")}}
        )
    }
    if (req.url=="/client-posted" && req.method=="POST") {
        const allChunk=[]
        req.on("data",chunk=>{
            allChunk.push(chunk)
        })
        req.on("end",()=>{
           const reqBody=allChunk.toString()
           const reqBodyArr=reqBody.split("&")
           reqBodyArr.forEach(item=>{
            const newItem =item.split("=")
            console.log(newItem)
           })
        })
        req.on("close",()=>{
            res.setHeader("content-type","text/html")
            res.end(`<a href="/html-home">HTML HOME</a>`)
        })
    }
})

server.listen(3000,()=>{console.log("_________________________")})
