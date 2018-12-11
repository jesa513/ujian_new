import React , {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
import { select_produk } from '../actions'
import queryString from 'query-string'

class produkDetail extends Component {
    componentDidMount(){
        var params = queryString.parse(this.props.location.search)
        var link = params.produkid
        console.log(this.props.location.search)
        console.log(params)
        console.log(link)
        axios.get(`http://localhost:2000/produk/${link}`)
        .then((res) => {
            console.log(res)
            this.props.select_produk(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    render(){
        var { namaproduk , harga , kategori , img , deskripsi } = this.props.detailProduk
        return(
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <img src={img} className="img-responsive" />
                    </div>                
                    <div className='col-8'>
                        <div className='row'>
                            <h2>{namaproduk}</h2>
                        </div>
                        <div className='row'>
                            <h4> Rp. {harga}</h4>
                        </div>
                        <div className='row'>
                            <h4 style={{color : 'red'}}>{kategori}</h4>
                        </div>
                        <div className='row'>
                            <h4 style={{color : 'red'}}>{deskripsi}</h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return { detailProduk : state.selectedProduk }
}


export default connect(mapStateToProps , { select_produk })(produkDetail);