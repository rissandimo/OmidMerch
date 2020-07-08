//DOM ELEMENTS
const searchProduct = document.getElementById('search-product');

//EVENT LISTENERS
searchProduct.addEventListener('input', searchFilter);


//EVENT HANDLERS
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
        
    })

    
}