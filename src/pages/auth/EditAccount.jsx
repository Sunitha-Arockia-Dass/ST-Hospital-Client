import IsLogged from "../../components/IsLogged"

function EditAccount() {
    
    
    return (
        <>
        <IsLogged/>
        
        <div id="editaccount">
            
            <h2>Edit Account</h2>

            <form action="/editaccount/:id" method="POST">
                <label>Username</label>
                <input type="text" name="username" value="{username}" />

                <label>Email</label>
                <input type="email" name="email" value="{email}" />

                <label> Current Password</label>
                <input type="password" name="password" placeholder="Your password" />

                <label> New Password</label>
                <input type="password" name="newPassword" placeholder="Your new password" />

                <button type="submit"><span>Edit Account</span></button>
            </form>
        </div>
        </>
    )
}

export default EditAccount