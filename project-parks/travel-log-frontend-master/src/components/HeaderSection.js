import React from "react";
import { Container, Image, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const HeaderSection = () => (
  <div className="header">
    <Menu>
      <Container>
        <Menu.Item as="a" header>
          <Image
            size="small"
            src="https://www.robinwieruch.de/img/page/logo.svg"
          />
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item as="a" name="login">
            <NavLink to="/login-page" variant="h6" color="white"> Login </NavLink>
          </Menu.Item>

          <Menu.Item as="a" name="register">
            <NavLink to="/signup-page" variant="h6" color="white"> Register </NavLink>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  </div>
);

export default HeaderSection;