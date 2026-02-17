const loadCatagory = () =>{

    const url = "https://fakestoreapi.com/products/categories"

    fetch(url)
    .then((res) => res.json())
    // .then((json) => console.log(json.data))
    .then((json) => displayCatagory(json))
}


const displayCatagory = (catagories) => {

    // adding all to the font manually 
    const newCategories = ["all", ...catagories];

    const CatagoryContainer = document.getElementById("pcat");
    CatagoryContainer.innerHTML = ""


    for(let catagory of newCategories){

        const id = catagory.replace(/[^a-zA-Z0-9]/g, "");

        const btnCat = document.createElement("div")
        const catagoryName = catagory
        btnCat.innerHTML = 
        `
        <button id = "catagory-btn-${id}" 
        onclick="loadproduct(\`${catagory}\`)"
        class="btn btn-outline btn-primary catagory-btn">
        ${catagory}
        </button>
        `
        CatagoryContainer.append(btnCat)
    }
}

const loadproduct = (product) => {
    
    const url = `https://fakestoreapi.com/products/category/${product}`
    
     
     const id = product.replace(/[^a-zA-Z0-9]/g, "");
     fetch(url)
     .then((res) => res.json())
     .then((data) => {
        const clickBtn = document.getElementById(`catagory-btn-${id}`)
        clickBtn.classList.add("active")
        // removeActive()
        displayProduct(data)
})
}

// const removeActive = () => {
//     const target = document.getElementById("pcat")
//     const newTarget = target.querySelectorAll(".active")
//  

const displayProduct = (product) => {
   
    const productContainer = document.getElementById("pc");
    productContainer.innerHTML = ""

    for(let produc of product){

        const procard = document.createElement("div")
        procard.classList.add("flex", "flex-wrap", "gap-6");
        procard.innerHTML = 
        `
        <p> akm groga </p>
        `
        productContainer.append(procard)
    }

}


loadCatagory();