import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { LogOut } from 'lucide-react';
import DarkMode from './DarkMode';


const NavbarContainer = styled.div`
 background-color: #495057;
 display: flex;
 justify-content: space-between;
 padding: 1rem;
 position: fixed;
 top: 0;
 left: 0;
 width: 100%;
 z-index: 1000;
`;

const NavbarBrand = styled.h2`
 color: #fff;
 margin: 0;
`;

const NavbarLinks = styled.ul`
 color: #fff;
 display: flex;
 list-style-type: none;
 margin: 0;
 padding: 0;
 justify-content: center;
`;

const NavbarLink = styled.li`
 margin-left: 1rem;
 color:#fafafa;
 text-decoration:none;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fafafa;
  font-size: 1.2em;
  display: block;
  transition: color 0.3s;

  &:hover {
    color: #000;
  }
`;
function Navbar() {
    const [credentials] = useContext(CredentialsContext);

    return (
        <NavbarContainer>
            <NavbarBrand><StyledLink to="/">ASKOUT 3LINA</StyledLink></NavbarBrand>
            <NavbarLinks>
                <DarkMode />
                {credentials.username &&
                    <NavbarLink><StyledLink to="/login" ><LogOut /></StyledLink></NavbarLink>
                }
            </NavbarLinks>
        </NavbarContainer >
    );
}

export default Navbar;