/* ============================ Bài 1 ============================ */
document.write(`<b>Bài 1: Tính tiền taxi</b><br>
Tính tiền cước taxi dựa vào các điều kiện sau <br>
Số km ≤ 1 giá 15000đ <br>
1 < số km ≤ 5 giá 13500đ <br>
Số km > 5 giá 11000đ <br>
Nếu số km > 120 km sẽ được giảm 10% trên tổng số tiền <br>
<br><br><b>Bài làm</b> `);

var kilometer = 20;
var discount = 10;
var money;
document.write(`<br>Taximeter: <b>${kilometer}km</b>`);
if (kilometer > 0) {
    if (kilometer <= 1) {
        money = kilometer * 15000;
    } else if (kilometer > 1 && kilometer <= 5) {
        money = 1 * 15000 + (kilometer - 1) * 13500;
    } else {
        money = 1 * 15000 + 4 * 13500 + (kilometer - 5) * 11000;
    }
    if (kilometer > 120) {
        money =
            (1 * 15000 + 4 * 13500 + (kilometer - 5) * 11000) *
            (1 - discount / 100);
    }
    document.write(
        `<br>Tổng số tiền "thượng đế" cần thanh toán đi hết <b>${kilometer}km</b> là <b>${money} VND</b>`
    );
} else {
    document.write(`<br>Kilometer không hợp lệ (>0 Kilometer)`);
}

/* ============================ Bài 2 ============================ */
document.write(`<hr><br>
<b>Bài 2: Tính tiền điện</b>
<br>
<b>Input:</b> Số điện tiêu thụ hàng tháng
<br>
<b>Output:</b> Hiển thị số tiền phải đóng
<br>
Chi tiết giá điện theo bậc <br>
B1 ---> 0-50    ---> 1.678 <br>
B2 ---> 51-100  ---> 1.734 <br>
B3 ---> 101-200 ---> 2.014 <br>
B4 ---> 201-300 ---> 2.536 <br>
B5 ---> 301-400 ---> 2.834 <br>
B6 ---> >= 401  ---> 2.927 <br>
<br><br><b>Bài làm</b>`);

var kWh = 500;
var totalMoney;
document.write(`<br>Electric Meter: <b>${kWh}kWh</b>`);

if (kWh > 0) {
    if (kWh <= 50) {
        totalMoney = kWh * 1678;
    } else if ((kWh >= 51) & (kWh <= 100)) {
        totalMoney = 50 * 1678 + (kWh - 50) * 1734;
    } else if ((kWh >= 101) & (kWh <= 200)) {
        totalMoney = 50 * 1678 + 50 * 1734 + (kWh - 100) * 2014;
    } else if ((kWh >= 201) & (kWh <= 300)) {
        totalMoney = 50 * 1678 + 50 * 1734 + 100 * 2014 + (kWh - 200) * 2536;
    } else if ((kWh >= 301) & (kWh <= 400)) {
        totalMoney =
            50 * 1678 +
            50 * 1734 +
            100 * 2014 +
            100 * 2536 +
            (kWh - 300) * 2834;
    } else {
        totalMoney =
            50 * 1678 +
            50 * 1734 +
            100 * 2014 +
            100 * 2536 +
            100 * 2834 +
            (kWh - 400) * 2927;
    }
    document.write(
        `<br>Tổng số tiền điện "thượng đế" phải đóng khi sử dụng <b>${kWh}kWh</b> là <b>${totalMoney} VND</b>`
    );
} else {
    document.write(`Số điện không hợp lệ (>0 số)`);
}

/* ============================ Bài 3 ============================ */
document.write(`<hr><br>
<b>Bài 3: Tính giá trị biểu thức</b>
<br>
Cho trước số nguyên n. Tính giá trị biểu thức sau
<br>
S= 1*2 + 2*3 + 3*4 + ... + n*(n+1)
<br><br><b>Bài làm</b>`);

var n = 3;
var sum = 0;
document.write(`<br>Chọn n = ${n};`);
if (n > 0) {
    for (var i = 1; i <= n; i++) {
        sum += i * (i + 1);
    }
    document.write(`<br>S= 1*2 + 2*3 + 3*4 + ... + n*(n+1) = ${sum}`);
} else {
    document.write(`<br><b>Không hợp lệ (n >0) </b>`);
}

/* ============================ Bài 4 ============================ */
document.write(`<hr><br>
<b>Bài 4: Viết hàm kiểm tra số nguyên tố</b>
<br>
Viết 1 hàm kiểm tra 1 số có phải số nguyên tố hay không?
<br>
- Hàm có 1 tham số là số cần kiểm tra
<br>
- Hàm có giá trị trả về
<br> 
- Gọi hàm trong câu điều kiện if else
<br><br><b>Bài làm</b><br>`);

var x = 2;
var count = 0;
document.write(`<br>Chọn x = ${x};`);

function isPrime(x) {
    for (var i = 1; i <= x; i++) {
        if (x % 1 === 0 && x % i === 0) {
            count++;
        }
    }
    if (count === 2) {
        return true;
    } else {
        return false;
    }
}
if (isPrime(x)) {
    document.write(` ------> <b>${x} là số nguyên tố</b>`);
} else {
    document.write(` ------> <b>${x} Không phải là số nguyên tố</b>`);
}

/* ============================ Bài 5 ============================ */
document.write(`<hr><br>
<b>Bài 5: Vẽ tam giác số</b>
<br>
Vẽ tam giác số sau với N dòng <br>
1              <br>

2 3            <br>

4 5 6          <br>

7 8 9 10       <br>

11 12 13 14 15 <br>
<br><br><b>Bài làm</b><br>`);

var N = 5;
var number = 1;
document.write(`Vẽ hình tam giác với ${N} dòng <br>`);

for (var i = 1; i <= N; i++) {
    var row = ` `;
    for (var j = 1; j <= i; j++) {
        row += number + ` `;
        number++;
    }
    document.write(row + `<br>`);
}

/* ============================ Bài 6 ============================ */
document.write(`<hr><br>
<b>Bài 6: Vẽ bàn cờ vua</b> 
<br>Học viên sử dụng kiến thức đã học về vòng lặp, câu lệnh rẽ nhánh để vẽ bàn cờ vua<br>`);

document.addEventListener("DOMContentLoaded", () => {
    const chessBoard = document.getElementById("mainChessBoard");
    for (var i = 0; i < 64; i++) {
        row = Math.floor(i / 8);
        col = i % 8;

        const square = document.createElement("div");
        if ((row + col) % 2 === 0) {
            square.style.backgroundColor = "#D18B47";
        } else {
            square.style.backgroundColor = "#fff";
        }
        chessBoard.appendChild(square); // Thêm ô cờ vào bàn cờ
    }
});
/* ============================ Bài 7 ============================ */
document.write(`<br>
<b>Bài 7: Vẽ bảng cửu chương</b> 
<br>Học viên sử dụng kiến thức đã học để vẽ bảng cửu chương từ 1 đến 10<br>
<br><br><b>Bài làm</b><br>`);

document.write(`<table border = 3px>`);
for (var a = 1; a <= 10; a++) {
    document.write(`<tr style = height:30px>`);
    for (var b = 1; b <= 10; b++) {
        document.write(`<td style = width:30px>` + a * b + `</td>`);
    }
}
