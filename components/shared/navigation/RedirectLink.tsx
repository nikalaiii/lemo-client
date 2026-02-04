'use client';

import { useGlobalState } from "@/context/GlobalUser";
import Link from "next/link";

interface LinkProps {
  href: string;
  title: string;
  size: "medium" | "large";
  position: "left" | "right" | "center";
}

const RedirectLink: React.FC<LinkProps> = ({ href, title, size, position }) => {
  const { user } = useGlobalState();
  return (
    <Link
      style={{ fontSize: size === "medium" ? "20px" : "30px",
        fontWeight: size === "medium" ? "500" : "700",
        color: "#fff",
        cursor: "pointer",
        textDecoration: "underline",
        lineHeight: size === "medium" ? "24px" : "36px",
        marginLeft: position === 'center' ? 'auto' : position === 'right' ? 'auto' : '0',
        marginRight: position === 'center' ? 'auto' : position === 'left' ? 'auto' : '0',
       }}
      href={user ? href : "/auth/login"}
    >
      → {title}
    </Link>
  );
};

export default RedirectLink;
