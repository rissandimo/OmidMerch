//DOM ELEMENTS
const productFilter = document.getElementById('filter');
const searchProduct = document.getElementById('search-product');
const productListing = document.querySelector('.product-listing');
const subMenu = document.querySelector('.sub-menu');

//EVENT LISTENERS
productFilter.addEventListener('change', priceFilter);
searchProduct.addEventListener('input', searchFilter);
subMenu.addEventListener('click', showSpecificProducts);

const state = {
    currentCategory: null
}


//EVENT HANDLERS
function priceFilter(event){

    let filteredProducts = [];
    let categoryProducts = null;

    //creat array to store filtered products
    const priceFilterName = event.target.value;

    //get a list of all products
    const allProducts = document.querySelectorAll('.product');

    // check if category set
    if(state.currentCategory === null){
        console.log("show all categories");
        
        //for each product - parse details and store in array
        allProducts.forEach(product => {
    
            const productName = product.querySelector('.product-name').innerText;
            const productPrice = product.querySelector('.product-price').innerText.replace('$', '');
            const itemID =  product.getAttribute('data-itemID');
    
            //store details in object
            let productDetails = {
                productName,
                productPrice,
                itemID
            };
            
            // console.log(productDetails);        
    
            //push oject to array
            filteredProducts.push(productDetails);
        });

    }else{
        console.log("category chosen");
        
        constAllProductsArray = Array.from(allProducts);
        categoryProducts = constAllProductsArray.filter(product => product.getAttribute('data-category') === state.currentCategory);

        categoryProducts.forEach(product => {
    
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
            filteredProducts.push(productDetails);
        });
    }


    //sort rugs based on filter
    if(priceFilterName === 'default'){
        console.log('default');
        
        filteredProducts.sort(function(productA, productB){
            return productA.itemID - productB.itemID;
        })
    }
    else if(priceFilterName === 'expensive'){
        console.log('expensive');
        filteredProducts.sort(function(productA, productB){
            return productB.productPrice - productA.productPrice;
        })
    }
    else if(priceFilterName === 'cheap'){
        filteredProducts.sort(function(productA, productB){
            return productA.productPrice - productB.productPrice;
        })
    }    

    //clear UI
    productListing.innerHTML = '';

    //render each element to UI
    filteredProducts.forEach(renderProductToUI);
    
}

function renderProductToUI(product){

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
    
    const searchQuery = event.target.value;

    //get a list of all products
    const allProducts = document.querySelectorAll('.product');

    //for each product - get name and description
    allProducts.forEach(product => {

        const productName = product.querySelector('.product-name').innerText;

        //if there is a match -> display is normal; otherwise none
        if(productName.toLowerCase().trim().indexOf(searchQuery) > -1){
            product.style.display = 'flex';
        }else{
            product.style.display = 'none';
        }
        
    });    
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