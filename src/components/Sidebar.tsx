import { Typography } from "@mui/joy";
import { Link } from "react-router-dom";
import { useState } from 'react';

import "../../public/common.css"

const Sidebar = () => {
    const [isExtended, setExtended] = useState(false)

    const handleCollapsible = () => {
        const element = document.getElementById("side-menu") as HTMLElement
        element.style.maxWidth = isExtended ? "0px" : "300px"
        element.style.width = isExtended ? "0px" : "300px"
        element.style.padding = isExtended ? "12px 0px 12px 0px" : "12px 12px 12px 12px"
        setExtended(!isExtended)
    }

    const handleNavigate = () => {
        const element = document.getElementById("side-menu") as HTMLElement
        element.style.maxWidth = "0px" 
        element.style.width = "0px"
        element.style.padding = "12px 0px 12px 0px"
        setExtended(false)
    }

    return (
        <nav className="fixed h-20 w-full">
            <div className="p-4 border-b border-zinc-200 flex items-center gap-4 md:hidden bg-white">
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className="cursor-pointer"
                    onClick={() => handleCollapsible()}
                >
                    <path d="M4 18L20 18" stroke="#000000" stroke-width="2" stroke-linecap="round" />
                    <path d="M4 12L20 12" stroke="#000000" stroke-width="2" stroke-linecap="round" />
                    <path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round" />
                </svg>
                <Typography level="title-lg">FE Challenge</Typography>
            </div>
            <div className="Collapsible" id="side-menu">
                <Link to="/" onClick={() => handleNavigate()}>Home</Link>
                <Link to="/inventory" onClick={() => handleNavigate()}>Inventory</Link>
            </div>
        </nav>
    );
};

export default Sidebar;
