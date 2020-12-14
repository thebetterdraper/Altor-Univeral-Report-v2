import React from "react";
import {NavLink} from "react-router-dom";

function Navbar(){
    return (
        <>
            <NavLink exact activeClassName="active_class" to="/">Home</NavLink>
            <NavLink exact activeClassName="active_class" to="/altorrider">AltorRiderReports</NavLink>
        </>
    );

}

export default Navbar;