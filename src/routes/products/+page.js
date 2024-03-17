export const load= async()=>{
    const title= "list of products"
    const response=await fetch("http://localhost:4000/products")
    const products=await response.json();
    return{title,products}
}