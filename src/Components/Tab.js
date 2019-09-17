
import React from "react"
import NINE from "../nl_logo.png";
import {BrowserRouter,Link,browserHistory,Redirect} from "react-router-dom";
import { withRouter } from "react-router";
import { Icon,Button} from 'semantic-ui-react'
import 'semantic-ui/dist/semantic.min.css';



class Tab extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     mid:this.props.mid,
        //     id:this.props.id,
        //     month:this.props.month,
        //     pro:this.props.pro
        // }
    //     console.log('jjj',this.state.id)
        this.onGoalsClick=this.onGoalsClick.bind(this)
        this.onFeedbackClick=this.onFeedbackClick.bind(this)  
    }
    // componentDidMount(){
    //  this.setState({id:this.props.mid});
    //    console.log(this.props.month)
    // }
     onFeedbackClick(){

        this.props.history.push("/static-form/"  +this.props.mid+"/" +this.props.id+"/" +this.props.emp+"/" + this.props.pro)
    }
    onGoalsClick(){
        this.props.history.push("/dynamic-form/"  +this.props.mid+"/" +this.props.id+"/" +this.props.emp+"/" + this.props.pro)
    }
    render() {
console.log(this.props.month)
        
        return (
            <BrowserRouter>
           <div>
<Button.Group widths='3'>
<Button color="teal" onClick={this.onFeedbackClick.bind(this)} >Feedback</Button>
<Button color="yellow" onClick={this.onGoalsClick.bind(this)} >Goals</Button>
</Button.Group>
</div>
            </BrowserRouter>

        )
    }
}
export default withRouter(Tab)