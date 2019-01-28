import React, { Component } from 'react';
import axios from 'axios';

class Managemovies extends Component {

    state = { listMovie: [], idTabel: 0 }

    componentDidMount() {
        this.getMovieList();
    }

    getMovieList = () => {
        axios.get('http://localhost:1990/movielist')
        .then((res) => {
            this.setState({ listMovie: res.data, idTabel: 0 })
            // console.log(this.state.listPopok)
        }).catch((err) => {
            console.log(err)
        })
    }

    onBtnAddClick = () => {
        var nama = this.refs.namaAdd.value;
        var tahun = this.refs.tahunAdd.value;
        var description = this.refs.descAdd.value;

        if(nama === '' || tahun === '' ||  description === ''){
            window.alert('Ada kolom yang belum di isi !!!')
        }else{
            axios.post('http://localhost:1990/addmovie', {
                nama, tahun, description
            }).then((res) => {
                this.getMovieList();
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Yakin nih bro?')){
            axios.post('http://localhost:1990/deletemovie/' + id)
                .then((res) => {
                    this.getMovieList();
                }).catch((err) => {
                    console.log(err)
                    console.log(typeof id)
                    console.log(id)
                })
        }
    }

    onBtnEditText = (idNya) => {  
        this.setState({ idTabel: idNya })   
    }

    //SAVE
    onBtnSaveClick = (id) => {
        var nama = this.refs.namaSAVE.value;
        var tahun = this.refs.tahunSAVE.value;
        var description = this.refs.descSAVE.value;
        console.log(description)
        axios.post('http://localhost:1990/editmovie/' + id, {
            nama,tahun, description
        }).then((res) => {
            console.log(res.data)
            //this.setState({idTabel:0})
            this.getMovieList();
            // console.log('masuk')
        }).catch((err) => {
            console.log(err)
           
        })
    }

    //Cancel
    onCancel = () => {  
        this.setState({ idTabel: 0 })   
    }

    renderBodyMovies = () => {
        var listJSXMovies = this.state.listMovie.map(({ id, nama, tahun, description}) => {
            // console.log(`${this.state.idTabel} --- ${id}`)
            if(this.state.idTabel === id){
                return (
                    <tr>
                        <td>{id}</td>
                        <td><input ref="namaSAVE" type="text" defaultValue={nama} className="form-control" style={{width: "100px"}} /></td>    
                        <td><input ref="tahunSAVE" type="number" defaultValue={tahun} className="form-control" style={{width: "100px"}} /></td>
                        <td><textarea ref="descSAVE" defaultValue={description} className="form-control"></textarea></td>
                        <td><input className="btn btn-success" type="button" value="Save" onClick={() => this.onBtnSaveClick(id)}/></td>
                        <td><input className="btn btn-danger" type="button" value="Cancel" onClick={this.onCancel}/></td>
                    </tr>
                )
            }else{
                return (
                    <tr>
                        <td>{id}</td>
                        <td>{nama}</td>
                        <td>{tahun}</td>
                        <td>{description}</td>
                        <td><input className="btn btn-primary" type="button" value="Edit" onClick={() => this.onBtnEditText(id)}/></td>
                        <td><input className="btn btn-danger" type="button" value="Delete" onClick={() => this.onBtnDeleteClick(id)} /></td>
                    </tr>
                )
            }
        })
        return listJSXMovies;
    }

    render(){
        return(
            <div>

                <div className="container">

                    <div className="title-bg">
                        <div className="title"><center><h1>Movies list</h1></center></div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered chart">
                            <thead>
                                <tr>
                                <th>Id</th>
                                <th>Nama film</th>
                                <th>Tahun</th>
                                <th>Description</th>
                                <th colSpan="2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderBodyMovies()}
                            </tbody>
                            <tfoot>
                                <tr>
                                <td></td>
                                    <td><input ref="namaAdd" type="text" placeholder="Nama film" className="form-control" style={{width: "120px"}} /></td>
                                    <td><input ref="tahunAdd" type="number" placeholder="tahun film" className="form-control" style={{width: "130px"}} /></td>
                                    <td>
                                        <textarea ref="descAdd" placeholder="Enter The Description Here..." className="form-control" style={{width: "200px"}}></textarea>
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

export default Managemovies;