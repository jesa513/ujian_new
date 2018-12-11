import React from 'react'
import { connect } from 'react-redux'
import { select_produk, tambahCart } from '../../actions'
import {Input , Form} from 'reactstrap'
import axios from 'axios'


const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR' })
class mapping extends React.Component {


    onProdukClick = () => {
      this.props.select_produk(this.props.list)
    } 

    onCartBtn = () => {
    var idproduk = this.props.list.id
    var namaproduk = this.props.list.namaproduk
    var img = this.props.list.img
    var hargaproduk = this.props.list.harga
    var qty = this.refs.qty.refs.innerqty.value
    
    axios.post('http://localhost:2000/cart' , {
      
      username : this.props.username,
      id_produk : idproduk,
      nama_produk : namaproduk,
      img : img,
      harga_produk : hargaproduk,
      kuantitas : qty,
      total : hargaproduk*qty,
      id_order : 1
    }).then((res) => {
      console.log(res)
      alert('Produk berhasil dimasukan ke Keranjang')
      this.props.tambahCart() 
    }).catch((err) => {
      console.log(err)
    })
    }


    render(){
            return(   
              <div  className={`col-md-4 col-sm-6 portfolio-item filter`}>
                      <a className="portfolio-link" data-toggle="modal" onClick={this.onProdukClick} >
                        <div className="portfolio-hover">
                          <div className="portfolio-hover-content">
                            <i className="fas fa-plus fa-3x" />
                          </div>
                        </div>
                        <img className="img-fluid" src={this.props.list.img} alt />
                      </a>
                      <div className="portfolio-caption">
                        <h4 > {this.props.list.namaproduk}</h4>
                        <p className="text-muted">{rupiah.format(this.props.list.harga)}</p>
                        <center>
                        <div className="col-8"> 
                        <Form inline>
                        <Input type="number" style={{ marginLeft:'20px' , width: '60px' , marginRight:'20px'}} ref='qty' innerRef = 'innerqty' defaultValue = '1'/>
                        <Input type="button" className="btn-danger" value='Add' onClick={this.onCartBtn}/>
                        </Form>
                        </div>
                        </center>
                      </div>     
              </div>  
              )                            
    }
}

const mapStateToProps = (state) => {
  return{
    username : state.auth.username
   }
}

export default connect(mapStateToProps , {select_produk , tambahCart})(mapping) //Function yang return Function