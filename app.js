//DOM ELEMENTS
const priceFilter = document.getElementById('price-filter');
const searchBtn = document.getElementById('search-btn');
const searchProductText = document.getElementById('search-product');
const productListing = document.querySelector('.product-listing');
const subMenu = document.querySelector('.sub-menu');

//EVENT LISTENERS
priceFilter.addEventListener('change', filterByPrice);
// searchProductText.addEventListener('input', searchFilter);
searchBtn.addEventListener('click', searchFilter);
subMenu.addEventListener('click', showSpecificProducts);

const state = {
    currentCategory: null,
    filteredProducts: [],
}


//EVENT HANDLERS
function filterByPrice(event){
    console.log("price filter");
    state.filteredProducts = [];

    let categoryProducts = null;

    //creat array to store filtered products
    const priceFilterName = event.target.value;

    //get a list of all products
    const allProducts = document.querySelectorAll('.product');

    // check if category set
    if(state.currentCategory === null){
        
        parseDetailsAndStoreInArray(allProducts, state.filteredProducts);

    }else{
        
        constAllProductsArray = Array.from(allProducts);
        categoryProducts = constAllProductsArray.filter(product => product.getAttribute('data-category') === state.currentCategory);

        parseDetailsAndStoreInArray(categoryProducts, state.filteredProducts);
    }

    //sort rugs based on filter
    if(priceFilterName === 'default'){
        console.log('default');
        
        state.filteredProducts.sort(function(productA, productB){
            return productA.itemID - productB.itemID;
        })
    }
    else if(priceFilterName === 'expensive'){
        console.log('expensive');
        state.filteredProducts.sort(function(productA, productB){
            return productB.productPrice - productA.productPrice;
        })
    }
    else if(priceFilterName === 'cheap'){
        state.filteredProducts.sort(function(productA, productB){
            return productA.productPrice - productB.productPrice;
        })
    }    

    //clear UI
    productListing.innerHTML = '';

    //render each element to UI
    state.filteredProducts.forEach(renderProductToUI);
    
}

function parseDetailsAndStoreInArray(products, array){
    products.forEach(product => {

        const productName = product.querySelector('.product-name').innerText;
        const productPrice = product.querySelector('.product-price').innerText.replace('$', '');
        const itemID =  product.getAttribute('data-itemID');

        //store details in object
        let productDetails = {
            productName,
            productPrice,
            itemID
        };        

        //push oject to array
        array.push(productDetails);
    });
}

function renderProductToUI(product){
    console.log("render product");
    // create product dom element
    const productElement = document.createElement('div');
    productElement.className = 'product';
    productElement.id = product.itemID;
    productElement.setAttribute('data-itemID', product.itemID);

    productElement.innerHTML = `
        <img src="products/${product.itemID}.JPG" alt="">
        <div class="product-description">
            <p class="product-name">${product.productName}</p>
            <p class="product-price">$${product.productPrice}</p>
        </div>
        <a href="#" class="btn btn-primary btn-block">Buy</a>
    `;

    productListing.appendChild(productElement);
    
}

// Search for item based on query
function searchFilter(event){

    event.preventDefault();

    console.log("search filter");

    const searchQuery = searchProductText.value;

    console.log(searchQuery);

    // clear input
    searchProductText.value = '';

    const allProducts = document.querySelectorAll('.product');

    allProducts.forEach(product => {

        const productName = product.querySelector('.product-name').innerText;
        if(productName.toLowerCase().trim().indexOf(searchQuery) >-1){

            console.log("match found");
            const productPrice = product.querySelector('.product-price').innerText.replace('$', '');
            const itemID =  product.getAttribute('data-itemID');
    
            //store details in object
            let productDetails = {
                productName,
                productPrice,
                itemID
            };        
    
            //push oject to array
            state.filteredProducts.push(productDetails);
        }
    });

    // clear UI
    productListing.innerHTML = '';

    // render filtere items
    state.filteredProducts.forEach(renderProductToUI);

}

// List items based on link
function linkFilter(productName){
    console.log(productName);
    
    //get a list of all products
    const allProducts = document.querySelectorAll('.product');

    // for each product show if 'productName' matches category name
    allProducts.forEach(product => {
        const categoryName = product.getAttribute('data-category');

        if(productName === categoryName){
            product.style.display = 'flex';
        }
        else{
            product.style.display = 'none';
        }
    });

}

function showSpecificProducts(event){
    const targetClicked = event.target.getAttribute('data-link-category');
    state.currentCategory = targetClicked;
    
    
    linkFilter(targetClicked);
}