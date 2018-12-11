import React, {Component} from 'react'
import '../support/css/manage.css'
import axios from 'axios'
import { editClick } from '../actions'
import { connect } from 'react-redux'

class ManageProduct extends Component {
    state = { listProduk : [], selectedEdit : 0}
    componentDidMount(){
       this.getList()
    }

    getList = () => {
        axios.get('http://localhost:2000/produk')
        .then((data) => {
            console.log(data.data)
            this.setState({ listProduk : data.data })
        }).catch((err) => {
            console.log(err)
        })
    }

    onBtnAddClick = ()=> {
        var namaproduk = this.refs.namaprodukAdd.value;
        var kategori = this.refs.kategoriAdd.value;
        var harga = this.refs.hargaAdd.value;
        var deskripsi = this.refs.deskripsiAdd.value;
        var img = this.refs.imgAdd.value;
        axios.post('http://localhost:2000/produk' , {
            namaproduk,kategori,harga,deskripsi,img
        }).then((res) => {
            this.getList()
        }).catch((err) => {

        })
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Are You Sure?')){
            axios.delete('http://localhost:2000/produk/' + id)
            .then((res) => {
                this.getList()
            }).catch((err) => {

            })
        }
    }
    

    onBtnEditClick = (id) => {
        this.setState({selectedEdit : id})
    }
    // onBtnEditClick = (id) => {
    //     axios.get('http://localhost:2000/produk/' + id)
    //     .then((res) => {
    //         var temp = 
    //         `<tr>
    //             <td>${id}</td>
    //             <td><select>
    //                     <option>Makanan</option>
    //                     <option>Minuman</option>
    //                     <option>Desert</option>
    //                 </select></td>
    //             <td><input type = "text" placeholder="${res.data.namaproduk}" /></td>
    //             <td><input type = "number" placeholder="${res.data.harga}" /></td>
    //             <td><input type = "text" placeholder="${res.data.deskripsi}" /></td>
    //             <td><input type = "text" placeholder="Masukan Link gambar"/></td>
    //             <td><input type="button" class="btn btn-success" value="confirm"/></td>
    //             <td><input type="button" class="btn btn-danger" value="cancel" onclick=/></td>
    //         </tr>`
    //         document.getElementById(id).innerHTML = temp
    //     })
    // }

    // onBtnEditClick = (id) => {
    //     axios.get('http://localhost:2000/produk/' + id)
    //     .then((res) => {
    //         const ubah = res.data
    //         const temp = ubah.map((val) => {
    //             return(
    //                 <tr>
    //                 <td>{val.id}</td>
    //                 <td>
    //                         <select ref="kategoriEdit">
    //                             <option>Makanan</option>
    //                             <option>Minuman</option>
    //                             <option>Desert</option>
    //                         </select>
    //                 </td>
    //                 <td><input type="text" ref='namaprodukEdit'/></td>
    //                 <td><input type="number" ref="hargaEdit"/></td>
    //                 <td><input type="text" ref="deskripsiEdit"/></td>
    //                 <td><input type="text" ref="imgEdit"/></td>
    //                 <td><input type="button" className="btn btn-success" value="save" onClick={()=> this.onBtnEditClick(val.id)} /></td>
    //                 <td><input type="button" className="btn btn-danger" value="cancel" onClick={()=> this.onBtnDeleteClick(val.id)}/></td>
    //             </tr> 
    //             )
    //         })
    //         document.getElementById(id).innerHTML=temp
    //     })
    //     // this.props.editClick()
    // }
    // UbahInput = () => {
    //     var ubahInput = this.state.listProduk.map((val) => {
    //         return(
    //             <tr>
    //             <td>${id}</td>
    //             <td><select>
    //                     <option>Makanan</option>
    //                     <option>Minuman</option>
    //                     <option>Desert</option>
    //                 </select></td>
    //             <td><input type = "text" placeholder={res.data.namaproduk}/></td>
    //             <td><input type = "number" placeholder={res.data.harga}/></td>
    //             <td><input type = "text" placeholder={res.data.deskripsi} /></td>
    //             <td><input type = "text" placeholder="Masukan Link gambar"/></td>
    //             <td><input type="button" className="btn btn-success" value="confirm"/></td>
    //             <td><input type="button" className="btn btn-danger" value="cancel" onClick= {console.log('Hallo')} /></td>
    //         </tr>
    //         )
    //     })
    //     return ubahInput;
    // }
    cancelClick = () => {
        this.setState({selectedEdit : 0})
    }

    onSaveClick = () => {
        let namaproduk = this.refs.namaprodukEdit.value
        let harga = this.refs.hargaEdit.value
        let kategori = this.refs.kategoriEdit.value
        let deskripsi = this.refs.deskripsiEdit.value
        let img = this.refs.imgEdit.value
        axios.put('http://localhost:2000/produk/' + this.state.selectedEdit , {
            namaproduk,kategori,harga,deskripsi,img
        }).then((res) => {
            console.log(res)
            this.getList()
            this.setState({selectedEdit:0})
        }).catch((err) => {
            console.log(err)
        })
    }

    renderBody = () => {
        var listJSXProduk = this.state.listProduk.map((val) => {
            if(val.id===this.state.selectedEdit){
                return(
                    <tr>
                    <td>{val.id}</td>
                    <td>
                            <select ref="kategoriEdit" defaultValue={val.kategori}>
                                <option>Makanan</option>
                                <option>Minuman</option>
                                <option>Desert</option>
                            </select>
                    </td>
                    <td><input type="text" ref='namaprodukEdit' defaultValue={val.namaproduk}/></td>
                    <td><input type="number" ref="hargaEdit" defaultValue={val.harga}/></td>
                    <td><input type="text" ref="deskripsiEdit" defaultValue={val.deskripsi}/></td>
                    <td><input type="text" ref="imgEdit" defaultValue={val.img}/></td>
                    <td><input type="button" className="btn btn-success" value="save" onClick={this.onSaveClick} /></td>
                    <td><input type="button" className="btn btn-danger" value="cancel" onClick={this.cancelClick}/></td>
                </tr> 
                )
            }
            return(
                <tr id={val.id}>
                    <td>{val.id}</td>
                    <td>{val.kategori}</td>
                    <td>{val.namaproduk}</td>
                    <td>Rp. {val.harga}</td>
                    <td>{val.deskripsi}</td>
                    <td><img src={val.img} width="50px" alt={val.id}/></td>
                    <td><input type="button" className="btn btn-primary" value="edit" onClick={() => this.onBtnEditClick(val.id)} /></td>
                    <td><input type="button" className="btn btn-primary" value="Delete" onClick={()=> this.onBtnDeleteClick(val.id)}/></td>
                </tr>
            )
        })
        return listJSXProduk;
    }

    render(){
        return(
            <div>
                <h1>Management Product</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Kategori</th>
                            <th>Nama</th>
                            <th>Harga</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBody()}
                    </tbody>
                    <tfoot>
                        <td></td>
                        <td>
                            <select ref="kategoriAdd">
                                <option>Makanan</option>
                                <option>Minuman</option>
                                <option>Desert</option>
                            </select>
                        </td>
                        <td> <input type="text" placeholder="Nama Produk" ref="namaprodukAdd" defaultValue=""/></td>
                        <td> <input type="number" placeholder="Harga Produk" ref="hargaAdd" defaultValue=""/></td>
                        <td> <textarea placeholder="Enter the Description" ref="deskripsiAdd" defaultValue=""/></td>
                        <td> <input type="text" placeholder="Image Produk" ref="imgAdd" defaultValue=""/></td>
                        <td> <input type="button" className="btn btn-primary" value="add" onClick={this.onBtnAddClick}/></td>
                    </tfoot>
                </table>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {edit : state.auth.edit}
}

export default connect(mapStateToProps,{editClick})(ManageProduct);



// 
// 