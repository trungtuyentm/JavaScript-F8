/* ======================================== Bài 1 ======================================== */
document.write(`<b>Bài 1:</b> <br>
Cho một số nguyên n, trả về số nguyên tố đối xứng nhỏ nhất lớn hơn hoặc bằng n. <br>
Lưu ý rằng 1 không phải là số nguyên tố.
<br><br><br><b>Bài làm</b><br>`);

// Tìm số đối xứng
var isSymmetry = function (k) {
    let number = k.toString();
    let reverseNumber = number.split("").reverse().join("");
    return number === reverseNumber;
};

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

// số nguyên tố đối xứng nhỏ nhất lớn hơn hoặc bằng n
var isPrime_symmetry_smallest = function (h) {
    let currentNumber = h;
    while (true) {
        if (isSymmetry(currentNumber) && isPrime(currentNumber)) {
            return currentNumber;
        }
        currentNumber++;
    }
};
n = 4;
document.write(
    `Ta có: n = ${n} <br>---> Số nguyên tố đối xứng nhỏ nhất là ${isPrime_symmetry_smallest(
        n
    )} `
);
n = 8;
document.write(
    `<br><br>Ta có: n = ${n} <br>---> Số nguyên tố đối xứng nhỏ nhất là ${isPrime_symmetry_smallest(
        n
    )} `
);
n = 16;
document.write(
    `<br><br>Ta có: n = ${n} <br>---> Số nguyên tố đối xứng nhỏ nhất là ${isPrime_symmetry_smallest(
        n
    )} `
);

/* ======================================== Bài 2 ======================================== */
document.write(`<hr><br><b>Bài 2:</b> <br>
Cho hai mảng đã sắp xếp number1 và number2 có kích thước lần lượt là m và n, trả về trung vị của hai mảng đã sắp xếp đó.<br>
VD: number1 = [2,5,7,9], number2 = [3,6,8,1]
    <br><br><br><b>Bài làm</b><br>`);

var number1 = [2, 5, 7, 9];
var number2 = [3, 6, 8, 1];

// Hàm tìm trung vị
var isMedian = function (h, k) {
    let newArray = h.concat(k).sort(function (a, b) {
        return a - b;
    });
    document.write(
        `Sau khi hợp 2 mảng thành 1, ta có: <br> <b>---> NewArray = [${newArray}]</b>`
    );

    let n = newArray.length;
    let midPosition = Math.floor(n / 2);
    console.log(midPosition);
    if (n % 2 === 0) {
        return (newArray[midPosition - 1] + newArray[midPosition]) / 2;
    } else {
        return newArray[midPosition];
    }
};

document.write(
    `<br> Vậy trung vị của 2 mảng sau đã sắp xếp là <b>${isMedian(
        number1,
        number2
    )}</b>`
);

/* ======================================== Bài 3 ======================================== */
document.write(`<hr><br><b>Bài 3:</b> <br>
Cho một mảng số nguyên chưa được sắp xếp nums. Hãy trả về số nguyên dương nhỏ nhất không có trong nums. <br>
VD: numbers = [7,6,5,9,12,3]
<br><br><br><b>Bài làm</b><br>`);

numbers = [7, 6, 5, 9, 12, 3];
var smallestPositionInteger = function () {
    var newNumbers = numbers.sort(function (a, b) {
        return a - b;
    });
    document.write(
        `Sau khi sắp xếp, ta có: <br> <b>---> NewArray = [${newNumbers}]</b><br>`
    );
    var smallest_position_integer = 1;

    for (var value of newNumbers) {
        if (value <= 0) {
            continue;
        }
        if (value === smallest_position_integer) {
            smallest_position_integer++;
        }
    }
    return smallest_position_integer;
};
document.write(
    `Số nguyên dương nhỏ nhất không có trong mảng trên là <b>${smallestPositionInteger()}</b>`
);
