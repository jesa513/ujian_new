import React from 'react'
import '../../support/startbootstrap-agency-gh-pages/startbootstrap-agency-gh-pages/css/agency.css'
import '../../support/startbootstrap-agency-gh-pages/startbootstrap-agency-gh-pages/vendor/fontawesome-free/css/fontawesome.min.css'
import '../../support/startbootstrap-agency-gh-pages/startbootstrap-agency-gh-pages/vendor/fontawesome-free/css/all.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ListMap from './mapItem'
import Cookies from 'universal-cookie'
import { Input , Form , FormGroup } from 'reactstrap'

const marRight = {marginRight: '20px'}
const cookies = new Cookies
var total = 12
var size = 4
var check = true
class ProdukList extends React.Component{
    state = {listProduk : [] , searchData : []}
 
    componentDidMount(){
        axios.get('http://localhost:2000/produk')
            .then((data) => {
                // console.log(data.data)
                this.setState({ listProduk : data.data , searchData : data.data })
            }).catch((err) => {
                console.log(err)
            })
    }
   
    renderListProduk = () => {
        var listJSXProduk = this.state.searchData.map((val) => {
          if(total === 0 && check === true){
              size = 6
              total = 12
              check = false
          }else if(total === 0 && check === false){
            size = 4
            total = 12
            check = true
          }
          total -= size
            return(
                <ListMap list={val} size={size} />
            )
        })
        return listJSXProduk;
    }

    fnFilterName = () => {
      let input = this.refs.filterName.refs.innerFilterName.value
      let filter = input.toUpperCase()
      let filterSelect = this.refs.select.refs.selectInner.value
      // let index = filter.indexOf()
      // console.log(index)
      // console.log(filter)
      // var temp = []
      // console.log(this.state.listProduk[1])
      let nama = this.state.listProduk
      // console.log(nama)
      // console.log(nama.indexOf(input))
      // var mapping = nama.map((val) => [val.namaproduk] )
      // console.log(filtering)
      let id = document.getElementsByClassName('filter')
      for(let i = 0 ; i <= nama.length-1 ; i ++){
        if(nama[i].namaproduk.toUpperCase().indexOf(filter) > -1 && nama[i].kategori.indexOf(filterSelect) > -1){
          id[i].style.display = ''
        }else{
          id[i].style.display = 'none'
        }
      }
      
    }
    fnFilterPrice = ()=>{
      let from = this.refs.priceFrom.refs.priceFromInner.value
      let until = this.refs.priceUntil.refs.priceUntilInner.value
      let nama = this.state.listProduk
      let id = document.getElementsByClassName('filter')
      for(let i = 0 ; i <= nama.length-1 ; i ++){
        if(nama[i].harga >= from && nama[i].harga <= until){
          id[i].style.display = ''
        }else{
          id[i].style.display = 'none'
        }
      }
    }

    fnFilterByKategori = () => {
      let filter = this.refs.select.refs.selectInner.value
      let filterName = this.refs.filterName.refs.innerFilterName.value
      let filterNameUpper = filterName.toUpperCase()
      let nama = this.state.listProduk
      let id = document.getElementsByClassName('filter')
      for(let i = 0 ; i <= nama.length-1 ; i ++){
        if(nama[i].kategori.indexOf(filter) > -1 && nama[i].namaproduk.toUpperCase().indexOf(filterNameUpper)> -1){
          id[i].style.display = ''
        }else{
          id[i].style.display = 'none'
        }
      }

      console.log(filter)
    }

    onBtnClick = () => {
      var input = this.refs.filterNameBtn.refs.filterNameBtnInner.value
      var selectBtn = this.refs.selectBtn.refs.selectInnerBtn.value
      var priceFromBtn = parseInt(this.refs.priceFromBtn.refs.priceFromInnerBtn.value)
      var priceUntilBtn = parseInt(this.refs.priceUntilBtn.refs.priceUntilInnerBtn.value)
      console.log(priceFromBtn)
      console.log(priceUntilBtn)

      var arrSearch = this.state.listProduk.filter((val) => {
        return val.namaproduk.toLowerCase().includes(input.toLowerCase()) && val.kategori == selectBtn && val.harga >= priceFromBtn && val.harga <= priceUntilBtn
      })

      this.setState({searchData : arrSearch})
    }
    
    render(){
      const username = cookies.get('Ferguso')
      if(username !== undefined){
        if(this.props.detailProduk.id !== 0){
          return <Redirect to={`/produkdetail?produkid=${this.props.detailProduk.id}&namaproduk=${this.props.detailProduk.namaproduk}`}/>
        }
        return(
          <section className="bg-light" id="portfolio">
          <div className="container">
    
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase">Produk of The Year</h2>
                <h3 className="section-subheading text-muted">Produk paling laku di tahun ini</h3>
              </div>
            </div>
            <div style={{marginBottom: '20px' , marginLeft:'120px'}}>
              <Form inline>
              <Input type = 'text' placeholder = "search By Name" style={marRight} ref = 'filterNameBtn' innerRef = 'filterNameBtnInner'></Input> {''}
              <Input type="select" name="select"  ref="selectBtn" style={marRight} innerRef='selectInnerBtn'>
                <option value="">Filter By Kategori</option>
                <option value="Makanan">Makanan</option>
                <option value="Minuman">Minuman</option>
                <option value="Desert">Desert</option>
              </Input>
              <Input type="text" style={marRight} placeholder = 'price from' ref="priceFromBtn" innerRef="priceFromInnerBtn" />
              <Input type="text" style={marRight} placeholder = 'until' ref="priceUntilBtn" innerRef="priceUntilInnerBtn" />
              <Input type = 'button' value="Search" className='btn btn-primary' onClick={this.onBtnClick}></Input>
              </Form>
            </div>
            <center>
            <div style={{marginBottom: '20px' , marginLeft:'120px'}}>
              <Form inline>
              <Input type="text" style={marRight} placeholder = 'search by name' ref='filterName' innerRef="innerFilterName" onKeyUp={this.fnFilterName}/>
              <Input type="text" style={marRight} placeholder = 'price from' ref="priceFrom" innerRef="priceFromInner" onKeyUp={this.fnFilterPrice}/>
              <Input type="text" style={marRight} placeholder = 'until' ref="priceUntil" innerRef="priceUntilInner" onKeyUp={this.fnFilterPrice} />
              <FormGroup>
              {/* <Label for="exampleSelect">Select</Label> */}
              <Input type="select" name="select"  ref="select" innerRef='selectInner' onClick={this.fnFilterByKategori}>
                <option value="">Filter By Kategori</option>
                <option value="Makanan">Makanan</option>
                <option value="Minuman">Minuman</option>
                <option value="Desert">Desert</option>
              </Input>
            </FormGroup>
              </Form>
            </div>
            </center>
            <div className="row">
              {this.renderListProduk()}
            </div>
          </div>
          </section>
        )
    }else{ 
      return <Redirect to='/login' />
   
  }
    }
}
const mapStateToProps = (state) => {
  return{
    username : state.auth.username, detailProduk : state.selectedProduk 
  }
}



export default connect(mapStateToProps)(ProdukList);