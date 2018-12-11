import React from 'react'
import {connect} from 'react-redux'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom'
import {onUserLogin} from '../actions'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
class login extends React.Component {
    

      onClickBtn = () => {
        let user = this.refs.tbUsername.refs.username.value
        let pass = this.refs.tbpassword.refs.password.value
        console.log(user)
        this.props.onUserLogin({ user , pass}) 
    }
       renderError = () => {
           if(this.props.error.length > 0){
              return <p className='alert alert-danger' >{this.props.error}</p>                
           }
       }
       renderButton = () => {
           if(this.props.loading){
              return <h2>loading...</h2>
           }
           return <Button color = 'primary' onClick={this.onClickBtn}>Submit</Button>
       }
       componentWillReceiveProps(newProps){
        if(newProps.username.length > 0){
            cookies.set('Ferguso' , newProps.username , { path: '/' })
            cookies.set('id' , newProps.id , {path : '/'})
        }
    }
    render(){
        if(this.props.username === ''){
            return(
                <center>
                    <h1>Ini Login Page</h1>
                    <div className="col-3">
                    <Form>
                          
                        <FormGroup>
                            {/* <Label for="exampleEmail">Username</Label> */}
                            <Input type="text" name="username" id="exampleEmail" ref="tbUsername" innerRef = "username" placeholder="Username" />
                        </FormGroup>
                        <FormGroup>
                            {/* <Label for="examplePassword">Password</Label> */}
                            <Input type="password" name="password" id="examplePassword" ref="tbpassword" innerRef="password" placeholder="password" />
                        </FormGroup>
                        {this.renderError()}
                        {this.renderButton()}
                             
                            {/* <InputKu type ="text" ref = "Inputku" innerRef = "InnerKu" /> */}
                    </Form>
                    </div>
                </center>            
            )
        }
        return <Redirect to ="/" /> 
        
    }
}

const mapStateToProps = (state) => {
    return {username : state.auth.username , error : state.auth.error , loading : state.auth.loading , id : state.auth.user_id}
}

export default connect(mapStateToProps, { onUserLogin })(login);