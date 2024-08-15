let pageNumber = 1;
let pageSize = 8;
let isPageLoad = true;
const userContainer = document.querySelector(".user-container");
const loadingEl = document.querySelector("#loading");

const toggleLoading = (isLoading) => {
    console.log(`${isLoading}`);
    loadingEl.classList.toggle("show", isLoading);
};

const renderUser = (user) => {
    let { picture, name, mutual } = user;
    let htmlStr = `
                    <div class="user">
                        <div class="user-logo item">
                            <img src="${picture}" />
                        </div>
                        <div class="user-name item">
                            <a href="#!">${name}</a>
                        </div>
                        <div class="user-mutual item">${mutual}</div>
                        <div class="user-messenger item">
                            <a href="#!">
                                <i class="fa-brands fa-facebook-messenger"></i
                            ></a>
                        </div>
                        <a href="#!" class="menu item">
                            <i class="fa-solid fa-ellipsis"></i>
                        </a>
                    </div>`;
    userContainer.insertAdjacentHTML("beforeend", htmlStr);
};

async function getRandomUser(pageNumber, pageSize) {
    let url = `https://l9r3pr-8080.csb.app/results?_page=${pageNumber}&_limit=${pageSize}`;
    try {
        const resp = await fetch(url);
        if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`);
        }
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch users", error);
        return [];
    }
}

const getLastUserEle = () =>
    document.querySelector(".user-container > .user:last-child");

const loadUsers = (pageNumber, pageSize) => {
    return new Promise((resolve, reject) => {
        toggleLoading(true);
        getRandomUser(pageNumber, pageSize)
            .then((data) => {
                if (data.length === 0) {
                    resolve("No more data");
                    return;
                }
                data.forEach((user) => renderUser(user));
                if (isPageLoad) {
                    observerLastUser();
                    isPageLoad = false;
                }
                toggleLoading(false);
                resolve("Completed Rendering");
            })
            .catch((error) => {
                toggleLoading(false);
                reject(error);
            });
    });
};

toggleLoading(true);
loadUsers(pageNumber, pageSize)
    .then((data) => {
        toggleLoading(false);
    })
    .catch((error) => {
        toggleLoading(false);
    });

const infScrollCallback = (entries, observer) => {
    const entry = entries[0];
    if (!entry.isIntersecting) return;
    pageNumber += 1;
    toggleLoading(true);
    loadUsers(pageNumber, pageSize)
        .then((resp) => {
            if (resp === "No more data") {
                observer.unobserve(entry.target);
                toggleLoading(false);
                return;
            }
            observerLastUser();
            toggleLoading(false);
        })
        .catch((error) => toggleLoading(false));
    observer.unobserve(entry.target);
};

const infScrollObserver = new IntersectionObserver(infScrollCallback, {});

const observerLastUser = () => {
    infScrollObserver.observe(getLastUserEle());
};
