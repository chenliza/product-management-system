let products = JSON.parse(localStorage.getItem("products")) || [];
const productForm = document.getElementById("productForm");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productCategory = document.getElementById("productCategory");
const productQuantity = document.getElementById("productQuantity");
const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
let editId = null;
//functionបង្ហាញProduct
function displayProducts(data) {
  productList.innerHTML = "";
  if (data.length === 0) {
    productList.innerHTML = `
    <tr>
    <td colspan="6">NO products found</td>
    </tr>`;
    return;
  }
  data.forEach(function (product) {
    productList.innerHTML += `
<tr>
<td>${product.id}</td>
<td>${product.name}</td>
<td>${product.price}</td>
<td>${product.category}</td>
<td>${product.quantity}</td>
<td>
<button class="editBtn btn btn-warning btn-sm" data-id="${product.id}">Edit</button>
<button class="deleteBtn btn btn-danger btn-sm" data-id="${product.id}">Delete</button>
</td>
</tr>`;
  });
}
displayProducts(products);
//submit
productForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (
    productName.value.trim() === "" ||
    productPrice.value === "" ||
    productCategory.value.trim() === "" ||
    productQuantity.value === ""
  ) {
    alert("Please fill in all fields.");
    return;
  }
  if (Number(productPrice.value) <= 0) {
    alert("Price cannot be negative.");
    return;
  }
  if (Number(productQuantity.value) <= 0) {
    alert("Quantity cannot be negative.");
    return;
  }
  if (editId === null) {
    const product = {
      id: 
      products.length>0
      ?Math.max(...products.map(function(product){
        return product.id;
      }))+1
      :1,
      name: productName.value,
      price: Number(productPrice.value),
      category: productCategory.value,
      quantity: Number(productQuantity.value),
    };

    products.push(product);
  } else {
    //Update Product
    const product = products.find(function (product) {
      return product.id === editId;
    });
    product.name = productName.value;
    product.price = Number(productPrice.value);
    product.category = productCategory.value;
    product.quantity = Number(productQuantity.value);
  }
  //Save to LocalStorage
  localStorage.setItem("products", JSON.stringify(products));
  displayProducts(products);
  productForm.reset();
  editId = null;
  productForm.querySelector("button").textContent = "Add Product";
});
//edit product
function editProduct(id) {
  const product = products.find(function (product) {
    return product.id === id;
  });
  productName.value = product.name;
  productPrice.value = product.price;
  productCategory.value = product.category;
  productQuantity.value = product.quantity;
  editId = product.id;
  productForm.querySelector("button").textContent = "Update Product";
}

//បង្ហាញProductsពេលបើកpage
displayProducts(products);
productList.addEventListener("click", function (event) {
  if (event.target.classList.contains("editBtn")) {
    const id = Number(event.target.dataset.id);
    editProduct(id);
  }
});
//delete product
productList.addEventListener("click", function (event) {
  if (event.target.classList.contains("deleteBtn")) {
    const id = Number(event.target.dataset.id);
    const confirmDelete = confirm(
      "Are your sure you want to delete this product?",
    );
    if (!confirmDelete) {
      return;
    }
    products = products.filter(function (product) {
      return product.id !== id;
    });
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts(products);
  }
});
// Search Product
function searchProducts() {
  const keyword = searchInput.value.toLowerCase();
  const result = products.filter(function (product) {
    return product.name.toLowerCase().includes(keyword);
  });
 displayProducts(result);
}
searchInput.addEventListener("input", searchProducts);
//find with category(filter)
function filterProducts() {
  const category = categoryFilter.value;
  let result;
  if (category === "all") {
    result = products;
  } else {
    result = products.filter(function (product) {
      return product.category.toLowerCase() === category.toLowerCase();
    });
  }
 displayProducts(result);
}
categoryFilter.addEventListener("change", filterProducts);
//localStorage

const data = localStorage.getItem("products");
console.log("Data: ", data);
const result = JSON.parse(data);
console.log("Result: ", result);
