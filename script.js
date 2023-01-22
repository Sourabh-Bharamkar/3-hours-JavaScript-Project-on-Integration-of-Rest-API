document.getElementById('selling-price').value
document.getElementById('product-name').value
document.getElementById('product-catergory').value

let products = document.getElementById('products')

let addProductButton = document.getElementById('add-product')
//add event handler to add product button
addProductButton.addEventListener('click', addProduct)

function addProduct() {
    //take all the product details entered by the user 
    let sellingPrice = document.getElementById('selling-price').value;
    let productName = document.getElementById('product-name').value;
    let productCategory = document.getElementById('product-catergory').value;

    // create object literal of these product details
    let productDetails = {
        sellingPrice: `${sellingPrice}`,
        productName: `${productName}`,
        productCategory: `${productCategory}`
    }

    // create li tag for these details 
    let liTagForProductDetails = `<li> ${sellingPrice} - ${productCategory} - ${productName} 
    <input type='button' class='btn btn-outline-danger btn-sm mx-1 delete' value='Delete'></li>`

    //save these details to crud crud 
    axios.post('https://crudcrud.com/api/fdf253f3cbb742daae61f5787a6c3cc7/productsData', productDetails).then((response) => {

        //after saving details to crud crud,show this product on screen too.
        if (productCategory == 'Electronics') {
            //push item to electronics products list 
            document.getElementById('electronics-items').insertAdjacentHTML('beforeend', liTagForProductDetails)
        }
        else if (productCategory == 'Food') {
            //push item to electronics products list 
            document.getElementById('food-items').insertAdjacentHTML('beforeend', liTagForProductDetails)
        }
        else if (productCategory == 'Skincare') {
            //push item to electronics products list 
            document.getElementById('skincare-items').insertAdjacentHTML('beforeend', liTagForProductDetails)
        }

    })
    document.getElementById('selling-price').value=""
    document.getElementById('product-name').value=""
    document.getElementById('product-catergory').value=""

}

//add domContentLoaded event handler 
window.addEventListener('DOMContentLoaded', getProductDataFromCrudCrud)

function getProductDataFromCrudCrud(e) {

    axios.get('https://crudcrud.com/api/fdf253f3cbb742daae61f5787a6c3cc7/productsData')
        .then((response) => {

            let productDetails = response.data;
            productDetails.forEach((item) => {
                if (item.productCategory == 'Electronics') {

                    // create li tag for corresponding item details 
                    let liTagForProductDetails = `<li> ${item.sellingPrice} - ${item.productCategory} - ${item.productName} 
                    <input type='button' class='btn btn-outline-danger btn-sm mx-1 delete' value='Delete'></li>`
                    //push item to elexronics product category 
                    document.getElementById('electronics-items').insertAdjacentHTML('beforeend', liTagForProductDetails);
                }

                else if (item.productCategory == 'Food') {
                    // create li tag for corresponding item details 
                    let liTagForProductDetails = `<li> ${item.sellingPrice} - ${item.productCategory} - ${item.productName} 
                    <input type='button' class='btn btn-outline-danger btn-sm mx-1 delete' value='Delete'></li>`
                    //push item to elexronics product category 
                    document.getElementById('food-items').insertAdjacentHTML('beforeend', liTagForProductDetails);
                }

                else if (item.productCategory == 'Skincare') {
                    // create li tag for corresponding item details 
                    let liTagForProductDetails = `<li> ${item.sellingPrice} - ${item.productCategory} - ${item.productName} 
                    <input type='button' class='btn btn-outline-danger btn-sm mx-1 delete' value='Delete'></li>`
                    //push item to elexronics product category 
                    document.getElementById('skincare-items').insertAdjacentHTML('beforeend', liTagForProductDetails);
                }
            })
        })
}




// // add delete functionality 

products.addEventListener('click', deleteProduct)

function deleteProduct(e) {
    e.preventDefault();

    if (e.target.classList.contains('delete')) {

        // delete corresponding product from crud crud 
        axios.get('https://crudcrud.com/api/fdf253f3cbb742daae61f5787a6c3cc7/productsData')
            .then((response) => {
                let productDetails = response.data;
                console.log('hi')
                productDetails.forEach((item) => {
                    //create details in text format 
                    let itemDetails = `${item.sellingPrice} - ${item.productCategory} - ${item.productName}`
                    console.log(itemDetails)
                    console.log(e.target.parentNode.firstChild.textContent)
                    if (e.target.parentNode.firstChild.textContent.includes(itemDetails)) {
                        let id = item._id;
                        axios.delete(`https://crudcrud.com/api/fdf253f3cbb742daae61f5787a6c3cc7/productsData/${id}`).then((response) => {
                            // delete product from user screen also 
                            e.target.parentNode.remove();
                        })

                    }

                })

            })

    }
}
