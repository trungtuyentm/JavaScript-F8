function Button({ children, ...prob }) {
    return <button {...prob}>{children}</button>;
}

export default Button;
