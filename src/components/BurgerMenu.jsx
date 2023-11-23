function BurgerMenu() {

    const animate = () => {
        const button = document.querySelector(".hamburger-menu")
        const currentState = button.getAttribute("data-state")

        if (!currentState || currentState === "closed") {
            button.setAttribute("data-state", "opened")
            button.setAttribute("aria-expanded", "true")
        }
        else {
            button.setAttribute("data-state", "closed")
            button.setAttribute("aria-expanded", "false")
        }
    }


    return (
        <button onClick={animate} className="hamburger-menu" aria-controls="primary-navigation" aria-expanded="false">
            <svg className="hamburger" fill="var(--foreground)" viewBox="0 0 100 100" width="32px">
                <rect className="line hamburger-top" width="90" height="10" x="5" y="20" rx="5">
                </rect>
                <rect className="line hamburger-middle" width="90" height="10" x="5" y="45" rx="5">
                </rect>
                <rect className="line hamburger-bottom" width="90" height="10" x="5" y="70" rx="5">
                </rect>
            </svg>
        </button>
    )
}

export default BurgerMenu
