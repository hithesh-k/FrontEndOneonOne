import React from "react"
import NINE from "../nl_logo.png";
import {BrowserRouter,Link,browserHistory,Redirect} from "react-router-dom";
import { withRouter } from "react-router";
import { Icon} from 'semantic-ui-react'
import 'semantic-ui/dist/semantic.min.css';



class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:this.props.mid,
        }
        console.log('jjj',this.state.id)
        this.onItemClick=this.onItemClick.bind(this)
        
    }
    componentDidMount(){
     this.setState({id:this.props.mid});  
    }
     onLogoutClic(){
        localStorage.clear();
        window.location="/login"
        
    }
    onItemClick(){
        this.props.history.push("/manager/"+this.state.id)
    }
    render() {
// console.log(this.props.history.push)
        
        return (
            <BrowserRouter>
            <header>
                <div>
                    <nav>
                        <div className="header">
                        <Link onClick={this.onItemClick} > <img   src={NINE} alt="nineleaps"/> </Link>
                        <Link onClick={this.onItemClick } style={{marginLeft:"650px"}} > <Icon name='home' />   Home</Link>
                        <Link onClick={this.onLogoutClic} style={{marginInlineStart:"left"}}> <Icon name='sign-out' /> Logout</Link>
                         
                        </div>

                    </nav>

                </div>
            </header>
            </BrowserRouter>

        )
    }
}
export default withRouter(Header)