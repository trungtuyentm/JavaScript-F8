var tableProduct = document.querySelector(".table-product");
var tableListProduct = document.querySelector(".table-list-product");
var cartData = document.querySelector(".cart-data");

listProduct = [
    {
        idProduct: 0,
        nameProduct: "Sản phẩm 1",
        price: 1000,
    },
    {
        idProduct: 1,
        nameProduct: "Sản phẩm 2",
        price: 2000,
    },
    {
        idProduct: 2,
        nameProduct: "Sản phẩm 3",
        price: 3000,
    },
    {
        idProduct: 3,
        nameProduct: "Sản phẩm 4",
        price: 4000,
    },
];

// Display products
listProduct.forEach(function (value, index) {
    tableListProduct.innerHTML += `
    <tr>
        <td>${++index}</td>
        <td>${value.nameProduct}</td>
        <td>${value.price}</td>
        <td>
            <input type="number" min='0' value='1' />
            <button>Thêm vào giỏ</button>
        </td>
    </tr>
    `;
});

// SetLocalStorage
var setLocalStorage = (nameLocal, value) => {
    localStorage.setItem(nameLocal, JSON.stringify(value));
};

var listProductInCartData = [];
if (localStorage.getItem("listProductCartData")) {
    listProductInCartData = JSON.parse(
        localStorage.getItem("listProductCartData")
    );
} else {
    setLocalStorage("listProductCartData", listProductInCartData);
}

// Display cart data
var showCartData = () => {
    setLocalStorage("listProductCartData", listProductInCartData);
    if (listProductInCartData.length === 0) {
        cartData.innerText = "Giỏ hàng không có sản phẩm";
    } else {
        var totalPrice = 0;
        var totalQuantity = 0;
        var tableHeaderCartData = `
        <table class='table-cart'width="100%">
            <thead>
                <tr>
                    <th width="5%">STT</th>
                    <th>Tên sản phẩm</th>
                    <th width="10%">Giá</th>
                    <th width="10%">Số lượng</th>
                    <th width="10%">Thành tiền</th>
                    <th width="5%">Xóa</th>
                </tr>
            </thead>
        `;
        var tableBodyCartData = "";
        listProductInCartData.forEach(function (product, index) {
            totalPrice += product.quantity * product.price;
            totalQuantity += product.quantity;
            tableBodyCartData += `
            <tbody>
                <tr>
                    <td>${++index}</td>
                    <td>${product.nameProduct}</td>
                    <td>${product.price}</td>
                    <td>
                        <input 
                            type='number' 
                            class= 'input-quantity-cart'
                            id="${product.idProduct}" 
                            value='${product.quantity}'
                            min='0'>
                            
                    </td>
                    <td>${product.quantity * product.price}</td>
                    <td>
                        <button 
                            style="width=100%" 
                            class= 'delete-product' 
                            id='${product.idProduct}'}
                        >Xóa</button>
                    </td>
                </tr>
            </tbody>
            `;
        });

        tableFooterCartData = `
        <tfoot>
                <tr>
                    <td colspan='3'>Tổng</td>
                    <td>${totalQuantity}</td>
                    <td colspan='2'>${totalPrice}</td>
                </tr>
            </tfoot>
        </table>
        <div>
            <button class='update-cart' style= 'margin-top: 10px'>Cập nhật giỏ hàng</button>
            <button class='delete-all-cart'>Xóa giỏ hàng</button>
        </div>
        `;

        cartData.innerHTML =
            tableHeaderCartData + tableBodyCartData + tableFooterCartData;
    }
};
showCartData();

// Add a products to the cart
var listProductAddBtn = document.querySelectorAll(".table-product button");

listProductAddBtn.forEach(function (addBtn, index) {
    addBtn.addEventListener("click", function () {
        var quantity = +addBtn.previousElementSibling.value;
        var product = listProduct.find(function (value) {
            return +value.idProduct === +index;
        });

        var productCart = listProductInCartData.find(function (value) {
            return +value.idProduct === +index;
        });
        if (productCart) {
            productCart.quantity += quantity;
        } else {
            listProductInCartData.push({ ...product, quantity: +quantity });
        }
        showCartData();
    });
});

cartData.addEventListener("click", function (e) {
    // Update all products in the Cart
    if (e.target.className === "update-cart") {
        var listInputQuantityCart = document.querySelectorAll(
            ".input-quantity-cart"
        );
        listInputQuantityCart.forEach(function (input) {
            if (input.value > 0) {
                listProductInCartData[
                    listProductInCartData.findIndex(function (product) {
                        return +product.idProduct === +input.id;
                    })
                ].quantity = +input.value;
            } else {
                listProductInCartData.findIndex(function (product) {
                    listProductInCartData.splice(
                        listProductInCartData.findIndex(function (product) {
                            return +product.idProduct === +input.id;
                        })
                    );
                });
            }
        });
        alert("Cập nhật giỏ hàng thành công!");
        showCartData();
    }

    // Delete All Products in the cart
    if (e.target.className === "delete-all-cart") {
        var warming =
            "Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng không?";
        if (confirm(warming)) {
            listProductInCartData.length = 0;
            alert("Xóa thành công");
            showCartData();
        }
    }

    // Delete products in the cart
    if (e.target.className === "delete-product") {
        var warming = "Bạn có chắc chắn muốn xóa sản phẩm này không?";
        if (confirm(warming)) {
            var idClear = listProductInCartData.findIndex(function (product) {
                return +product.idProduct === +e.target.id;
            });
            if (idClear >= 0) {
                alert("Xóa sản phẩm thành công!");
                listProductInCartData.splice(idClear, 1);
            } else {
                alert("Xóa sản phẩm không thành công!");
            }
            showCartData();
        }
    }
});
