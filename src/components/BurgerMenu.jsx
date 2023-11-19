function BurgerMenu() {

    return (
        
        <label className="hamburger-menu">
                <input type="checkbox"/>
                <svg fill="var(--foreground)" className="hamburger" viewBox="0 0 100 100" width="32px">
                    <rect className="line hamburger-top" width="90" height="10" x="5" y="20" rx="5">
                    </rect>
                    <rect className="line hamburger-middle" width="90" height="10" x="5" y="45" rx="5">
                    </rect>
                    <rect className="line hamburger-bottom" width="90" height="10" x="5" y="70" rx="5">
                    </rect>
                </svg>
            
            </label>

       
    )
}

export default BurgerMenu
