import IsLogged from "../../components/IsLogged"

function Account() {
    return (
        <>
        <IsLogged/>
        <div id="account">
            
            <h2>Welcome to your Account</h2>
            <p>We can display information here</p>

            <form action="/editaccount" method="GET">
                <button type="submit">Edit Account</button>
            </form>
        </div>
        </>
    )
}

export default Account