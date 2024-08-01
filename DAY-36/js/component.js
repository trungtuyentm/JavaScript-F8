class F8 {
    static components = {};
    static component(name, options) {
        this.components[name] = options;
        customElements.define(
            name,
            class extends HTMLElement {
                constructor() {
                    super();
                    this.attachShadow({ mode: "open" });
                    this.state = options.data ? options.data() : {};
                    this.textNodes = {};
                    this.render();
                }

                // Create and Update interface based on current data
                render() {
                    const template = document.createElement("template");
                    template.innerHTML = options.template.replace(
                        /\{\{(.*?)\}\}/g,
                        (_, key) => {
                            return `<span data-key="${key.trim()}">
                            ${this.state[key.trim()]}
                            </span>`;
                        }
                    );
                    this.shadowRoot.innerHTML = "";
                    this.shadowRoot.appendChild(
                        template.content.cloneNode(true)
                    );

                    // Save references to the text nodes
                    this.shadowRoot
                        .querySelectorAll("[data-key]")
                        .forEach((node) => {
                            const key = node.getAttribute("data-key");
                            this.textNodes[key] = node;
                        });

                    this.addEventListeners();
                }

                // Add event listeners to buttons
                addEventListeners() {
                    const buttons = this.shadowRoot.querySelectorAll("button");
                    buttons.forEach((button) => {
                        if (button.hasAttribute("v-on:click")) {
                            button.addEventListener("click", () => {
                                const method =
                                    button.getAttribute("v-on:click");
                                this.executeMethod(method);
                                this.updateTextNodes();
                            });
                        }
                        if (button.hasAttribute("v-on:dblclick")) {
                            button.addEventListener("dblclick", () => {
                                const method =
                                    button.getAttribute("v-on:dblclick");
                                this.executeMethod(method);
                                this.updateTextNodes();
                            });
                        }
                    });
                }

                // Update only the text nodes that have changed
                updateTextNodes() {
                    Object.keys(this.textNodes).forEach((key) => {
                        this.textNodes[key].textContent = this.state[key];
                    });
                }

                // Execute Method
                executeMethod(method) {
                    if (method.includes("++")) {
                        const key = method.replace("++", "").trim();
                        this.state[key]++;
                    } else if (method.includes("--")) {
                        const key = method.replace("--", "").trim();
                        this.state[key]--;
                    } else if (method.includes("=")) {
                        const [key, value] = method
                            .split("=")
                            .map((s) => s.trim());
                        this.state[key] = value.replace(/['"]/g, "");
                    }
                }
            }
        );
    }
}
