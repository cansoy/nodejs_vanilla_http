const pathHome=(req,res)=>{
    res.setHeader("content-type","text/html")
    res.setHeader("pathhome","text-html")
    res.writeHead(200,"done well text-html")
    res.write(`
        <br><br>
        <hr>
            <li><a href="/json">JSON</a></li>
            <li><a href="/json-home">JSON-HOME</a></li>
            <li><a href="/text">TEXT</a></li>
            <li><a href="/image">IMAGE</a></li>
            <li><a href="/video">VIDEO</a></li>
            <li><a href="/html-home">HTML HOME</a></li>
        <hr>
        <br><br>
        <hr>
            <p>Add lotsof html content you are using text/html</p>
        <hr>
    `)
    res.end()
}

module.exports=pathHome
