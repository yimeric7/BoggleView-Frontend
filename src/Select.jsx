import './Select.css'

function Select() {
    return (
        <div id="select-parent">
            <div>
                <h1>Select Gamemode</h1>
            </div>
            <div id="select-button-section">
                <button className="select-gamemode-buttons" id="select-singleplayer" onClick={() => console.log("singleplayer")}>Singleplayer</button>
                <button className="select-gamemode-buttons" id="select-multiplayer" onClick={() => console.log("multiplayer")}>Multiplayer</button>
            </div>
        </div>
    )
}

export default Select