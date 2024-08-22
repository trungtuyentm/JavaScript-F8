import { requestLogin } from "./http.js";

const homePage = document.querySelector(".home");
const loginRegister = document.querySelector(".login-register");

const handleLogOut = () => {
    const logOutBtn = document.querySelector(".log-out");
    if (logOutBtn) {
        logOutBtn.addEventListener("click", function () {
            localStorage.removeItem("user_token");
            renderHomePage();
        });
    }
};

const renderHomePage = () => {
    const token = localStorage.getItem("user_token");
    if (token) {
        homePage.innerHTML = `
        <div class="home-inner">
            <header>
                <h2 class="title">Welcome to Vietnam mechanical keyboard market</h2>
                <h3>What is a custom keyboard? Things to consider when building a custom keyboard for beginners</h3>
                <span>August 22, 2024</span>
            </header>
            <main>
                <p>Custom mechanical keyboards are always a topic that keyboard players are interested in with many interesting things that normal keyboards do not have such as unique design, extremely good typing feeling, optional switches, keyboard materials that you want, etc. With many advantages like that, custom keyboards are always the first choice of long-time keyboard players. So for those who are new to playing custom keyboards, what should they pay attention to?</p>

                <h3>What is a custom mechanical keyboard?</h3>
                <p>Custom mechanical keyboards are keyboards that allow you to flexibly customize components such as switches, plates, cases, and keycaps according to your preferences and personal needs. Custom keyboards come in two popular forms: a keyboard kit that includes a case, key plate, and sound-absorbing foam. Users only need to buy switches and keycaps when they buy it. The second form is for users to build from start to finish, such as: ordering printed PCB circuits, cases, key plates according to the layout the user wants, and many other things.</p>

                <img src="https://siliconz.vn/storage/images/ban-phim-co-custom-2048x1152.jpg" >

                <h3>Before choosing a keyboard kit or building a mechanical keyboard yourself, pay attention to the following points:</h3>
                <div class="sub-title">
                    <h4>• Layout</h4>
                    <p>When preparing to build a mechanical keyboard, according to the author, the layout is the first thing you should care about because it is the thing that greatly affects the characteristics of a keyboard. From the way you use the keys to the price when buying components and the convenience when playing keycaps... All are decided by the layout.</p>
                    <p>If you are a beginner and want to save as much money as possible and easily find replacement parts, you can aim for the 60% layout. This is an extremely popular layout standard in the low-cost and mid-range segments, so components for this layout are usually not difficult to find, and the price is also very reasonable. The 60% layout is also quite neat and relatively easy to get used to.</p>
                    <img src= "https://siliconz.vn/storage/images/layout-phim.jpg" class="layout">

                </div>
                <div class="sub-title">
                    <h4>• Case</h4>
                    <p>The stiffer and heavier the case, the more stable and solid your bottoming out will be. In the mid-range and low-cost segment, solid aluminum cases are very popular. Slightly more expensive will have aluminum cases with copper weights to increase the mass and stability of the case.</p>
                    <p>In addition, there are also less popular materials such as acrylic (transparent to show the LED under the chassis), wood (unique, personality, eliminates the possibility of electrical leakage), plastic (super cheap, suitable for beginners).</p>
                    <img src= "https://siliconz.vn/storage/images/case.jpg">

                </div>
                <div class="sub-title">
                    <h4>• Plate</h4>
                    <p>Like the case, the plate is also made from many different materials such as copper, aluminum, mica, carbon... In which, aluminum and copper plates are quite popular and easy to find, in which copper plates are usually about 2.5-3 times more expensive than aluminum plates, but give a typing feeling that many people consider to be better. Non-metallic plate materials such as plastic, mica, carbon... are less popular.</p>
                    <img src= "https://siliconz.vn/storage/images/plate-phim.jpg">
                </div>
                <div class="sub-title">
                    <h4>• Switch</h4>
                    <p>Once you have entered the custom keyboard game, it is also the time when the branded keyboards are no longer good enough for you. You can think of new types of switches, in addition to the basic types such as red, brown, blue to have a more interesting experience. Instead of just stuck with the too familiar Cherry switches, maybe you can find new joy from Gateron, Kailh, Holy Panda... What then?</p>
                    <img src= "https://siliconz.vn/storage/images/switch-ban-phim-co.jpg">
                </div>
                <div class="sub-title">
                    <h4>• Keycap</h4>
                    <p>For playing custom mechanical keyboards, keycaps are also a very interesting area, the cost of buying quality keycaps and individual keycaps can easily exceed the initial investment cost of buying the keyboard. In fact, building custom mechanical keyboards does not necessarily require several sets of keycaps and a bunch of unique and strange individual keycaps, but having them will make your gameplay much more exciting.</p>
                    <img src= "https://siliconz.vn/storage/images/XU-00424-2048x1365.jpg">
                    <p>And those are the points to note before you want to choose to buy a keyboard kit or build a unique mechanical keyboard for yourself. For newbies, you need to pay attention to choosing the necessary components that fit your budget to suit your needs.</p>
                </div>
            </main>
            <div><a href="#!" class="log-out">Log Out</a></div>
        </div>`;
        homePage.style.display = "block";
        loginRegister.style.display = "none";
        handleLogOut();
    } else {
        homePage.innerHTML = `<nav>
        <div class="logo">
            <a href=""
                ><img src="./assets/img/facebook.png" alt=""
            /></a>
            <div class="search">
                <input
                    class="search-input"
                    type="text"
                    name=""
                    id=""
                    placeholder="Search on Facebook"
                />
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
        <div class="communicate">
            <ul>
                <li><i class="fa-solid fa-house"></i></li>
                <li><i class="fa-solid fa-tv"></i></li>
                <li><i class="fa-solid fa-store"></i></li>
                <li><i class="fa-solid fa-people-group"></i></li>
            </ul>
        </div>
        <div class="action">
            <button class="register">Register</button>
            <button class="login">Login</button>
        </div>
    </nav>

    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="container-inner">
                <div class="cover">
                    <img src="./assets/img/cover.jpg" alt="" />
                </div>
                <div class="title">
                    <div class="name">
                        <div class="name-group">
                            Vietnam mechanical keyboard market ✅
                        </div>
                        <div class="private">
                            <span class="status-group"
                                >Private Group •
                                <span class="number-member"
                                    >35.8K members</span
                                ></span
                            >
                        </div>
                    </div>
                    <div class="action">
                        <button class="action-share">
                            <i class="fa-solid fa-share"></i> Share
                        </button>
                        <button class="action-menu">
                            <i class="fa-solid fa-chevron-down"></i>
                        </button>
                    </div>
                </div>
                <ul>
                    <li class="introduce">Introduce</li>
                    <li class="discuss">Discuss</li>
                </ul>
            </div>
        </div>
    </header>

    <!-- main -->
    <main class="main">
        <section class="section">
            <div class="subject">About this group</div>
            <div class="info">
                <div class="take-part-in">
                    <div class="member">
                        Group: 293K members. 397 post/day.
                    </div>
                    <div class="unread">219 unread posts</div>
                </div>
                <div class="info-summary">
                    <div class="status">
                        <div class="symbol">
                            <i class="fa-solid fa-lock"></i>
                        </div>
                        <div class="desc">
                            <span>Private</span>
                            <span
                                >Only members can see everyone in the
                                group and what they post.</span
                            >
                        </div>
                    </div>
                    <div class="status">
                        <div class="symbol">
                            <i class="fa-solid fa-eye"></i>
                        </div>
                        <div class="desc">
                            <span>Display</span>
                            <span>Anyone can find this group.</span>
                        </div>
                    </div>
                    <div class="status">
                        <div class="symbol">
                            <i class="fa-solid fa-clock"></i>
                        </div>
                        <div class="desc">
                            <span>History</span>
                            <span
                                >Group created on October 28, 2016. Last
                                name changed on October 16, 2023.</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="subject">Admin group rules</div>
            <div class="rules">
                <div class="rule-number">
                    <div>1. Missing Name Tag or Invalid Name Tag</div>
                    <div>
                        Sales posts must have a nametag including - Name
                        matches Facebook name - Date / month / year of
                        taking photo (posting date must not exceed 30
                        days from the date on the nametag)
                    </div>
                </div>
                <div class="rule-number">
                    <div>2. Missing product price</div>
                    <div>
                        Need to price each product on the sales post
                    </div>
                </div>
                <div class="rule-number">
                    <div>3. No spam</div>
                    <div>
                        Duplicate content posts / selling the same
                        product can only be posted once a week. To
                        create interaction, just highlight old posts to
                        avoid spam. The group prioritizes quality posts
                        over quantity.
                    </div>
                </div>
            </div>
        </section>
    </main>`;
        homePage.style.display = "block";
        loginRegister.style.display = "none";

        const loginBtn = document.querySelector(".home .action .login");
        const registerBtn = document.querySelector(".home .action .register");

        if (loginBtn && registerBtn) {
            loginBtn.addEventListener("click", function () {
                homePage.style.display = "none";
                loginRegister.style.display = "block";
                renderFormLoginRegister(loginBtn);
            });

            registerBtn.addEventListener("click", function () {
                homePage.style.display = "none";
                loginRegister.style.display = "block";
                renderFormLoginRegister(registerBtn);
            });
        }
    }
};
renderHomePage();

const renderFormLoginRegister = (data) => {
    loginRegister.innerHTML = "";

    if (data.classList.contains("login")) {
        const loginUser = document.createElement("div");
        loginUser.className = "login-user";
        loginUser.innerHTML = `
                <h3>Login</h3>
                <div class = "msg"></div>
                <form action="" class="login">
                    <input type="email" name="email" placeholder="Email" />
                    <input type="password" name="password" placeholder="Password" />
                    <button class="login-form">Login</button>
                </form>
                <span
                    >Don't have an account?
                    <button class="register">Register</button>
                </span>
                <button class="go-to-home">Go to Home</button>
                <div class="message">For reasons not yet completed. You can use: <span>Email: john@mail.com -  Password: changeme</span></div>
                `;
        loginRegister.append(loginUser);

        handleLoginForm();
        handleFormSwitch();
        gotoHome();
    }
    if (data.classList.contains("register")) {
        const registerUser = document.createElement("div");
        registerUser.className = "register-user";
        registerUser.innerHTML = `        
                <h3>Register</h3>
                <div class = "msg"></div>
                <form action="" class="login">
                    <input type="text" name="username" placeholder="Username" />
                    <input type="email" name="email"  placeholder="Email" />
                    <input type="password" name="password"  placeholder="Password" />
                    <button class="register-form">Register</button>
                </form>
                <span
                    >Already have an account?<button class="login">
                        Login
                    </button>
                </span>
                <button class="go-to-home">Go to Home</button>
                <div class="message">The function is under maintenance and upgrading. Please visit again later.</div>
                `;
        loginRegister.append(registerUser);
        // handleRegisterForm();
        handleFormSwitch();
        gotoHome();
    }
};

const handleLoginForm = () => {
    loginRegister.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (e.target.classList.contains("login")) {
            const loginInForm = e.target.querySelector("button");
            loginInForm.innerHTML = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> <span class="loading">Loading...</span>`;
            loginInForm.disabled = true;

            const msgEl = document.querySelector(".msg");
            msgEl.innerText = "";
            const dataLogin = Object.fromEntries(new FormData(e.target));
            const response = await requestLogin(dataLogin);

            loginInForm.innerText = `Login`;
            loginInForm.disabled = false;
            if (!response) {
                msgEl.innerHTML = `
                <div class="alert alert-danger text-center">Incorrect Email or Password</div>
                `;
            } else {
                localStorage.setItem("user_token", JSON.stringify(response));
                e.target.reset(); //Clear form data
                renderHomePage();
            }
        }
    });
};

const handleRegisterForm = () => {
    loginRegister.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (e.target.classList.contains("register")) {
            const registerForm = e.target.querySelector("button");
            registerForm.innerHTML = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> <span class="loading">Loading...</span>`;
            registerForm.disabled = true;

            const msgEl = document.querySelector(".msg");
            msgEl.innerText = "";
            const dataRegister = Object.fromEntries(new FormData(e.target));
            const response = await requestRegister(dataRegister);

            registerForm.innerText = `Register`;
            registerForm.disabled = false;
            if (!response) {
                msgEl.innerHTML = `<div class="alert alert-danger text-center">Registration failed</div>`;
            } else {
                localStorage.setItem("user_token", JSON.stringify(response));
                e.target.reset(); // Clear form data
                renderHomePage();
            }
        }
    });
};

handleLoginForm();
// handleRegisterForm();

const handleFormSwitch = () => {
    const loginSwitchBtn = document.querySelector(
        ".login-user span button.register"
    );
    if (loginSwitchBtn) {
        loginSwitchBtn.addEventListener("click", () => {
            renderFormLoginRegister(loginSwitchBtn);
        });
    }

    const registerSwitchBtn = document.querySelector(
        ".register-user span button.login"
    );
    if (registerSwitchBtn) {
        registerSwitchBtn.addEventListener("click", () => {
            renderFormLoginRegister(registerSwitchBtn);
        });
    }
};

const gotoHome = () => {
    const goToHomeBtn = document.querySelector(".go-to-home");
    if (goToHomeBtn) {
        goToHomeBtn.addEventListener("click", function () {
            homePage.style.display = "block";
            loginRegister.style.display = "none";
        });
    }
};
