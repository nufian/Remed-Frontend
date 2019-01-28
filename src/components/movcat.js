import React, { Component } from 'react';
import axios from 'axios';

class ManageCategories extends Component {

    state = { listConn: [] }

    componentDidMount() {
        this.getConnList();
    }

    getConnList = () => {
        axios.get('http://localhost:1990/movcatlist')
        .then((res) => {
            this.setState({ listConn: res.data })
            // console.log(this.state.listPopok)
        }).catch((err) => {
            console.log(err)
        })
    }

    onBtnAddClick = () => {
        var nama_film = this.refs.namafilmAdd.value;
        var nama_category = this.refs.namacategoryAdd.value;

        if(nama_film === '' || nama_category ===''){
            window.alert('Ada kolom yang belum di isi !!!')
        }else{
            axios.post('http://localhost:1990/addmovcat', {
                nama_film,nama_category
            }).then((res) => {
                this.getConnList();
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    onBtnDeleteClick = (id_film) => {
        if(window.confirm('Yakin nih bro?')){
            axios.post('http://localhost:1990/deletemovcat/' + id_film)
                .then((res) => {
                    this.getConnList();
                }).catch((err) => {
                    console.log(err)
                    console.log(typeof id_film)
                    console.log(id_film)
                })
        }
    }


    renderBodyConn = () => {
        var listJSXConn = this.state.listConn.map(({ id_film, nama_film, nama_category}) => {
                return (
                    <tr>
                        <td>{nama_film}</td>
                        <td>{nama_category}</td>
                        <td><input className="btn btn-danger" type="button" value="Delete" onClick={() => this.onBtnDeleteClick(id_film)} /></td>
                    </tr>
                )
            
        })
        return listJSXConn;
    }
    getNamafilm =()=>{
        var namafilm = this.state.listConn.map(({nama_film})=>{
            return(
                <option>{nama_film}</option>
            )
        })
        return namafilm
    }
    getNamakategori =()=>{
        var namakategori = this.state.listConn.map(({nama_category})=>{
            return(
                <option>{nama_category}</option>
            )
        })
        return namakategori
    }

    render(){
        return(
            <div>

                <div className="container">

                    <div className="title-bg">
                        <div className="title"><center><h1>Categories list</h1></center></div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered chart">
                            <thead>
                                <tr>
                                <th>Nama film</th>
                                <th>Nama genre</th>
                               
                                <th colSpan="2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderBodyConn()}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>
                                    <select ref="namafilmAdd" className="form-control" >
                                      {this.getNamafilm()}  
                                    </select>
                                    </td>
                                    <td>
                                    <select ref="namacategoryAdd" className="form-control" >
                                   {this.getNamakategori()}
                                    </select>
                                    </td>
                                    <td><input type="button" className="btn btn-success" value="Add" onClick={this.onBtnAddClick}/></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                </div>

            </div>
        )
    }
}

export default ManageCategories;