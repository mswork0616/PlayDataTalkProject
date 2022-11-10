import Nav from "./Nav";
import { authService, dbService } from "fbase";
import { Link, NavLink } from "react-router-dom";

const onLogOutClick = () => {
  authService.signOut();
  // this.props.history.push("/");
  window.location.replace("/");
};
const deleteAccount = () => {
  authService.currentUser.delete()
  window.location.replace("/");
}

function isActive(path) {
  return window.location.pathname.startsWith(path);
}

function SideNav() {
  return (
    <Nav>
      <Nav.List>
        {/* <Nav.Item>
        <NavLink to='/main' active={isActive("/main")}>
          main
        </NavLink>
        </Nav.Item>
        <Nav.Item>
        <Link to='/search' active={isActive("/main")}>
          search
        </Link>
        </Nav.Item>
        <Nav.Item>
        <Link to='/keyword'>
          keyword
        </Link>
        </Nav.Item>
        <Nav.Item>
        <Link to='/profile/_profile'>
          profile
        </Link>
        </Nav.Item> */}
        <Nav.Item>
          <Nav.Link to="/main" active={isActive("/main")}>
            HOME
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link to="/search" active={isActive("/search")}>
            SEARCH
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link to="/keyword" active={isActive("/keyword")}>
            KEYWORD
          </Nav.Link>
        </Nav.Item><Nav.Item>
          <Nav.Link to="/profile/_profile" active={isActive("/profile")}>
            PROFILE
          </Nav.Link>
        </Nav.Item> 
        <Nav.Link /><Nav.Link /><Nav.Link /><Nav.Link /><Nav.Link /><Nav.Link /><Nav.Link /><Nav.Link /><Nav.Link /><Nav.Link />
        <Nav.Item>
          {/* <Nav.Link2  to="/logout" active={isActive("/logout")}>
            LOGOUT
          </Nav.Link2> */}
          <div className="createButton" onClick={onLogOutClick} style={{cursor: "pointer"}}>LOGOUT</div>

          <div className="createButton" onClick={deleteAccount} style={{cursor: "pointer"}}>회원탈퇴</div>
        </Nav.Item>
      </Nav.List>
    </Nav>
  );
}

export default SideNav;