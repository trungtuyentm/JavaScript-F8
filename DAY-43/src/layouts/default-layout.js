import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/style.scss";

export const defaultLayout = () => {
    return `
        <header class="mb-3">
            <div class="container">
                <h1><a href="/">HEADER</a></h1>
            </div>
        </header>
        <main>
            <div class="container">
                <div class="row">
                    <div class="col-3">
                        <h2>Menu</h2>
                        <ul>
                            <li><a href="/">Trang chủ</a></li>
                            <li><a href="/gioi-thieu">Giới thiệu</a></li>
                            <li><a href="/san-pham">Sản phẩm</a></li>
                        </ul>
                    </div>
                    <div class="col-9">{body}</div>
                </div>
            </div>
        </main>
        <footer class="mt-3">
            <div class="container">
                <h1>FOOTER</h1>
            </div>
        </footer>
    `;
};
