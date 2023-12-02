function Error() {
    return (
        <div className="container full notfound center-frame align-center">
        <div className="half-frame notfound-frame">
            <h1>Oops ! Something&apos;s wrong... 500</h1>
            <br/>
            <p>There was an error on the server! Check the console or come back <a href="/">Home</a>.
            </p>
        </div>
        </div>
    )
}

export default Error