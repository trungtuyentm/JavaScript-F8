/* ============================== Bài 1 ============================== */
document.write(`<b>Bài 1</b> <br> 
Cho trước 1 mảng số nguyên, yêu cầu tìm số lớn nhất, nhỏ nhất trong mảng và vị trí <br>
<b>array = [3, 5, 8, 9, 2, 7]</b>
<br><br><br><b>Bài Làm</b>`);

var array = [3, 5, 8, 9, 2, 7];
var max = array[0];
var min = array.length;
var indexMax, indexMin;
if (array.length !== 0) {
    for (var index in array) {
        if (max < array[index]) {
            max = array[index];
            indexMax = +index;
        }
        if (min > array[index]) {
            min = array[index];
            indexMin = +index;
        }
    }
    document.write(
        "<br> Số lớn nhất trong mảng là " + max + ", vị trí = " + indexMax
    );
    document.write(
        "<br> Số nhỏ nhất trong mảng là " + min + ", vị trí = " + indexMin
    );
} else {
    document.write("<br>>>>Mảng không có giá trị nào<<<");
}

/* ============================== Bài 2 ============================== */
document.write(`<hr><br><b>Bài 2</b> <br> 
Cho trước 1 mảng số nguyên, tính trung bình các số nguyên tố trong mảng. Nếu trong mảng không có số nguyên tố thì hiển thị “Không có số nguyên tố” <br>
<b>numbers = [1, 8, 3, 5, 7, 9, -1]</b>
<br><br><br><b>Bài Làm</b><br>`);

var numbers = [1, 8, 3, 5, 7, 9, -1];

// Kiểm tra số nguyên tố
function isPrime(numbers) {
    if (
        numbers % 1 !== 0 ||
        numbers < 2 ||
        (numbers % 2 === 0 && numbers !== 2)
    ) {
        return false;
    }
    for (var i = 2; i <= Math.sqrt(numbers); i++) {
        if (numbers % i === 0) {
            return false;
        }
    }
    return true;
}
// console.log(isPrime(5));

var totalPrime = 0;
var averPrime = 0;
var listPrime = "";

if (numbers.length !== 0) {
    for (let i = 0; i <= numbers.length; i++) {
        if (isPrime(numbers[i])) {
            totalPrime += numbers[i];
            listPrime += numbers[i] + " ";
            averPrime++;
        }
    }

    if (averPrime !== 0) {
        document.write(
            `Số nguyên tố trong mảng trên là ${listPrime.trimEnd()} <br>
            <b>-></b> Trung bình các số nguyên tố trong mảng là <b>${
                totalPrime / averPrime
            }</b>`
        );
    } else {
        document.write(`--> Không có số nguyên tố`);
    }
} else {
    document.write("--> Mảng không có giá trị nào");
}

/* ============================== Bài 3 ============================== */
document.write(`<hr><br><b>Bài 3</b> <br> 
Cho trước 1 mảng bất kỳ, nếu trong mảng có các phần tử trùng nhau thì chỉ giữa lại 1 (Gọi là lọc trùng). In ra mảng sau khi đã xử lý <br>
<b>array = [2, 8, 3, 2, 1, 8, -2]</b>
<br><br><br><b>Bài Làm</b><br>`);

var array = [2, 8, 3, 2, 1, 8, -2];
var newArray = [];
function filterNumber() {
    for (var index in array) {
        if (!newArray.includes(array[index])) {
            newArray[newArray.length] = array[index];
        }
    }
    return newArray;
}
if (array.length !== 0) {
    document.write(
        `Mảng sau khi loại bỏ các giá trị trùng nhau <b>array = [${filterNumber()}]</b>`
    );
} else {
    document.write("<br>>>>Mảng không có giá trị nào<<<");
}

/* ============================== Bài 4 ============================== */
document.write(`<hr><br><b>Bài 4</b> <br> 
Cho trước 1 mảng số nguyên và thực hiện các yêu cầu sau: <br>

- Bước 1: Sắp xếp mảng theo thứ tự tăng dần <br>

- Bước 2: Chèn thêm 1 số vào bất kỳ vị trí nào trong mảng mà không làm thay đổi thứ tự sắp xếp của mảng<br>
<b>array = [1, 8, 3, 5, 6, 9, -2]</b>
<br><br><br><b>Bài Làm</b><br>`);

var array = [1, 8, 3, 5, 6, 9, -2];

// Sắp xếp theo thứ tự tăng dần
for (let i = 0; i < array.length; i++) {
    minIndex = i;
    for (let j = i + 1; j <= array.length; j++) {
        if (array[minIndex] > array[j]) {
            minIndex = j;
        }
    }
    if (minIndex !== i) {
        between = array[i];
        array[i] = array[minIndex];
        array[minIndex] = between;
    }
}
document.write(
    `- Sắp xếp mảng theo thứ tự tăng dần: <b>array = [${array}]</b><br>`
);
// Chèn số vào mảng
var element = 4;
var newArray = [];
var local = false;
var j = 0; // vị trí của element
for (var i = 0; i < array.length; i++) {
    if (!local && element < array[i]) {
        newArray[j++] = element;
        local = true;
    }
    newArray[j++] = array[i];
}
if (!local) {
    newArray[newArray.length - 1] = element;
    document.write(newArray);
}

document.write(
    `- chèn thêm số 4 vào mảng, ta có:  <b>array = [${newArray}]</b> <br> <br>`
);
