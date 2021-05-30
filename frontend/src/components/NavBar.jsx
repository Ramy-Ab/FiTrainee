import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../images/logo.png'
import {Link} from 'react-scroll'
import {Link as LinkR} from 'react-router-dom'
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'
function NavBar() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    const [nav,setNav] = useState(false)

    const changeBackground = () => {
        if(window.scrollY >= 50){
            setNav(true)
        }else{
            setNav(false)
        }
    }
    window.addEventListener('scroll',changeBackground)

    return (
        <nav className={nav ? "nav active" : "nav"}>
            <Link to='heading' className='logo'>
                <img src={logo} alt=''/>
            </Link>
            <input className='menu-btn' type='checkbox' id='menu-btn'/>
            <label className='menu-icon' for='menu-btn'>
                <span className='nav-icon'></span>
            </label>
            <ul className='menu'>
                
                {/* <li className='nav-li'><Link to='features' smooth={true} duration={1000}>Features</Link></li>
                <li className='nav-li'><Link to='offer' smooth={true} duration={1000}>Offer</Link></li> */}
                <li className='nav-li'><Link to='about' smooth={true} duration={1000}>About</Link></li>
                <li className='nav-li foodai-li'><LinkR className='foodai-li' to='/foodai'>FoodAi</LinkR></li>
                <li className='nav-li foodai-li'><LinkR className='foodai-li' to='/'>Shop</LinkR></li>
                <li className='nav-li'><Link to='contact' smooth={true} duration={1000}>Contact</Link></li>
                <li className='nav-li'><LinkR className="foodai-li" to='/cart'><i className="fas fa-shopping-cart"></i></LinkR></li>
                {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username' >
                                    <LinkContainer to='/profile' className="NavDropdown">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item className='NavDropdown' onClick={logoutHandler}>Logout</NavDropdown.Item>

                                </NavDropdown>
                            ) : (
                <LinkContainer to='/login'><li className='nav-li foodai-li'><LinkR className='foodai-li' to='/login'>LogIn</LinkR></li></LinkContainer>
                                )}

                {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenue'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            )}
                {/* <LinkContainer to='/cart'>
                                <Nav.Link ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                </LinkContainer> */}
                
            </ul>
        </nav>
    )
}

export default NavBar
