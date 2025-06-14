import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { useLocation } from "react-router";

function NavBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const items = [
    { label: "Home", to: "/" },
    { label: "Find Donor", to: "/find-donor" },
    { label: "Become A Donor", to: "/become-a-donor" },
    { label: "Blood Banks", to: "/blood-banks" },
    { label: "Blog", to: "/blog" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <Navbar shouldHideOnScroll>
      {/* Mobile: Menu Toggle + Logo */}
      <NavbarContent className="sm:hidden items-center gap-2" justify="start">
        <NavbarMenuToggle />
        <NavbarBrand className="text-base">
          <Link href="/" className="font-bold text-inherit font-patrik">
            Gift Of Life
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop: Logo (Left) */}
      <NavbarContent className="hidden sm:flex" justify="start">
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit text-lg font-patrik">
            Gift Of Life
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop: Center Menu Items */}
      <NavbarContent className="hidden sm:flex gap-4 font-urban" justify="center">
        {items.map((item, index) => (
          <NavbarItem key={index} isActive={currentPath === item.to}>
            <Link
              color={currentPath === item.to ? "primary" : "textd"}
              href={item.to}
              aria-current={currentPath === item.to ? "page" : undefined}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Desktop: Right Auth Buttons */}
      <NavbarContent className="font-urban" justify="end">
        <NavbarItem>
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/sign-up" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Dropdown Menu */}
      <NavbarMenu>
        {items.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              className={`w-full ${
                currentPath === item.to ? "text-textd font-semibold" : ""
              }`}
              href={item.to}
              aria-current={currentPath === item.to ? "page" : undefined}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}

        {/* Optional: Mobile Auth Buttons */}
        <NavbarMenuItem>
          <Link href="/login" className="w-full">
            Login
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button as={Link} href="#" color="primary" variant="flat" className="w-full">
            Sign Up
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

export default NavBar;
