/* ========================= Bài 1 ========================= */
document.write(`<b>Bài 1: </b><br>
Lấy kết quả giao giữa 2 mảng <br>
var arrA = [1, 4, 3, 2]; <br>
var arrB = [5, 2, 6, 7, 1]; <br>
<br><br><b>Bài làm</b><br>`);

var arrA = [1, 4, 3, 2];
var arrB = [5, 2, 6, 7, 1];
var arrAB = arrA.filter(function (value, index) {
    return arrB.includes(value);
});
document.write(`Kết quả giao thoa 2 mảng : <b>arrAB = [${arrAB}]</b><hr>`);

/* ========================= Bài 2 ========================= */
document.write(`<br><b>Bài 2: </b><br>
Làm phẳng array sau (Chuyển về mảng 1 chiều) Không được sử dụng flat() <br>
var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
<br><br><b>Bài làm</b><br>`);

var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
var flatten = function (arr) {
    newArr = [];

    arr.forEach(function (value) {
        if (Array.isArray(value)) {
            newArr = newArr.concat(flatten(value));
        } else {
            newArr.push(value);
        }
    });
    return newArr;
};
document.write(
    `Kết quả sau khi làm phẳng ta có : <br><b>newArr = [${flatten(arr)}]</b>`
);

/* ========================= Bài 3 ========================= */
document.write(`<hr><br><b>Bài 3: </b><br>
Tách phần tử trong mảng theo đúng kiểu dữ liệu<br>
var arr = [["a", 1, true], ["b", 2, false]]
<br><br><b>Bài làm</b><br>`);

var arr = [
    ["a", 1, true],
    ["b", 2, false],
];
var classify = function (arr) {
    let isString = [];
    let isNumber = [];
    let isBoolean = [];

    arr.forEach(function (value) {
        value.forEach(function (_value) {
            if (typeof _value === "string") {
                isString.push(_value);
            } else if (typeof _value === "number") {
                isNumber.push(_value);
            } else if (typeof _value === "boolean") {
                isBoolean.push(_value);
            }
        });
    });
    return [isString, isNumber, isBoolean];
};

// Hiển thị kết quả lên web
var newClassify = classify(arr);
document.write(
    `Kết quả sau khi tách phần tử theo đúng kiểu dữ liệu:<br> 
    <b>arr = [</b>`
);
newClassify.forEach(function (value, index) {
    document.write("<b>[</b>");
    value.forEach(function (_value, _index) {
        if (typeof _value === "string") {
            document.write(`<b>"${_value}"</b>`);
        } else {
            document.write(`<b>${_value}</b>`);
        }
        if (_index < value.length - 1) {
            document.write("<b>, </b>");
        }
    });
    document.write("<b>]</b>");
    if (index < newClassify.length - 1) {
        document.write("<b>, </b>");
    }
});
document.write("<b>]</b>");
