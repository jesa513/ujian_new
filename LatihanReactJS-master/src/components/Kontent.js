import React, { Component } from 'react'

class konten extends Component {
    render(){
        return(
            <center>
            <h1>{this.props.ubahClik}</h1>
            {this.props.children}
            </center>
        )
    }
}

export default konten;