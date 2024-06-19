/* ============================== BÀI 1 ============================== */
document.write(`<b>Bài 1:</b><br>
    Viết 1 hàm tính tổng giá trị biểu thức, tham số truyền vào ở dạng Rest Parameter <br>
    Yêu cầu chi tiết: <br>
    - Hàm return về giá trị<br>
    - Ép ràng buộc kiểu dữ liệu là số<br>
    - Nếu dữ liệu truyền vào không hợp lệ, trả về thông báo lỗi<br>
    <b>F12 xem kết quả </b><br>`);

var isNumber = function (...numbers) {
    for (let value of numbers) {
        if (typeof value !== "number" || isNaN(value)) {
            return "Lỗi: yêu cầu nhập vào là number";
        }
    }
    var total = numbers.reduce(function (prev, current) {
        return prev + current;
    }, 0);
    return total;
};
console.log(isNumber(1, 2, 3));
console.log(isNumber(4, "5", 6));

/* ============================== BÀI 2 ============================== */
document.write(`<hr> <br><b>Bài 2:</b><br>
Viết 1 phương thức Prototype có tên là getCurrency có đối số truyền vào là đơn vị tiền tệ cần hiển thị <br>
Kết quả sẽ hiển thị ra kết định dạng kèm đơn vị tiền tệ<br><br>
//Case 1<br>
var price = 12000;<br>
console.log(price.getCurrency('đ')) //Hiển thị: 12,000 đ<br>

//Case 2<br>
var price = "12000000";<br>
console.log(price.getCurrency('đ')) //Hiển thị: 12,000,000 đ<br>`);

Number.prototype.getCurrency = function (unit) {
    return this.toLocaleString("en") + ` ${unit}`;
};
String.prototype.getCurrency = function (unit) {
    var number = Number(this.valueOf());
    if (!isNaN(number)) {
        return number.toLocaleString("en") + ` ${unit}`;
    } else {
        return "Không hợp lệ";
    }
};

var price = 12000;
console.log(price.getCurrency("đ"));

var price = "12000000";
console.log(price.getCurrency("đ"));

/* ============================== BÀI 3 ============================== */
document.write(`<hr> <br><b>Bài 3:</b><br>
Chuyển đổi mảng 1 chiều thành dạng lồng (nested)

[ <br>
  {<br>
    ---id: 1,<br>
    ---name: "Chuyên mục 1",<br>
    ---parent: 0,<br>
  },<br>
  {<br>
    ---id: 2,<br>
    ---name: "Chuyên mục 2",<br>
    ---parent: 0,<br>
  },<br>
  {<br>
    ---id: 3,<br>
    ---name: "Chuyên mục 3",<br>
    ---parent: 0,<br>
  },<br>
  {<br>
    ---id: 4,<br>
    ---name: "Chuyên mục 2.1",<br>
    ---parent: 2,<br>
  },<br>
  {<br>
    ---id: 5,<br>
    ---name: "Chuyên mục 2.2",<br>
    ---parent: 2,<br>
  },<br>
  {<br>
    ---id: 6,<br>
    ---name: "Chuyên mục 2.3",<br>
    ---parent: 2,<br>
  },<br>
  {<br>
    ---id: 7,<br>
    ---name: "Chuyên mục 3.1",<br>
    ---parent: 3,<br>
  },<br>
  {<br>
    ---id: 8,<br>
    ---name: "Chuyên mục 3.2",<br>
    ---parent: 3,<br>
  },<br>
  {<br>
    ---id: 9,<br>
    ---name: "Chuyên mục 3.3",<br>
    ---parent: 3,<br>
  },<br>
  {<br>
    ---id: 10,<br>
    ---name: "Chuyên mục 2.2.1",<br>
    ---parent: 5,<br>
  },<br>
  {<br>
    ---id: 11,<br>
    ---name: "Chuyên mục 2.2.2",<br>
    ---parent: 5,<br>
  },<br>
];<br>
    <b>F12 xem kết quả </b><br>`);

var categories = [
    {
        id: 1,
        name: "Chuyên mục 1",
        parent: 0,
    },
    {
        id: 2,
        name: "Chuyên mục 2",
        parent: 0,
    },
    {
        id: 3,
        name: "Chuyên mục 3",
        parent: 0,
    },
    {
        id: 4,
        name: "Chuyên mục 2.1",
        parent: 2,
    },
    {
        id: 5,
        name: "Chuyên mục 2.2",
        parent: 2,
    },
    {
        id: 6,
        name: "Chuyên mục 2.3",
        parent: 2,
    },
    {
        id: 7,
        name: "Chuyên mục 3.1",
        parent: 3,
    },
    {
        id: 8,
        name: "Chuyên mục 3.2",
        parent: 3,
    },
    {
        id: 9,
        name: "Chuyên mục 3.3",
        parent: 3,
    },
    {
        id: 10,
        name: "Chuyên mục 2.2.1",
        parent: 5,
    },
    {
        id: 11,
        name: "Chuyên mục 2.2.2",
        parent: 5,
    },
];

function getNestedCategories(categories, parentId = 0) {
    const nestedCategories = [];
    categories.forEach(function (value) {
        if (value.parent === parentId) {
            const { parent, ...rest } = value;
            const children = getNestedCategories(categories, value.id);
            if (children.length > 0) {
                rest.children = children;
            }
            nestedCategories.push(rest);
        }
    });
    return nestedCategories;
}
var nestedCategories = getNestedCategories(categories);
console.log(nestedCategories);

/* ============================== BÀI 4 ============================== */
document.write(`<hr> <br><b>Bài 4:</b><br>
Viết lại vòng lặp reduce() trong Array bằng cách sử dụng Prototype trong Javascript <br>
Lưu ý: Đặt tên là reduce2() <br><br>
<b>F12 xem kết quả </b><br>`);

Array.prototype.reduce2 = function (callback, initialValue) {
    if (this.length === 0 && initialValue === undefined) {
        return `Không hợp lệ`;
    }
    var result = initialValue !== undefined ? initialValue : this[0];
    var startIndex = initialValue !== undefined ? 0 : 1;
    for (var i = startIndex; i < this.length; i++) {
        result = callback(result, this[i]);
    }
    return result;
};

var numbers = [1, 2, 3, 4, 5];
var total = numbers.reduce2(function (prev, current) {
    return prev + current;
});
console.log(total);

document.write(
    `VD: numbers = [${numbers}] <br> Tính tổng mảng number dùng reduce2()`
);
