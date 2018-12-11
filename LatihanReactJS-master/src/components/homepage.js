import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class Home extends React.Component{

    state ={ listProduk : [] }
    componentWillMount(){
        axios.get('http://localhost:2000/produk')
            .then((data) => {
                console.log(data.data)
                this.setState({ listProduk : data.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    renderListProduk = () => {
        var listJSXProduk = this.state.listProduk.map((val) => {
            return(
                <div>
                    <h3>{val.namaproduk}  = Rp.  {val.harga} </h3>
                    
                </div>
            )
        })
        return listJSXProduk;
    }
    render(){
        console.log(this.state.listProduk)
        return(
            <div className="container">
                <center>
                <h1>Ini Homepage</h1>
                </center>
                <h2>{this.props.user}</h2>
                {this.renderListProduk()}

            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        user : state.user
    }
}
export default connect(mapStateToProps)(Home)
