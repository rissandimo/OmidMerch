//DOM ELEMENTS
const alertMessage = document.querySelector('.alert-message');
const filterMessageContainer = document.getElementById('filter-message-container');
const priceFilter = document.getElementById('price-filter');
const searchBtn = document.getElementById('search-btn');
const searchProductText = document.getElementById('search-product');
const productListing = document.querySelector('.product-listing');
const showAllProductsBtn = document.querySelector('#show-all-products');
const subMenu = document.querySelector('.sub-menu');

//EVENT LISTENERS
priceFilter.addEventListener('change', filterByPrice);
showAllProductsBtn.addEventListener('click', showAllProducts);
searchBtn.addEventListener('click', searchFilter);

const state = {
    allProducts: [],
    currentCategory: null,
    filteredProducts: [],
}

function displayAlertMessage(message){
    
    alertMessage.innerHTML = message;

    filterMessageContainer.style.display = 'block';
        
    setTimeout(() => {
    filterMessageContainer.style.display = 'none';
    }, 3000);
}

// Store all products
function storeAllProducts(){

    // clear all products
    state.allProducts = [];
    
    const allProductsList = document.querySelectorAll('.product');

    parseDetailsAndStoreInArray(allProductsList, state.allProducts);
}


//EVENT HANDLERS
function filterByPrice(event){
    event.preventDefault();

    state.filteredProducts = [];

    const priceFilterName = event.target.value;

    //get a list of all products
    const allProductsList = document.querySelectorAll('.product');

    parseDetailsAndStoreInArray(allProductsList, state.filteredProducts);

    // Sort product array based on filter name
    sortProductArray(priceFilterName);

    //clear UI
    productListing.innerHTML = '';

    //render each element to UI
    state.filteredProducts.forEach(renderProductToUI);
    
}

function sortProductArray(priceFilterName){
    if(priceFilterName === 'default'){
        
        state.filteredProducts.sort(function(productA, productB){
            return productA.itemID - productB.itemID;
        })
    }
    else if(priceFilterName === 'expensive'){
        state.filteredProducts.sort(function(productA, productB){
            return productB.productPrice - productA.productPrice;
        })
    }
    else if(priceFilterName === 'cheap'){
        state.filteredProducts.sort(function(productA, productB){
            return productA.productPrice - productB.productPrice;
        })
    }    
}

function parseDetailsAndStoreInArray(products, array){
    products.forEach(product => {

        const productName = product.querySelector('.product-name').innerText;
        const productPrice = product.querySelector('.product-price').innerText.replace('$', '');
        const itemID =  product.getAttribute('data-itemID');
        const paypalID = product.getAttribute('data-paypalID');

        //store details in object
        let productDetails = {
            productName,
            productPrice,
            itemID,
            paypalID
        };        

        //push oject to array
        array.push(productDetails);
    });
}

function renderProductToUI(product){

    // create product dom element
    const productElement = document.createElement('div');
    productElement.className = 'product';
    productElement.id = product.itemID;
    productElement.setAttribute('data-itemID', product.itemID);
    productElement.setAttribute('data-paypalID', product.paypalID);
    productElement.paypalID = product.paypalID;

    productElement.innerHTML = `
        <img src="products/${product.itemID}.JPG" alt="">
        <div class="product-description">
            <p class="product-name">${product.productName}</p>
            <p class="product-price">$${product.productPrice}</p>
        </div>

        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
            <input type="hidden" name="cmd" value="_s-xclick">
            <input type="hidden" name="hosted_button_id" value="${productElement.paypalID}">
            <button type="submit" class="btn btn-primary btn-block">Buy</button>
        </form>
    `;

    productListing.appendChild(productElement);
    
}

// Search for item based on query
function searchFilter(event){

    event.preventDefault();
    const searchQuery = searchProductText.value;
    let matchesFound = 0;

    searchProductText.value = '';

    // check if query empty
    if(searchQuery.trim() != ''){
        
        state.filteredProducts = [];
    
        const allProducts = document.querySelectorAll('.product');
                
        allProducts.forEach(product => 
            {
            
            const productName = product.querySelector('.product-name').innerText;

            // if matches found - store them in array
            if(productName.toLowerCase().trim().indexOf(searchQuery) >-1)
            {
                matchesFound++;

                const productPrice = product.querySelector('.product-price').innerText.replace('$', '');
                const itemID =  product.getAttribute('data-itemID');
                const paypalID = product.getAttribute('data-paypalID');
        
                //store details in object
                let productDetails = {
                    productName,
                    productPrice,
                    itemID,
                    paypalID
                };        
        
                //push oject to array
                state.filteredProducts.push(productDetails);
            }
        });

        // If matches found - clear UI and render filtered items
        if(matchesFound){
            // clear UI
        productListing.innerHTML = '';
    
        // show all products button
        showAllProductsBtn.style.display = 'inline-block';
        document.querySelector('.name-filter').style.width = '55rem';
    
        // render filtered items
        state.filteredProducts.forEach(renderProductToUI);
        }

        // No matches found - 
        else{
            displayAlertMessage("Sorry, no products found under that query");
        }
        
    }
    // Empty query
    else{
        displayAlertMessage("You must enter a query");
    }
}

function showAllProducts(){

    // clear UI
    productListing.innerHTML = '';
    
    // render all products
    state.allProducts.forEach(renderProductToUI);

    //hide "show all products" button
    showAllProductsBtn.style.display = 'none';
    document.querySelector('.name-filter').style.width = '40rem';

}

window.addEventListener('DOMContentLoaded', storeAllProducts);