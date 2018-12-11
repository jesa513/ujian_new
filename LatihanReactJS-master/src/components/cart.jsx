import React from 'react';
import { Table,Input } from 'reactstrap';
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR' })
class Cart extends React.Component {
    state = {listCart : []}
  componentDidMount(){
    this.renderListCart()
  }

  onBtnDeleteClick = (id) => {
    if(window.confirm('Are You Sure?')){
        axios.delete('http://localhost:2000/cart/' + id)
        .then((res) => {
            this.getList()
        }).catch((err) => {

        })
    }
}


onBtnEditClick = (id) => {
    this.setState({selectedEdit : id})
}




  renderListCart = () => {
    axios.get('http://localhost:2000/cart' , {
      params : {
        username : this.props.username
      }
    })
    .then((res) => {
      console.log(res)
      this.setState({listCart : res.data})
    })
    var listJsx = this.state.listCart.map((val) => {
      
        return(
        
          <tr id={val.id}>
            <th><img src={val.img} width="50px" alt={val.id}/></th>
            <td>{val.nama_produk}</td>
            <td>{rupiah.format(val.harga_produk)}</td>
            <td style={{width:'20px'}}>{val.kuantitas}</td>
            <td style={{width:'20px'}}>{rupiah.format(val.total)}</td>
            <td><input type="button" className="btn btn-primary" value="Edit" onClick={() => this.onBtnEditClick(val.id)} /></td>
            <td><input type="button" className="btn btn-primary" value="Remove" onClick={()=> this.onBtnDeleteClick(val.id)}/></td>
          </tr>
          
        
      )
     
    })

    return listJsx;
  }
  onCheckOut = () => {

    axios.post('http://localhost:2000/history', {
      username : this.props.username,
      order : this.state.listCart
    })
    .then((res) => {
      console.log(res)
      for(let i = 0 ; i < this.state.listCart.length ; i ++){
        axios.delete('http://localhost:2000/cart/' + this.state.listCart[i].id    
        ).then((res) => {
          console.log(res)     
          this.renderListCart()      
        })
      }
    
    })
    
  }

  renderTotalHarga = () => {
    var a = 0
    for(let i = 0; i < this.state.listCart.length ; i++){
      a += this.state.listCart[i].total
    }
    return(
      <div className='col-2'>
      <h3>{rupiah.format(a)}</h3>
       <Input className="btn-primary" type='button' value='CHECKOUT' onClick ={this.onCheckOut}/>
      </div>
    )
  }

  render() {
    if(this.state.listCart.length > 0){
      return (
        <div className='container'>
        <center>
            <h1 style={{marginTop:'20px'}}>
                CART
            </h1>
        </center>
      <Table style={{marginTop:'40px'}}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Nama Produk</th>
            <th>Harga Barang</th>
            <th>Kuantitas</th>
            <th>Total</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
        
        {this.renderListCart()}
        
        
      </Table>
      <center>
          {this.renderTotalHarga()}
      </center>
      </div>
    );
    }else{
      return(
        <center>
          <div className='col-4'>
          <h1>Keranjang anda kosong</h1>
          <Link to='/produk'><Input type="button" className='btn-primary' value="Lanjutkan Belanja"/></Link>          
          </div>
        </center>
      )
    }
    
  }
}
const mapStateToProps = (state) => {
  return{
    username : state.auth.username
  }
}

export default connect(mapStateToProps) (Cart)