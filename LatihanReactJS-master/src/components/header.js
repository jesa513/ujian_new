// component ada dua tipe = function dan classs

//Function component

import React, { Component } from 'react'; // React nya dibutuhin semua dan ada distuction di Component

class Header extends Component {
    
    // state = {prop : 'ini state awal' , prop2 : 'ini Prop 2'}
    // componentWillMount() {
    //     console.log('Ini WillMount')    
    // }

    // componentDidMount() {
    //     console.log('Ini DidMount')
    //     // this.state.prop = 'anjaykuh'
    //     // this.setState({});
    //     this.setState({ prop : 'SetState Nih' , tambahanState : 'Ini tambahan'})

    // }

    // componentWillUpdate() {
    //     console.log('Ini WillUpdate')
    // }
    // componentDidUpdate() {
    //     console.log('Ini didUpdate')
    // }
    render(){
        // console.log('Ini REnder')
        // console.log(this.state)
        // let a = 'Andaikan'
        return(
            <div>
                {/* <h1>{this.props.text.propertiObj}</h1> */}
                <h2>{`${this.props.text} adalah =  ${this.props.number}`}</h2>
                <input type = {'button'} className = {'btn btn-primary'} value = {'Klik'}></input>
            </div>
        )
    }
}

export default Header;