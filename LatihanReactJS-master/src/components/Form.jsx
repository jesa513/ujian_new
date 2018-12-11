import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import InputKu from './Input'

export default class loginForm extends React.Component {
    state = { username : 'AWal'}

    onClickBtn = () => {
        var username = this.refs.tbUsername.refs.username.value
        this.setState({ username })
    }
    render(){
        var { username } = this.state;
        return(
            <Form>
                <br/>
                <br/>   
                <FormGroup>
                <Label for="exampleEmail">Username</Label>
                <Input type="email" name="email" id="exampleEmail" ref="tbUsername" innerRef = "username" placeholder="Username" />
                </FormGroup>
                <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="password" />
                </FormGroup>
                <Button color = 'primary' onClick = {this.onClickBtn}>Submit</Button> 
                {/* <InputKu type ="text" ref = "Inputku" innerRef = "InnerKu" /> */}
            </Form>
            
        )
    }
}
    
      

