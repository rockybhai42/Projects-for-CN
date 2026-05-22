import { NavLink } from "react-router-dom";
import '../styles/navbar.css';



function Navbar(){
    return (
        <nav className="navbar">
            <NavLink to="/"  className={({isActive})=> isActive ? "active-link":""}>   Add Bill  </NavLink>
            <span></span>
           
            <NavLink to="/bills"   className={({isActive})=> isActive ? "active-link":""} >  View Bills  </NavLink>
            <span></span>
            <NavLink to="/vendors" className={({isActive})=> isActive ? "active-link":""} > Vendors</NavLink>
            
        </nav>


    )
}

export default Navbar;