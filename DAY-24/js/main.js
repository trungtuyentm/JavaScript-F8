/* ============================== BÀI 1 ============================== */
document.write(`<b>Bài 1:</b> <br>
var errors = { <br>
    name: {<br>
    ----required: "Vui lòng nhập họ tên",<br>
    ----min: "Họ tên phải từ 5 ký tự"<br>
    },<br>
    email: {<br>
    ----email: "Định dạng email không hợp lệ",<br>
    ----unique: "Email đã có người sử dụng",<br>
    ----required: "Vui lòng nhập địa chỉ email"<br>
    },<br>
    password: {<br>
    ----required: "Vui lòng nhập mật khẩu",<br>
    ----same: "Mật khẩu phải khớp với mật khẩu nhập lại"<br>
    }<br>
}<br>
<b>Yêu cầu: Viết hàm getError(field) có tham số truyền vào là field tương ứng với nhóm cần lấy lỗi. Tuy nhiên, chỉ trả về 1 chuỗi là lỗi đầu tiên tìm được(lỗi đầu tiên đúng) của 1 nhóm, mặc định là require.</b>
<br><br><b>Bài làm</b>`);

var errors = {
    name: {
        required: "Vui lòng nhập họ tên",
        min: "Họ tên phải từ 5 ký tự",
    },
    email: {
        email: "Định dạng email không hợp lệ",
        unique: "Email đã có người sử dụng",
        required: "Vui lòng nhập địa chỉ email",
    },
    password: {
        required: "Vui lòng nhập mật khẩu",
        same: "Mật khẩu phải khớp với mật khẩu nhập lại",
    },
};
function getError(field) {
    var inputField = field.split(".");
    var group = inputField[0];
    var specificError = inputField[1];
    var errorGroup = errors[group];

    if (errorGroup) {
        if (specificError) {
            return errorGroup[specificError] || "Không tồn tại lỗi";
        } else {
            return errorGroup.required;
        }
    } else {
        return "Không tồn tại lỗi";
    }
}
document.write(`<br>Ta có kết quả: 
    <br> - getError("name") // <b>${getError("name")}</b>
    <br> - getError("email") // <b>${getError("email")}</b>
    <br> - getError("password") // <b>${getError("password")}</b><br>
    <br> - getError("name.min") // <b>${getError("name.min")}</b>
    <br> - getError("name.2308") // <b>${getError("name.2308")}</b>
    `);

/* ============================== BÀI 2 ============================== */
document.write(`<hr><br><b>Bài 2:</b> <br>
Viết 1 hàm trả về 1 đối tượng có 3 thuộc tính: name, age, address <br>
Sau đó viết một hàm nhận vào một mảng chứa nhiều đối tượng để khởi tạo ra một mảng mới <br> chứa các đối tượng có cấu trúc như trên. <br>
Kết quả trả về là một mảng chứa tất cả thông tin của các đối tượng đó được sắp xết tăng dần <br> theo tuổi và thêm một thuộc tính mới là shortName của mỗi đối tượng. <br><br>
<b>Input:</b> <br>
const customers = [ <br>
  { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },<br>
  { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },<br>
  { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },<br>
]; <br>
const result = createCustomers(customers); // Tạo hàm createCustomers này. return về mảng mới.<br> <br>
<b>Output:</b><br>
result = [<br>
  { name: "Nguyễn Văn B", age: 2, address: "Hai Phong", shortName: "Nguyễn B" },<br>
  { name: "Nguyễn Văn A", age: 11, address: "Ha Noi", shortName: "Nguyễn A" },<br>
  { name: "Nguyễn Văn C", age: 12, address: "TP.HCM", shortName: "Nguyễn C" },<br>
];<br>`);

const customers = [
    { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
    { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
    { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
];
var Person = function (name, age, address) {
    this.name = name;
    this.age = age;
    this.address = address;
};

function createCustomers(clients) {
    return clients
        .map(function (value) {
            const partName = value.name.split(" ");
            const firstName = partName[partName.length - 1];
            const lastName = partName[0];
            const user = new Person(value.name, value.age, value.address);
            user.shortName = `${lastName} ${firstName}`;
            return user;
        })
        .sort(function (a, b) {
            return a.age - b.age;
        });
}
console.log(createCustomers(customers));

/* ============================== BÀI 3 ============================== */
document.write(`<hr><br><b>Bài 3:</b> <br>
Viết 1 hàm trả về 1 đối tượng có 3 thuộc tính: name, password và email.<br>
Tạo một hàm register nhận vào nhiều tham số để khởi tạo ra một mảng chứa các đối tượng có cấu<br> trúc như trên.
Yêu cầu:<br>
Kiểm tra tất cả thông tin có đầy đủ không, nếu không đủ, báo lỗi và dừng chương trình.<br>
Nếu đăng ký thêm một lần nữa, phải trả về được thông tin 2 người.<br>
Tự động thêm role là user cho mỗi đối tượng.<br>
Tạo một hàm login nhận vào 2 tham số email và password.<br>
Yêu cầu:<br>
Nếu thông tin hợp lệ với một trong các đối tượng đã đăng ký, trả về thông tin của đối tượng đó.<br>
Nếu không, báo cho người dùng rằng “Thông tin đăng nhập không hợp lệ”.<br><br>

<b>Input:</b><br>
const data = [];<br>
const dataRegister = handleRegister(<br>
 ----"Nguyen Van A",<br>
 ----"123456",<br>
 ----"nguyenvana@email.com"<br>
);<br>
const dataRegister = handleRegister(<br>
 ----"Nguyen Van B",<br>
 ----"1234567",<br>
 ----"nguyenvanb@email.com"<br>
);<br>
const dataLogin = handleLogin("nguyenvanb@email.com", "1234567");<br><br>

<b>Output:</b><br>
data = [<br>
  {<br>
 ----name: "Nguyen Van A",<br>
 ----password: "123456",<br>
 ----email: "nguyenvana@email.com",<br>
 ----role: "user",<br>
  },<br>
  {<br>
 ----name: "Nguyen Van B",<br>
 ----password: "1234567",<br>
 ----email: "nguyenvanb@email.com",<br>
 ----role: "user",<br>
  },<br>
];<br>
dataLogin = {<br>
 ----name: "Nguyen Van B",<br>
 ----password: "1234567",<br>
 ----email: "nguyenvanb@email.com",<br>
 ----role: "user",<br>
};<br>`);

// Create User
function createUser(name, password, email) {
    return {
        name: name,
        password: password,
        email: email,
        role: "User",
    };
}

// Register User
const data = [];
function handleRegister(name, password, email) {
    if (!name || !password || !email) {
        console.log(`Thông tin không đầy đủ`);
    } else {
        return data.push(createUser(name, password, email));
    }
}

// Login User
function handleLogin(email, password) {
    const user = data.find(function (value) {
        return value.email === email && value.password === password;
    });

    if (user) {
        return user;
    } else {
        console.log("Thông tin đăng nhập không hợp lệ");
    }
}

// input data
const dataRegister1 = handleRegister(
    "Nguyen Van A",
    "123456",
    "nguyenvana@email.com"
);
const dataRegister2 = handleRegister(
    "Nguyen Van B",
    "1234567",
    "nguyenvanb@email.com"
);

// Login data
const dataLogin1 = handleLogin("nguyenvana@email.com", "123456");
const dataLogin2 = handleLogin("nguyenvanb@email.com", "1234567");

// Output to console
console.log(dataRegister1);
console.log(dataRegister2);
console.log(dataLogin1);
console.log(dataLogin2);
