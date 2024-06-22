/* ============================== BÀI 1 ============================== */
document.write(`<b>Bài 1</b> <br>
Viết lại hàm push() trong Array. Đặt tên là push2()
<br><br><b>Bài làm</b><br>`);

Array.prototype.push2 = function (...arg) {
    let length = this.length;
    for (let i = 0; i < arg.length; i++) {
        this[length + i] = arg[i];
    }
    return this.length;
};

var arr1 = [1, 2, 3];
var arr2 = [3, 4, 5];

document.write(`VD: arr1 = [${arr1}], arr2 = [${arr2}]<br>`);
arr1.push(arr2);
document.write(
    `<br><b>Ta có kết quả: arr1.push2(arr2) ---> arr1 = [${arr1}]</b>`
);

/* ============================== BÀI 2 ============================== */
document.write(`<hr><br><b>Bài 2</b> <br>
    Viết làm vòng lặp filter trong Array. Đặt tên là filter2()
    <br><br><b>Bài làm</b><br>`);

Array.prototype.filter2 = function (callback, thisArg) {
    var newArr = [];
    for (let i = 0; i < this.length; i++) {
        if (callback.call(thisArg, this[i], i, this)) {
            newArr.push(this[i]);
        }
    }
    return newArr;
};

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

document.write(
    `VD: arr = [${arr}] <br> <b>Yêu cầu</b>: Tạo 1 mảng mới có các giá trị lớn hơn 3 có trong mảng arr, dùng hàm filter2 vừa tạo<br>`
);

var newArr = arr.filter2(function (value) {
    return value > 3;
});
document.write(`<br><b>Ta có kết quả ---> newArr = [${newArr}]</b>`);
