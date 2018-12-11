import React, {Component} from 'react'
import '../support/css/manage.css'
import axios from 'axios'
import { editClick } from '../actions'
import { connect } from 'react-redux'

class History extends React.Component {
    state = {listHistory : []}
  componentDidMount(){
    this.renderListCart()
  }

  renderListCart = () => {
    axios.get('http://localhost:2000/history' , {
      params : {
        username : this.props.username
      }
    })
    .then((res) => {
      console.log(res)
      this.setState({listHistory : res.data})
    })
    var listJsx = this.state.listHistory.map((val) => {
      
        return(
        
          <tr>
            <th><img src={val.img} width="50px" alt={val.id}/></th>
            <td>{val.nama_produk}</td>
            <td>{val.harga_produk}</td>
            <td style={{width:'20px'}}>{val.kuantitas}</td>
            <td style={{width:'20px'}}>{val.total}</td>
          </tr>
          
        
      )
     
    })

    return listJsx;
  }
}

export default History