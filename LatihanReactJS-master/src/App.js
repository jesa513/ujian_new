import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom' //untuk mengatasi masalah cookie yang tidak bisa berubah ubah page, kalau pake connect
//terus ada route, harus ada komponen withRouter
import Header from './components/header'
import Konten from './components/Kontent'
import Navigation from './components/Navbar'
import HomePage from './components/homepage'
import Produk from './components/register/ProdukList'
// import Login from './components/Form'
import Cookies from 'universal-cookie'
import { keepLogin , cookieChecked} from './actions'
import Footer from './components/footer';
// import { Button } from 'reactstrap';
import { Route } from 'react-router-dom';
import LoginPage from './components/LoginPage'
import RegisterPage from './components/register'
import Register from './components/register';
import Manage from './components/manageProduk'
import ProdukDetail from './components/produkDetail'
import Cart from './components/cart'
// import History from './components/History'
 //History di comment karena masih error


const cookies = new Cookies()
class App extends Component {
  state = { password : '' }
  //   componentWillReceiveProps(newProps){
  //     if(newProps.username !== ''){
  //         cookies.set('Ferguso' , newProps.username , { path: '/' })
  //     }
  // }
  componentDidMount() {
    const username = cookies.get('Ferguso');
    if(username !== undefined) {
        this.props.keepLogin(username);
    }
    

    else {
      this.props.cookieChecked();
    }
}


  // state = {user = ''}
  // onClickBtn = () =>{
  // this.setState({user : this.refs.tbUsername.refs.username.value  
  // }

  render() {
  //  var tempState = this.state.password
    if(this.props.cookie){
      return (
        <div>
          <Navigation />
       
          <div className = "container col-4"> 
          {/* <Login /> */}
          {/* <h1>Ini Main</h1> */}
            {/* { <Header  text = {{propertiObj : 'valueObj'}}/> } */}
            {/* <Header  text = "Jamaludin" number ={500}/> */}
            {/* { <Header  text = "Anjaaay" number = {20*90}/> }/ */}
            {/* <Konten ubahClik = {content}>
              <p> Ini isi konten yang fleksibel </p>
              <p>Tulis segala sesuatu disini karena disini fleksibel</p>
            </Konten> 
            <Button color="danger" onClick = {this.onClickBtn}>Ubah</Button> */}
            
            {/* <Footer /> */}
          </div>
          <div>
            <Route path="/" component={HomePage} exact/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/register" component={Register}/>
            <Route path="/produk" component={Produk}/>
            <Route path="/manage" component={Manage}/>
            <Route path="/produkdetail/" component={ProdukDetail}/>
            <Route path="/cart" component={Cart}/>
            {/* <Route path="/history" component={History}/> */}
          </div>
         
        </div>
      );
    }
    return (
      <div>
        <center><h1> Loading... </h1></center>
      </div>
    )
    
   
  }
}
const mapStateToProps = (state) => {
  return { cookie : state.auth.cookie }
}


export default withRouter(connect(mapStateToProps, {keepLogin , cookieChecked })(App));
