import React from 'react';
import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu
 } from 'reactstrap';
 import { connect } from 'react-redux'
 
import { Link } from 'react-router-dom';
import { onLogOut , keepLogin } from '../actions'
import Cookies from 'universal-cookie'
import axios from 'axios'


const cookies = new Cookies();
class Navigation extends React.Component {
state = {jumlah :0}

componentDidMount = () => {
  this.getApiCart()
}

getApiCart = () => {
  axios.get('http://localhost:2000/cart', {
    params : {
      username : this.props.username
    }
  }).then((res) => {
    console.log(res.data.length)
    this.setState({jumlah : res.data.length})
  })
}
renderCart = () => {
  return(
    
      <Button href='/cart'>
               <i class="fas fa-shopping-cart" style={{marginRight:'15px'}}></i>
               {this.state.jumlah}
             </Button>
     
  )
}
  onClickLogOut = () => {
    this.props.onLogOut()
    cookies.remove('Ferguso')
  }
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    render(){
      if(this.props.username === ''){
        return(
          <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">GO-BER</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/produk">List Product</NavLink>
            </NavItem>  
            <NavItem>
              <NavLink href="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/register">Register</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
      )
      }
      return(
        <div>
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">GO-BER</NavbarBrand>
      <NavbarToggler onClick={this.toggle} />
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink >{this.props.username.toUpperCase()}</NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  MENU
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/manage">
                    Manage Popok
                  </DropdownItem>
                  <DropdownItem   href="/produk">
                    List Produk
                  </DropdownItem>
                  <DropdownItem   href="/history">
                    History
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
          <NavItem>
            <NavLink href="/login" onClick={this.onClickLogOut}>LOG OUT</NavLink>
          </NavItem>
          <NavItem>
            {this.renderCart()}
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  </div>
    )


    }}        
const mapStateToProps = (state) => {
  return { username : state.auth.username,
            cart : state.auth.jumlahCart }
}

export default connect(mapStateToProps , {onLogOut ,keepLogin})(Navigation);