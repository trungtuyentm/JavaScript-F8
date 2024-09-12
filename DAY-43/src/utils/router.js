import Navigo from "navigo";
import { error } from "../error";

const routerInit = new Navigo("/", { linksSelector: "a", hash: false });
const app = document.querySelector("#app");

const render = (app, html) => {
    app.innerHTML = html;
};

window.navigate = (path) => {
    routerInit.navigate(path);
};

const renderInterface = (defaultLayout, component, params) => {
    const html = defaultLayout().replace(/\{.*\}/g, component(params));
    return html !== undefined && html !== "" ? html : component(params);
};

const router = (pathArr, defaultLayout) => {
    pathArr.forEach((pathItem) => {
        routerInit.on(pathItem.path, (item) =>
            render(
                app,
                renderInterface(defaultLayout, pathItem.component, item)
            )
        );
    });
    routerInit.notFound(() => render(app, error()));
    routerInit.resolve();
};

export { routerInit, router };
