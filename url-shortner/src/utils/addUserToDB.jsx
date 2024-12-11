export const addUserToDB=(userAuthId)=>{
    console.log("userAuthId:frm adduser to db:",userAuthId)
    const server_url=import.meta.env.VITE_SERVER_CONNECTION_LINK
    fetch(`${server_url}/user`,{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            "userAuthId":userAuthId
        })

    })
}

