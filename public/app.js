const submitbtn=document.querySelector("#submit")

submitbtn.addEventListener("click",(e)=>{
    // e.preventDefault()
    const form=document.querySelector("#hidden").outerHTML
    const blob=new Blob([form])
    blob.arrayBuffer()
        .then(res=>{
            const uint8=new Uint8Array(res)
            fetch("/client-posted",{
                method:"post",
                body:uint8
            })
        })
        .catch(err=>{
            console.log(err)
        })
})