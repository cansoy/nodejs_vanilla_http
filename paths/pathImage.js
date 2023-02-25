const fs=require("fs")
const stream=require("stream")

const pathImage=(req,res)=>{
    res.setHeader("content-type","image/jpeg")
    const rs=fs.createReadStream("./files/picture (60).jpg")
    // const ws =fs.createWriteStream("./res.jpg")
    const chunks=new stream.Transform({
        transform(chunk,encoding,cb){
            cb(null,chunk)
        }
    })
    stream.pipeline(
        rs,
        chunks,
        res,
        err=>{if (err) {console.log("err")}}
    )
}
module.exports=pathImage