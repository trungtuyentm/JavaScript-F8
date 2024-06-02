/* ==================== Bài 1 ==================== */
document.write(
    `<b>Bài 1: Hoán vị 2 số </b><br> 
    <b>Input</b>: cho trước 2 số a, b <br> 
    <b>Output</b>: Thực hiện hoán vị 2 số không dùng biến trung gian <br><br> 
    Bài làm <br>`
);
var a = 1;
var b = 2;
document.write(`Ta có: a = ${a}, b = ${b} <br>`);
a = a + b;
b = a - b;
a = a - b;
document.write(`Sau khi hoán vị: a = ${a}, b = ${b} <br><br><hr><br>`);

/* ==================== Bài 2 ==================== */
document.write(
    `<b>Bài 2: Viết chương trình tính toán biểu thức sau</b> <br> 
    S = 10 + 20 + 5^10 / 2 <br> <br> 
    Bài làm <br>`
);
var S = 10 + 20 + 5 ** 10 / 2;
document.write(`S = 10 + 20 + 5^10 / 2 = ${S} <br><br><hr><br>`);

/* ==================== Bài 3 ==================== */
document.write(`<b>Bài 3: Tìm số lớn nhất</b> <br>
    Học viên tìm hiểu về câu lệnh rẽ nhánh và giải bài tập sau <br>
    <b>Input</b>: Cho trước 3 số a, b, c <br>
    <b>Output</b>: Tìm số lớn nhất trong 3 số và hiển thị kết quả <br><br> 
    Bài làm <br>`);
var a = 1;
var b = 2;
var c = 3;
var max = 0;
document.write(`Ta có: a = ${a}, b = ${b}, c = ${c} <br>`);
if (a > b && a > c) {
    max = a;
} else if (b > a && b > c) {
    max = b;
} else {
    max = c;
}
document.write(`Số lớn nhất trong 3 số là số ${max} <br><br><hr><br>`);

/* ==================== Bài 4 ==================== */
document.write(`<b>Bài 4: Kiểm tra số cùng dấu</b></br>
    <b>Input</b>: Cho trước 2 số a, b<br>
    <b>Output</b>: Kiểm tra 2 số cùng dấu hay không và hiển thị kết quả ra màn hình <br><br> 
    Bài làm <br>`);
var a = 1;
var b = 2;
document.write(`Ta có: a = ${a}, b = ${b} <br>`);
if (a * b > 0) {
    dau = "<b>Cùng dấu</b>";
} else {
    dau = "<b>Khác dấu</b>";
}
document.write(`2 số a, b là ${dau} <br><br><hr><br>`);

/* ==================== Bài 5 ==================== */
document.write(`<b>Bài 5: Sắp xếp 3 số</b></br>
    <b>Input</b>: Cho trước 3 số a, b, c<br>
    <b>Output</b>: Thực hiện đổi chỗ 3 số a, b, c sao cho 3 số có thứ tự tăng dần <br><br> 
    Bài làm <br>`);
var a = 3;
var b = 2;
var c = 5;
document.write(`Ta có: a = ${a}, b = ${b}, c = ${c} <br>`);

var bigNumber = a > b ? (a > c ? a : c) : b > c ? b : c;
var smallNumber = a < b ? (a < c ? a : c) : b < c ? b : c;
var middleNumber = a + b + c - bigNumber - smallNumber;
document.write(
    `Sắp xếp 3 số trên theo thứ tự tăng dần: ${smallNumber}, ${middleNumber}, ${bigNumber} `
);
