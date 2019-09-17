// import React from "react"
// import NINE from "../nl_logo.png";
// import { BrowserRouter, Link, browserHistory, Redirect } from "react-router-dom";
// import { withRouter } from "react-router";
// import { Icon } from 'semantic-ui-react'
// import 'semantic-ui/dist/semantic.min.css';
// import './Sidebar.css';
// import apiconstants from '../Config';

// class Sidebar extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data1: ''
//         }
//         // this.onItemClick=this.onItemClick.bind(this)

//     }
//     componentDidMount = () => {
//         this.setState({ id: this.props.mid });

//         let id = this.props.match.params.mid

//         fetch(apiconstants.URL + `profile/${id}`, {
//             method: 'GET',

//             headers: {
//                 'content-Type': 'application/json',
//                 'Accept': 'application/json',
//             },
//         })
//             .then(res => res.json())
//             .then(res => {
//                 console.log('res', JSON.stringify(res));
//                 this.setState({ data1: res });
//                 console.log(res.name)
//             })
//     }

//     render() {
//         // console.log(this.props.history.push)
//         const { data1 } = this.state;
//         console.log(data1)
//         return (
//             <BrowserRouter>
//                 <nav>
//                     <div class="sidenav" id="sidebar">
//                         <div className="profiletab" style={{fontSize:"10px"}} >
//                             <img style={{ width: "50px" }} />
//                             {data1.name}<br />
//                             {data1.email}
//                         </div>
//                         <a href="#about">My Feedback</a>
//                         <a href="#services">My Goals</a>

//                     </div>
//                 </nav>
//             </BrowserRouter>
//         )
//     }
// }
// export default withRouter(Sidebar)