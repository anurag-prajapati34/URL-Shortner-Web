export const addProductToUserCart=(userAuthId,product)=>{

fetch('http://localhost:8000/addToCart',{
    method:"POST",
    headers:{
        'content-type':'application/json'
    },
    body:JSON.stringify({
        "userAuthId":userAuthId,
        "product":product
    })
}).then((product)=>alert("Added to cart")).catch((err)=>alert("Error adding to cart"))

}