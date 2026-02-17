let allProducts = []
const loadCatagory = () => {
    let url = "https://fakestoreapi.com/products/categories"
    // console.log(url)
    let tempCat = []
    fetch(url)
        .then(res => res.json())
        .then(json => {
            for (let i = 0; i < json.length; i++) tempCat.push(json[i])
            displayCatagory(tempCat)
        })
}

const displayCatagory = (catagories) => {
    let newCategories = ["all"]

    for (let i = 0; i < catagories.length; i++) newCategories.push(catagories[i])
    let CatagoryContainer = document.getElementById("pcat")
    CatagoryContainer.innerHTML = ""
    
    for (let catagory of newCategories) {
        let id = catagory.replace(/[^a-zA-Z0-9]/g, "")
        let btnCat = document.createElement("div")
        btnCat.innerHTML = `<button id="catagory-btn-${id}" onclick="loadproduct('${catagory}')" class="btn btn-outline btn-primary catagory-btn">${catagory}</button>`
        CatagoryContainer.append(btnCat)
    }
}

const removeActive = () => {
    let buttons = document.querySelectorAll(".catagory-btn")
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].classList.contains("active")) buttons[i].classList.remove("active")
    }
}

const loadproduct = (product) => {
    removeActive()
    let id = product.replace(/[^a-zA-Z0-9]/g, "")
    let clickBtn = document.getElementById(`catagory-btn-${id}`)
    if (clickBtn) clickBtn.classList.add("active")

    if (product === "all") {
        if (allProducts.length > 0) return displayProduct(allProducts)
        fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
            .then(data => {
                allProducts = data
                // console.log(data)
                displayProduct(data)
            })
        return
    }

    fetch(`https://fakestoreapi.com/products/category/${product}`)
        .then(res => res.json())
        .then(data => displayProduct(data))
}

const displayProduct = (product) => {
    let productContainer = document.getElementById("pc")
    productContainer.innerHTML = ""
    for (let i = 0; i < product.length; i++) {
        let produc = product[i]
        let procard = document.createElement("div")
        procard.innerHTML = `
        <div class="card bg-base-100 w-96 shadow-sm">
            <figure class="px-3 pt-3">
                <img src="${produc.image}" alt="${produc.title}" class="w-full h-[360px] sm:h-[192px] md:h-[224px] object-contain rounded-xl"/>
            </figure>
            <div class="card-body">
                <div class="flex justify-between items-center">
                    <span class="inline-flex items-center bg-[#ae00e395] text-white rounded-full px-3 py-1 text-sm">
                        <p>${produc.category}</p>
                    </span>
                    <span class="text-sm text-gray-500">
                        <p><i class="fa-solid fa-star text-yellow-500"></i> ${produc.rating.rate}(${produc.rating.count})</p>
                    </span>
                </div>
                <h2 class="card-title mt-2">${produc.title}</h2>
               
                <h2 class="font-bold text-lg">$${produc.price}</h2>
                 
                <div class="card-actions justify-between mt-4">
                    <button onclick="loadDetails(${produc.id})" class="btn px-6 flex items-center gap-2">
                        
                    
                    <i class="fa-regular fa-eye"></i> Details
                                  </button>
                  
                                  <button class="btn btn-primary px-6 flex items-center gap-2">
                        <i class="fa-solid fa-cart-shopping"></i> Add
                    </button>
                </div>
            </div>
        </div>
        `
        productContainer.append(procard)
    }
}

const loadDetails = (id) => {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(product => showd(product))
        .catch(err => console.error(err))
}

const showd = (product) => {
    const detailBox = document.getElementById("details-container")
    detailBox.innerHTML = `
        <div class="flex flex-col md:flex-row gap-4">
            <img src="${product.image}" alt="${product.title}" class="w-full md:w-1/3 max-h-80 object-contain rounded-xl" />
            
            <div class="flex-1 space-y-2">
                <h2 class="text-2xl font-bold">${product.title}</h2>
                <p class="text-gray-600">${product.category}</p>
                <p class="text-gray-800">${product.description}</p>
                <p class="font-bold text-xl">$${product.price}</p>
                <p class="text-sm text-gray-500">
                    <i class="fa-solid fa-star text-yellow-500"></i>
                    ${product.rating.rate} (${product.rating.count} reviews)
                </p>
            </div>
        </div>
    `
    document.getElementById("d_modal").showModal()
}

loadCatagory()
loadproduct("all")
