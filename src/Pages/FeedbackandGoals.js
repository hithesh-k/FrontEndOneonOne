import React from 'react'
import 'semantic-ui/dist/semantic.min.css';
import Header from "../Components/Header";
import Tab from "../Components/Tab"
import Footer from "../Components/Footer";
import axios from 'axios'
import { Form, TextArea, Button, Segment, Icon, Label } from 'semantic-ui-react';
import { Redirect } from "react-router-dom";
import apiconstants from '../Config';
import Pop from './Pop';
import Popup1 from '../Components/popup1'
import Year from "../Components/YearMonthPicker"
import popup1 from '../Components/popup1';

var bgColors = {
  "Yellow": "#d3d3d3",
};

class Employeepage1 extends React.Component {

  constructor() {
    super();
    this.state = {
      dis: '',
      button: true,
      form: [],
      showPopup: false,
      mm:(new Date().getMonth()+1),
      yr:(new Date().getFullYear()),
    };
  }
  togglePopup() {
    console.log('toggled');
    this.setState({
      showPopup: !this.state.showPopup
    });
    console.log('toggled and the state is ' + this.state.showPopup);
  }

  componentWillMount() {
    let id = this.props.match.params.id
    this.setState({id:id})
    
    this.prepopulate(id+'',this.state.mm+'',this.state.yr+'')
    // const response = axios({
    //   method: 'post',
    //   url: apiconstants.URL + `prepopulate/${id}/${this.state.mm}/${this.state.yr}`,
    // })
    //   .then(response => {
    //     console.log(response.data)
    //     this.setState({ dynamic: response.data })
        
    //   })
  }
  prepopulate(id,mon,year){
    axios({
      method: 'post',
      url: apiconstants.URL + `prepopulate/${id}/${mon}/${year}`,
    })
      .then(response => {
        console.log(response.data)
        console.log(response.data[1].answer)
        this.setState({ form: response.data })
        
      })
  }
  setRedirect = (event) => {
    event.preventDefault();
    console.log(this.state)
    this.setState({
      redirect: true
    })
  };

  setRedirect1 = (event) => {
    event.preventDefault();
    console.log(this.state)
    this.setState({
      redirect1: true
    })
  };

  store_Year=(year)=>{
    this.setState({
      yr:year
    },()=>{
      this.prepopulate(this.state.id+'',this.state.mm+'',this.state.yr+'')
    })
  }
  store_Month=(mon)=>{
    this.setState({
      mm:mon
    },()=>this.prepopulate(this.state.id+'',this.state.mm+'',this.state.yr+''))
  }

handelAlert(){
  alert("You have agreed to current feedback !")

}

  render() {

    return (

      <div className="manbg">
        <Header idd={this.props.match.params.id} />

        {/* <Tab mid={this.props.match.params.mid}
          id={this.props.match.params.id}
          month={this.props.match.params.month}
          emp={this.props.match.params.emp}
          pro={this.props.match.params.pro}
        // pathURL={pathURL}
        /> */}

        <Label size='large' style={{ color: "black", width: "auto" }} ><Icon name='user' />
          {this.props.match.params.emp}
        </Label>
        <Year changeYear={this.store_Year.bind(this)} changeMonth={this.store_Month.bind(this)}/>

        {this.state.form.map(el => (
          <Form>
            <input value={el.qno + "."+  el.question} />
            <TextArea style={{ backgroundColor: bgColors.Yellow }}
              value={el.answer}
              disabled={true}
            />
          </Form>
        ))}

        <button
          style={{ width: "auto", }}
          // onClick={()=>this.setState({agree:true})}
          onClick={this.handelAlert}
          className="ui green button">  I Agree</button>
           {/* {
          this.state.agree === true &&
        
          <div>
            <Pop
              type="agree"
              text='Reason to agree'
              closePopup={this.togglePopup.bind(this)}
            />
          </div>
        } */}


        <button onClick={this.togglePopup.bind(this)}
          style={{ width: "auto", }}
          className="ui red button">Disagree</button>
        {
          this.state.showPopup === true &&
          <div>
            <Pop
              type="disagree"
              text='Reason for disagree'
              closePopup={this.togglePopup.bind(this)}
            />
          </div>

        }
        <Footer />

      </div>
    );
  }
}

export default Employeepage1