import { Link } from "react-router-dom";

function Sidebar() {

    return (

        <div
            style={{
                width: "220px",
                minHeight: "100vh",
                background: "#1f2937",
                color: "white",
                padding: "20px"
            }}
        >

            <h3>Menu</h3>

            <div>
                <Link to="/dashboard">Dashboard</Link>
            </div>

            <div>
                <Link to="/portfolio">Portfolio</Link>
            </div>

            <div>
                <Link to="/watchlist">Watchlist</Link>
            </div>

            <div>
                <Link to="/alerts">Alerts</Link>
            </div>

            <div>
                <Link to="/profile">Profile</Link>
            </div>

        </div>

    );
}

export default Sidebar;