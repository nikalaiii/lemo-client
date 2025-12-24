import { Button } from "@mui/material";
import Link from "next/link"
import React from "react";

interface ButtonProps { 
    href: string;
    variant: "contained" | "outlined"
    text: string;
}

const NavButton: React.FC<ButtonProps> = ({ href, variant, text }) => {
    return (
        <Button component={Link} href={href} variant={variant}>{text}</Button>
    )
}

export default NavButton;