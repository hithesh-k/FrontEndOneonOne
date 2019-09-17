import React from 'react'
import Header from '../Components/Header'
import 'semantic-ui/dist/semantic.min.css';
import './Manager.css'
//import Sidebar from '../Components/Sidebar'
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import apiconstants from '../Config';
import { Form, TextArea, Button, Segment, Icon, Label, Table, Dropdown, Placeholder } from 'semantic-ui-react';
import axios from 'axios'

export default class Managerpage1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data1: '',
            repo: [],
            empname: '',
            email: '',
            phone: '',
            designation: '',
            id: '',
            idd: '',
            newReporties: [],
            locationPath: ""

        };
    }

    componentDidMount = () => {
        this.autho();
        console.log(this.state.data)
        this.setState({ locationPath: this.props.history.location.pathname })
    }

    handleChangereportie(e) {
        this.setState({ id: e.target.value });
    }

    autho() {

        let id = this.props.match.params.mid

        fetch(apiconstants.URL + `managerlist/${id}`, {
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res[0])
                console.log('res', JSON.stringify(res));

                this.setState({ data: res });
            })
    }

   
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    };
    render() {
        // const { data1 } = this.state;
        // const { data } = this.state;
        // const pathURL = this.state.locationPath;
        // console.log(this.props)
        // var mid = this.props.match.params.mid;
        // console.log(mid)
        return (
            <div className="manbg">
                <div>
                    <Header mid={this.props.match.params.mid} pathURL={this.state.locationPath} />
                </div>
                <div>
                    <div>
                        {/* <Sidebar /> */}
                    </div>
                </div>
                <h2 className="listofr" style={{ color: "black" }}>List of Reportees </h2>
                <div className="container" style={{ width: "600px" }}>
                    <ul className="responsive-table" style={{ color: "black" }}>
                        <li className="table-header">
                            <div className="col col-1">Employee ID</div>
                            <div style={{ paddingRight: "170px" }} >Employee<br /> Name</div>
                        </li>


                        {
          this.state.data.map((row) => (
                <li className="table-row">
              <div className="col col-1">
                    {row.id}
              </div>
             <div className="col col-2" >
             <Link to={"/static-form" + "/" + this.props.match.params.mid + "/" + row.id + "/" + row.name + "/" + this.state.data1.name} >{row.name}</Link>
              </div>

                                </li>
                            ))
                        }
                    </ul>
                </div>
                <Footer />
            </div>
        
        );
    }
}

// export default Managerpage1