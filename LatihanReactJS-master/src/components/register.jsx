import React from 'react'
import { connect } from 'react-redux'
import './register/css/main.css'
import './register/css/util.css'
import { onRegister } from '../actions'
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'
// import '../support/css/loading.css'
const cookies = new Cookies()
class Register extends React.Component {
      componentWillReceiveProps(newProps){
        if(newProps.username.length > 0){
            cookies.set('Ferguso' , newProps.username , { path: '/' })
        }
    }

    loadingRender = () => {
      if(this.props.loading){
        return <p>Loading...</p>
      }
      return (
      <div className="container-login100-form-btn m-t-10">
        <input type="button" className="login100-form-btn" onClick={this.onRegisterClick} value="Register"/> 
      </div>
      )
    }
    onRegisterClick = () => {
      let username = this.refs.username.value;
      let password = this.refs.password.value;
      let email = this.refs.email.value;
      this.props.onRegister({username,email,password})
      console.log(password)
    }
    renderError = () => {
      if(this.props.error.length > 0){
         return <p className='alert alert-danger' >{this.props.error}</p>                
      }
  }
    render(){
      if(this.props.username === ''){
        return (
          <div className="limiter">
            <div className="container-login100" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1540871112484-09beaca00ec2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7a2ae0fa4974f7d78c2423f7d25d434f&auto=format&fit=crop&w=749&q=80")'}}>
              <div className="wrap-login100 p-t-190 p-b-30">
                <form className="login100-form validate-form">
                  <div className="login100-form-avatar">
                    <img src="https://images.unsplash.com/photo-1524593689594-aae2f26b75ab?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4c06a1bc6123a9ac6645a269314334b2&auto=format&fit=crop&w=700&q=80" alt="AVATAR" />
                  </div>
                  <span className="login100-form-title p-t-20 p-b-45">
                    REGISTER HERE
                  </span>
                  <div className="wrap-input100 validate-input m-b-10" data-validate="Username is required">
                    <input className="input100" type="text" name="username" placeholder="Username" ref="username"/>
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                      <i className="fa fa-user" />
                    </span>
                  </div>
                  <div className="wrap-input100 validate-input m-b-10" data-validate="Email is required">
                    <input className="input100" type="text" name="pass" placeholder="Email Adress" ref="email"/>
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                      <i className="fa fa-lock" />
                    </span>
                  </div>
                  <div className="wrap-input100 validate-input m-b-10" data-validate="Password is required">
                    <input className="input100" type="password" name="pass" placeholder="Password"ref="password" />
                    <span className="focus-input100" />
                    <span className="symbol-input100">
                      <i className="fa fa-lock" />
                    </span>
                  </div>
                  {this.loadingRender()}
                  {this.renderError()}
                  <div className="text-center w-full">
                    <a className="txt1" href="/login">
                      Sudah Punya Akun?
                      <i className="fa fa-long-arrow-right" />						
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      } 
      return <Redirect to ="/" /> 

        
    }
}

const mapStateToProps = (state) => {
  return {username : state.auth.username , loading : state.auth.loading , error : state.auth.error}
}


export default connect(mapStateToProps, {onRegister} )(Register);