import { client } from "./client.js";
import { config } from "./config.js";
import toast from "./toast.js";
const { SERVER_API_AUTH } = config;

client.setUrl(SERVER_API_AUTH);

const app = {
    root: document.querySelector("#root"),
    query: {
        page: 1,
        limit: 10,
    },

    isLogin: function () {
        let token = localStorage.getItem("login_token");
        let accessToken;

        if (token) {
            accessToken = JSON.parse(token).accessToken;
        }
        const status = accessToken ? true : false;
        if (!status) {
            localStorage.removeItem("login_token");
        }

        return status;
    },

    scrollable: true,
    render: function () {
        let html;

        if (this.isLogin()) {
            html = `
        <div class="container py-3">
            <h2 class="text-center">WELCOME BACK</h2>
            <ul class="profile list-unstyled d-flex gap-3">
          <li>Hello: <span class="name">Loading...</span></li>
          <li><a href="#" class="text-decoration-none logout">Logout</a></li>
        </ul>
        <div class="w-100">
          <form action="" class="write-post">
            <div class="mb-3">
              <label for="">Enter your title</label>
              <input type="text" name="title" class="form-control title" placeholder="Title..." required/>
            </div>
            <div class="mb-3">
              <label for="">Enter your content</label>
              <textarea class="form-control content" rows="3" placeholder="Content..." required></textarea>
            </div>
            <div class="mb-3">
              <label for="">Set time to post</label>
              <input type="date" class="form-control date">
            </div>
            <div class="mb-3">
              <button class="btn btn-primary" type="submit">Write new !</button>
            </div>
          </form>
        </div>
      </div>
        `;
            this.getProfile();
        } else {
            html = `
      <div class="container py-3">
        <div class="row">
          <div class="">
            <button class="btn btn-primary login-btn">Đăng nhập</button>
          </div>
        </div>
      </div>
      `;
        }
        html += `<div class="posts container py-3"></div>`;

        this.root.innerHTML = html;
        this.scrollable = true;
        this.query.page = 1;
        this.getPosts(this.query);
    },
    renderPosts: function (posts) {
        const postsEl = this.root.querySelector(".posts");

        posts.forEach((post) => {
            const postEl = document.createElement("div");
            postEl.classList.add("post", "w-100");

            let date = new Date(post.createdAt);
            let oldTimestamp = date.getTime();
            let timestamp = new Date().getTime();

            let relativeTime = this.getTimeRelative(timestamp, oldTimestamp);
            postEl.innerHTML = `
      <a class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="#">
        <span class="username" data-user-id="${post.userId._id}">@${
                post.userId.name
            }</span>
      </a>
      <h3>${post.title}</h3> 
      <p>${this.loadMore(this.regexLink(post.content))}</p>
      <div class="mb-3">
        <span><i>${relativeTime}</i></span>
        <span>•</span>
        <span>${date.getHours()} giờ ${date.getMinutes()} phút</span>
      </div>
      <a class="link-underline-primary blog-detail" href="#" data-blog-id="${
          post._id
      }">#View more ${post.title}</a>
      <hr />
      `;

            postsEl.append(postEl);
        });
    },

    getTimeRelative: function (timestamp, oldTimestamp, timePost = false) {
        const seconds = Math.floor(timestamp / 1000);
        oldTimestamp = Math.floor(oldTimestamp / 1000);

        const difference = seconds - oldTimestamp;
        let output = ``;
        if (difference < 60) {
            output = `${difference} giây ${timePost ? `sau` : `trước`}`;
        } else if (difference < 3600) {
            output = `${Math.floor(difference / 60)} phút ${
                timePost ? `sau` : `trước`
            }`;
        } else if (difference < 86400) {
            output = `${Math.floor(difference / 3600)} giờ ${
                timePost ? `sau` : `trước`
            }`;
        } else if (difference < 2620800) {
            output = `${Math.floor(difference / 86400)} ngày ${
                timePost ? `sau` : `trước`
            }`;
        } else if (difference < 31449600) {
            output = `${Math.floor(difference / 2620800)} tháng ${
                timePost ? `sau` : `trước`
            }`;
        } else {
            output = `${Math.floor(difference / 31449600)} năm ${
                timePost ? `sau` : `trước`
            }`;
        }

        return output;
    },

    getPosts: async function (query = {}) {
        let queryString = new URLSearchParams(query).toString();
        queryString = queryString ? "?" + queryString : "";
        const { response, data } = await client.get(`/blogs${queryString}`);
        const { data: posts } = data;
        if (posts.length) {
            const loadDiv = this.root.querySelector(".loader");
            if (loadDiv) {
                loadDiv.remove();
            }
            this.renderPosts(posts);
        }
    },

    loadMore: function (content) {
        content =
            content.slice(
                0,
                content.indexOf(
                    "<br>",
                    content.indexOf("<br>", content.indexOf("<br>") + 1) + 1
                )
            ) + `<br><span style="font-style: italic">...Còn tiếp</span>`;

        return content;
    },

    regexLink: function (content) {
        const patternLink =
            /(?!\S+youtube\.com)((?<!\S)(((f|ht){1}tp[s]?:\/\/|(?<!\S)www\.)([-a-zA-Z0-9@:%_\+.~#?&\/\/=]+)))/gi;
        const patternPhone = /((0|\+84)\d{9})/g;
        const patternEmail = /([\w\.-]{3,}@[\w\.-]{1,}\.[a-z]{2,})/g;
        const patternYoutube =
            /(?:https:\/\/www\.youtube\.com\/watch\?v=([\w-]+)(?:&[\w-]+=[\w-]+)*)|(?:https:\/\/youtu\.be\/([\w-]+))/g;
        const patternLine = /\n+/g;
        const patternSpace = /\s+/g;
        content = content
            .replace(patternPhone, `<a href="tel:$1">$1</a>`)
            .replace(patternEmail, `<a href="mailto:$1">$1</a>`)
            .replace(
                patternYoutube,
                `<iframe src="https://www.youtube.com/embed/$1" width="387" height="218"></iframe>`
            )
            .replace(patternLink, `<a href="//$5" target="_blank">$1</a>`)
            .replace(patternLine, "<br>")
            .replace(patternSpace, " ");

        return content;
    },

    addEvent: function () {
        this.root.addEventListener("submit", (e) => {
            e.preventDefault();
            if (e.target.classList.contains("login")) {
                const emailEl = e.target.querySelector(".email");
                const passwordEl = e.target.querySelector(".password");

                const email = emailEl.value;
                const password = passwordEl.value;

                this.login({ email, password });
            }
            if (e.target.classList.contains("register")) {
                const nameEl = e.target.querySelector(".name");
                const emailEl = e.target.querySelector(".email");
                const passwordEl = e.target.querySelector(".password");

                const name = nameEl.value;
                const email = emailEl.value;
                const password = passwordEl.value;

                this.register({ email, password, name });
            }
            if (e.target.classList.contains("write-post")) {
                const titleEl = e.target.querySelector(".title");
                const contentEl = e.target.querySelector(".content");

                const title = titleEl.value;
                const content = contentEl.value;

                this.writePost({
                    title,
                    content,
                });
            }
        });

        this.root.addEventListener("click", (e) => {
            if (e.target.classList.contains("logout")) {
                e.preventDefault();
                this.logout();
            }
            if (e.target.classList.contains("login-btn")) {
                e.preventDefault();
                this.scrollable = false;
                this.renderLoginForm();
            }
            if (e.target.classList.contains("register-btn")) {
                e.preventDefault();
                this.scrollable = false;
                this.renderRegisterForm();
            }
            if (e.target.classList.contains("login-back")) {
                e.preventDefault();
                this.render();
            }
            if (e.target.classList.contains("register-back")) {
                e.preventDefault();
                this.renderLoginForm();
            }
            if (e.target.classList.contains("username")) {
                e.preventDefault();
                this.scrollable = false;
                this.showUserDetail(
                    e.target.dataset.userId,
                    e.target.textContent
                );
            }

            if (e.target.classList.contains("blog-detail")) {
                e.preventDefault();
                this.scrollable = false;
                this.showBlogDetail(e.target.dataset.blogId);
            }
        });

        this.root.addEventListener("input", (e) => {
            e.preventDefault();
            if (e.target.classList.contains("date")) {
                let date = new Date(e.target.value + " 00:00:00");
                let timestamp = date.getTime();
                let oldTimestamp = new Date().getTime();

                let relativeTime = this.getTimeRelative(
                    timestamp,
                    oldTimestamp,
                    true
                );

                relativeTime.includes("-")
                    ? this.showToast({
                          title: "Thất bại!",
                          message: "Vui lòng chọn thời gian khác",
                          type: "error",
                          duration: 3000,
                      })
                    : this.showToast({
                          title: "Thành công!",
                          message: `Bài viết sẽ được đăng vào ${relativeTime}`,
                          type: "success",
                          duration: 3000,
                      });
            }
        });

        window.addEventListener("scroll", () => {
            const { scrollTop, scrollHeight, clientHeight } =
                document.documentElement;
            if (
                scrollTop + clientHeight >= scrollHeight - 5 &&
                this.scrollable
            ) {
                const loadDiv = document.createElement("div");
                loadDiv.classList.add("loader", "container", "py-3");
                loadDiv.innerHTML = `<p class="text-center">Đang tải...</p>`;
                if (!this.root.querySelector(".loader")) {
                    this.root.append(loadDiv);
                    setTimeout(() => {
                        this.query.page++;
                        this.getPosts(this.query);
                    }, 500);
                }
            }
        });
    },

    showBlogDetail: async function (blogId) {
        try {
            const { response, data } = await client.get(`/blogs/${blogId}`);

            const post = data.data;
            this.root.innerHTML = `
      <div class="posts container py-3">
        <div class="mb-3">
          <button type="button" class="btn btn-primary login-back mb-3">⭠ Trở về trang chủ</button>
        </div>
        <div class="mb-3">
          <h2>View blog: <span style="color: #0d6efd">${post.title}</span></h2>
        </div>
      </div>`;

            const postsEl = this.root.querySelector(".posts");

            const postEl = document.createElement("div");
            postEl.classList.add("post", "w-100");

            let date = new Date(post.createdAt);
            let oldTimestamp = date.getTime();
            let timestamp = new Date().getTime();

            let relativeTime = this.getTimeRelative(timestamp, oldTimestamp);

            postEl.innerHTML = `
            <a class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="#">
              <span class="username" data-user-id="${post.userId._id}">@${
                post.userId.name
            }</span>
            </a>
            <h3>${post.title}</h3>
            <p>${this.regexLink(post.content)}</p>
            <div class="mb-3">
              <span><i>${relativeTime}</i></span>
              <span>•</span>
              <span>${date.getHours()} giờ ${date.getMinutes()} phút</span>
            </div>
            <hr />
            `;

            postsEl.append(postEl);
        } catch (e) {
            console.log(e);
        }
    },

    showUserDetail: async function (userId, username) {
        try {
            const { response, data } = await client.get(`/users/${userId}`);

            const posts = data.data.blogs;
            this.root.innerHTML = `   
      <div class="posts container py-3">
        <div class="mb-3">
          <button type="button" class="btn btn-primary login-back mb-3">⭠ Trở về trang chủ</button>
        </div>
        <div class="mb-3">
          <h2>View profile: <span style="color: #0d6efd">${username}</span></h2>
        </div>
      </div>`;

            const postsEl = this.root.querySelector(".posts");

            posts.forEach((post) => {
                const postEl = document.createElement("div");
                postEl.classList.add("post", "w-100");

                let date = new Date(post.createdAt);
                let oldTimestamp = date.getTime();
                let timestamp = new Date().getTime();

                let relativeTime = this.getTimeRelative(
                    timestamp,
                    oldTimestamp
                );

                postEl.innerHTML = `
            <a class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="#">
              <span class="username" data-user-id="${
                  post.userId
              }">${username}</span>
            </a>
            <h3>${post.title}</h3> 
            <p>${this.loadMore(this.regexLink(post.content))}</p>
            <div class="mb-3">
              <span><i>${relativeTime}</i></span>
              <span>•</span>
              <span>${date.getHours()} giờ ${date.getMinutes()} phút</span>
            </div>
            <a class="link-underline-primary blog-detail" href="#" data-blog-id="${
                post._id
            }">#View more ${post.title}</a>
            <hr />
            `;

                postsEl.append(postEl);
                document.documentElement.scrollTop = 0;
            });
        } catch (e) {
            console.log(e);
        }
    },

    login: async function (info) {
        this.loadingLogin();
        try {
            const { response, data } = await client.post("/auth/login", info);
            this.loadingLogin(false);

            if (response.status === 400) {
                throw new Error(data.message);
            }
            const { accessToken, refreshToken } = data.data;
            const token = { accessToken, refreshToken };
            localStorage.setItem("login_token", JSON.stringify(token));
            this.render();
            this.showToast({
                title: "Thành công!",
                message: "Bạn đã đăng nhập thành công.",
                type: "success",
                duration: 3000,
            });
        } catch (e) {
            this.showError(".login", e.message);
        }
    },

    register: async function (info) {
        this.loadingRegister();
        try {
            const { response, data } = await client.post(
                "/auth/register",
                info
            );
            this.loadingRegister(false);

            if (response.status === 400) {
                throw new Error(data.message);
            }

            this.renderLoginForm();
            this.showToast({
                title: "Thành công!",
                message: "Bạn đã đăng ký thành công.",
                type: "success",
                duration: 3000,
            });
        } catch (e) {
            this.showError(".register", e.message);
        }
    },

    getProfile: async function () {
        try {
            let token = localStorage.getItem("login_token");
            let accessToken;
            if (token) {
                accessToken = JSON.parse(token).accessToken;
            }
            if (!accessToken) {
                throw new Error("accessToken not null");
            }
            client.setToken(accessToken);
            const { response, data: user } = await client.get("/users/profile");
            if (response.status === 401) {
                throw new Error("accessToken hết hạn");
            }
            const profileEl = this.root.querySelector(".profile");
            const profileName = profileEl.querySelector(".name");
            profileName.classList.add("fw-bold");
            profileName.innerText = user.data.name;
        } catch (e) {
            if (e.message === "accessToken hết hạn") {
                await this.getRefreshToken();
                await this.getProfile();
            }
        }
    },

    logout: async function () {
        try {
            let token = localStorage.getItem("login_token");
            let accessToken;

            if (token) {
                accessToken = JSON.parse(token).accessToken;
            }

            if (!accessToken) {
                throw new Error("accessToken not null");
            }

            client.setToken(accessToken);
            const { response, data } = await client.post("/auth/logout");

            if (response.status === 401) {
                throw new Error("Unauthorize");
            }

            localStorage.removeItem("login_token");
            this.render();
            this.showToast({
                title: "Thành công!",
                message: "Bạn đã đăng xuất.",
                type: "success",
                duration: 3000,
            });
        } catch (e) {
            localStorage.removeItem("login_token");
            this.render();
            this.showToast({
                title: "Thành công!",
                message: "Bạn đã đăng xuất.",
                type: "success",
                duration: 3000,
            });
        }
    },

    writePost: async function (info) {
        const titleEl = document.querySelector(".title");
        const contentEl = document.querySelector(".content");
        try {
            this.loadingWrite();
            let token = localStorage.getItem("login_token");
            let accessToken;
            if (token) {
                accessToken = JSON.parse(token).accessToken;
            }
            if (!accessToken) {
                throw new Error("accessToken not null");
            }
            client.setToken(accessToken);
            const { response, data } = await client.post("/blogs", info);
            if (response.status === 401) {
                throw new Error("accessToken hết hạn");
            }
            if (response.status === 200) {
                titleEl.value = "";
                contentEl.value = "";
                this.loadingWrite(false);
            }
            this.render();
            this.showToast({
                title: "Thành công!",
                message: "Bạn đã đăng bài thành công.",
                type: "success",
                duration: 3000,
            });
        } catch (e) {
            if (e.message === "accessToken hết hạn") {
                await this.getRefreshToken();
                await this.writePost(info);
            }
        }
    },

    getRefreshToken: async function () {
        try {
            let token = localStorage.getItem("login_token");
            let refreshToken;
            if (token) {
                refreshToken = JSON.parse(token).refreshToken;
            }
            if (!refreshToken) {
                throw new Error("refreshToken not null");
            }
            const { response, data } = await client.post(
                "/auth/refresh-token",
                {
                    refreshToken,
                }
            );
            if (response.status === 401) {
                throw new Error("Unauthorize");
            }
            const newToken = data.data.token;
            localStorage.setItem("login_token", JSON.stringify(newToken));
        } catch (e) {
            if (e.message === "Unauthorize") {
                localStorage.removeItem("login_token");
                this.render();
                this.showToast({
                    title: "Hết hạn!",
                    message: "Vui lòng đăng nhập lại.",
                    type: "error",
                    duration: 3000,
                });
            }
        }
    },

    loadingLogin: function (status = true) {
        const button = this.root.querySelector(".login .btn");
        if (status) {
            button.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Loading...`;
            button.disabled = true;
        } else {
            button.innerHTML = `Đăng nhập`;
            button.disabled = false;
        }
    },

    loadingRegister: function (status = true) {
        const button = this.root.querySelector(".register .btn");
        if (status) {
            button.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Loading...`;
            button.disabled = true;
        } else {
            button.innerHTML = `Đăng ký`;
            button.disabled = false;
        }
    },

    loadingWrite: function (status = true) {
        const button = this.root.querySelector(".write-post .btn");
        if (status) {
            button.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Loading...`;
            button.disabled = true;
        } else {
            button.innerHTML = `Write new`;
            button.disabled = false;
        }
    },

    showError: function (auth, msgText) {
        const msg = this.root.querySelector(`${auth} .msg`);
        msg.innerText = ``;
        msg.innerText = msgText;
    },

    renderLoginForm: function () {
        let html = `
    <div class="container py-3">
      <div class="row justify-content-center">
        <div class="col-8 col-lg-6">
          <button type="button" class="btn btn-primary login-back mb-3">⭠ Trở về trang chủ</button>
          <h2 class="text-center">Đăng nhập</h2>
          <form action="" class="login">
            <div class="mb-3">
              <input type="email" name="email" class="form-control email" placeholder="Email..." required/>
            </div>
            <div class="mb-3">
              <input type="password" name="password" class="form-control password" placeholder="Password..." required/>
            </div>
            <div class="d-grid gap-2">
              <button class="btn btn-primary" type="submit">Đăng nhập</button>
              <button class="btn btn-primary register-btn" type="button">Đăng ký</button>
            </div>
            <div class="msg mt-3 text-danger text-center"></div>
          </form>
        </div>
      </div>
    </div>`;
        this.root.innerHTML = html;
    },

    renderRegisterForm: function () {
        let html = `
        <div class="container py-3">
          <div class="row justify-content-center">
            <div class="col-8 col-lg-6">
              <button type="button" class="btn btn-primary register-back mb-3">⭠ Trở về đăng nhập</button>
              <h2 class="text-center">Đăng ký</h2>
              <form action="" class="register">
                <div class="mb-3">
                  <input type="text" name="name" class="form-control name" placeholder="Name..." required/>
                </div>
                <div class="mb-3">
                  <input type="email" name="email" class="form-control email" placeholder="Email..." required/>
                </div>
                <div class="mb-3">
                  <input type="password" name="password" class="form-control password" placeholder="Password..." required/>
                </div>
                <div class="d-grid">
                  <button class="btn btn-primary" type="submit">Đăng ký</button>
                </div>
                <div class="msg mt-3 text-danger text-center"></div>
              </form>
            </div>
          </div>
        </div>`;
        this.root.innerHTML = html;
    },

    showToast: function (log) {
        const toastEl = document.createElement("div");
        toastEl.id = "toast";
        this.root.append(toastEl);
        toast(log);
    },
    start: function () {
        this.render();
        this.addEvent();
    },
};

app.start();
