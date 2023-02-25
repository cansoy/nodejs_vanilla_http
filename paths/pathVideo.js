const fs=require("fs")
const stream=require("stream")

const pathVideo=(req,res)=>{
    res.setHeader("content-type","video/mp4")
    const rs=fs.createReadStream("./files/video.mp4")
    const chunks=new stream.Transform({
        transform(chunk,encoding,cb){
            cb(null,chunk)
        }
    })
    stream.pipeline(
        rs,
        chunks,
        res,
        err=>{if (err) {console.log(err)}}
    )
}

module.exports=pathVideo