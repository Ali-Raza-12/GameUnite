import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Image,
} from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../../slices/usersApiSlice";
import SearchBox from "../SearchBox";
import fire from "../../assets/Images/fire.gif";
import sound from "../../assets/Sound/mu1.mp3";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();
  const [updateUser] = useUpdateUserMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const [isSeller, setIsSeller] = useState("false");

  const handleBecomeSeller = async () => {
    if (!userInfo) {
      navigate("/login");
      return;
    }

    try {
      setIsSeller(true);
      await updateUser({ userId: userInfo._id, isSeller: true });
      toast.success("congrats! you are now a seller. login again");
      console.log("User is now a seller!");
    } catch (error) {
      console.error("Error updating user:", error.message);
      setIsSeller(false);
    }
  };

  function play() {
    new Audio(sound).play();
  }

  return (
    <header>
      <Navbar
        style={{
          backgroundColor: "#0F0C29",
          height: "80px",
        }}
        variant="dark"
        expand="md"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <span onClick={play}>GameUnite</span>
              <Image
                src={fire}
                alt="fire logo"
                style={{
                  width: "32px",
                  marginLeft: "5px",
                  marginBottom: "8px",
                }}
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav className="me-auto">
                {/* Pages */}
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/product">
                  <Nav.Link>Product</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/blog">
                  <Nav.Link>Blog</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/about">
                  <Nav.Link>About</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/contactUs">
                  <Nav.Link>Contact Us</Nav.Link>
                </LinkContainer>

                {/* Search Box - shown for screen sizes >= 800px */}
                <Nav className="d-none d-md-flex">
                  <SearchBox />
                </Nav>

                {/* Become a Seller - shown for screen sizes >= 1300px */}
                {!userInfo?.isSeller && !userInfo?.isAdmin && (
                  <Nav.Link className="d-none d-lg-block" onClick={handleBecomeSeller}>
                    Become a Seller
                  </Nav.Link>
                )}
              </Nav>

              {/* Cart */}
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Card
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {/* User Authentication */}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link href="/login">
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {/* Admin Menu - shown for admin users */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminMenu">
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/bloglist">
                    <NavDropdown.Item>Blogs</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              {/* Seller Menu - shown for seller users */}
              {userInfo && userInfo.isSeller && (
                <NavDropdown title="Seller" id="sellerMenu">
                  <LinkContainer to="/seller/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/seller/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              {/* Connect - shown for screen sizes >= 1300px */}
              <LinkContainer to="/connect" className="d-none d-lg-block">
                <Nav.Link>Connect</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
