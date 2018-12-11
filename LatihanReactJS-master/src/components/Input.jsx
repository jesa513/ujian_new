import React from 'react';

class InputKu extends React.Component {
    render(){
        return(
            <input type={this.props.type} ref={this.props.innerRef} />
        )
    }
}

export default InputKu;