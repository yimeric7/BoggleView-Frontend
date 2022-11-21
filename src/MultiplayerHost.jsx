import './MultiplayerHost.css'

function MultiplayerHost() {
    return (
        <div id="host-parent">
            <div>
                <h1>Host Game Setup</h1>
                <h2>Enter a port to host on:</h2>
                <h4>(todo: fix form alignment, move into one line)</h4>
            </div>
            <div id="host-enter-port-section">
                <form id="host-setup-form">
                    <input type="text" id="host-select-port-text"/>
                    <input type="submit" id="host-select-port-submit"/>
                </form>
            </div>
        </div>
    )
}

export default MultiplayerHost