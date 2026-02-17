const loadTrending = () => {
    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
            displayTrending(data); // take only first 6
        });
};

const displayTrending = (products) => {
    let productContainer = document.getElementById("tnow");
    productContainer.innerHTML = "";

    for (let i = 0; i <= 5; i++) {
        let produc = products[i];
        let procard = document.createElement("div");

        procard.innerHTML = `
        <div class="card bg-base-100 w-96 shadow-sm">
            <figure class="px-3 pt-3">
                <img src="${produc.image}" alt="${produc.title}" 
                class="w-full h-[360px] sm:h-[192px] md:h-[224px] object-contain rounded-xl"/>
            </figure>
            <div class="card-body">
                <div class="flex justify-between items-center">
                    <span class="inline-flex items-center bg-[#ae00e395] text-white rounded-full px-3 py-1 text-sm">
                        <p>${produc.category}</p>
                    </span>
                    <span class="text-sm text-gray-500">
                        <p><i class="fa-solid fa-star text-yellow-500"></i> 
                        ${produc.rating.rate} (${produc.rating.count})</p>
                    </span>
                </div>
                <h2 class="card-title mt-2">${produc.title}</h2>
                <h2 class="font-bold text-lg">$${produc.price}</h2>
                 
                <div class="card-actions justify-between mt-4">
                    <button onclick="loadDetails(${produc.id})" 
                        class="btn px-6 flex items-center gap-2">
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


loadTrending()