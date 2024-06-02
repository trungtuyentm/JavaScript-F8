/* ============================ Bài 1 ============================ */
document.write(`<b>Bài 1: N số fibonacci</b><br>
Hiển thị N số Fibonacci đầu tiên <br>

Ví dụ: Gán n = 10 sẽ hiển thị danh sách 10 số fibonacci <br>

Yêu cầu: Không dùng vòng lặp
<br><br><br><b>Bài Làm</b><br>`);

function fibonacci(n) {
    if (n <= 1 && n % 1 === 0) {
        return n;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}

// hiển thị chuỗi
function showFibonacci(n, current = 0) {
    if (current === n) {
        // Điều kiện dừng
        return;
    }
    document.write(`<b>${fibonacci(current)}</b>`);
    showFibonacci(n, current + 1);
}

const n = 5;
document.write(`Hiển thị <b>${n}</b> số Fibonacci đầu tiên là `);
showFibonacci(n);

/* ============================ Bài 2 ============================ */
document.write(`<hr><br><b>Bài 2: Đảo ngược số</b><br>
Viết hàm đảo ngược số nguyên với tham số là số cần đảo ngược <br>

Ví dụ: Khi gọi hàm và truyền đối số 12345 sẽ trả về kết quả 54321<br>

<br><br><b>Bài Làm</b><br>`);

var input = 123456;
var numberI = input;
var numberR = 0;
if (numberI % 1 === 0) {
    while (numberI > 0) {
        var lastNumber = numberI % 10; // Tìm số cuối
        numberR = numberR * 10 + lastNumber; // kết quả đảo ngược
        numberI = Math.floor(numberI / 10);
    }
    document.write(`Số ban đầu: <b>${input}</b><br>`);
    document.write(`Số sau khi đảo ngược: <b>${numberR}</b>`);
} else {
    document.write(`<b>Không hợp lệ</b>. Vui lòng nhập số nguyên`);
}

/* ============================ Bài 3 ============================ */
document.write(`<hr><br><b>Bài 3: Viết hàm chuyển số thành chữ</b><br>
Ví dụ: Số 4298 sẽ chuyển thành: Bốn ngàn hai trăm chín tám<br>

Ràng buộc: Số cần chuyển đổi có giá trị từ 0 đến 9999<br>

<br><br><b>Bài Làm</b><br>`);

function numberToWord(number) {
    const units = [
        "",
        "một",
        "hai",
        "ba",
        "bốn",
        "năm",
        "sáu",
        "bảy",
        "tám",
        "chín",
    ];
    const tens = [
        "",
        "mười",
        "hai mươi",
        "ba mươi",
        "bốn mươi",
        "năm mươi",
        "sáu mươi",
        "bảy mươi",
        "tám mươi",
        "chín mươi",
    ];
    const hundreds = [
        "",
        "một trăm",
        "hai trăm",
        "ba trăm",
        "bốn trăm",
        "năm trăm",
        "sáu trăm",
        "bảy trăm",
        "tám trăm",
        "chín trăm",
    ];
    const thousands = [
        "",
        "một nghìn",
        "hai nghìn",
        "ba nghìn",
        "bốn nghìn",
        "năm nghìn",
        "sáu nghìn",
        "bảy nghìn",
        "tám nghìn",
        "chín nghìn",
    ];

    if (number === 0) {
        return "không";
    }

    if (number < 10) {
        return units[number];
    }

    if (number < 100) {
        const ten = Math.floor(number / 10);
        const remains = number % 10;
        return tens[ten] + " " + units[remains];
    }

    if (number < 1000) {
        const hundred = Math.floor(number / 100);
        const remains = number % 100;
        return hundreds[hundred] + " " + numberToWord(remains);
    }

    if (number < 10000) {
        const thousand = Math.floor(number / 1000);
        const remains = number % 1000;
        return thousands[thousand] + " " + numberToWord(remains);
    }

    return "xin lỗi số hơi lớn rồi đấy";
}
var inputNumber = 987;
document.write(`Số cần chuyển: <b>${inputNumber} -------></b> `);
document.write(`<b>${numberToWord(inputNumber)}</b>`);
