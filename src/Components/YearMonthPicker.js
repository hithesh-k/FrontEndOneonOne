
import React from "react"
import NINE from "../nl_logo.png";
import { BrowserRouter, Link, browserHistory, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { Icon, Button, Label } from 'semantic-ui-react'
import 'semantic-ui/dist/semantic.min.css';
import MonthYearPicker from 'react-month-year-picker';
import "./YearMonthpicker.css"

class Year extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      button: false,
      date: "",
      year: '',
      month: ""
    };
    this._onchangemonth = this.props.changeMonth;
    this._onchangeyear = this.props.changeYear;
  }
  // this.onGoalsClick=this.onGoalsClick.bind(this)
  // this.onFeedbackClick=this.onFeedbackClick.bind(this)



  componentDidMount() {
    this.getDate();
  }

  getDate = () => {
    // // var date = new Date().toDateString();
    // var date = new Date().getMonth()  .toDateString();
    // this.setState({ date });
    // console.log("date is" +(new Date().getMonth()))
    let monthNumber = (new Date().getMonth());
    let year = (new Date().getFullYear());
    console.log("monthNumber is " + monthNumber)
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = monthNames[monthNumber];
    this._onchangeyear(year);
    this._onchangemonth(monthNumber + 1);
    //return month;
    this.setState({ month });
    this.setState({ year });
  };

  onCalanderClick() {
    return (
      <div>
        <MonthYearPicker
          style={{ width: "10px" }}
          selectedMonth={this.state.month}
          selectedYear={this.state.year}
          minYear={2000}
          maxYear={2030}
          onChangeYear={year => {
            this.setState({ year: year })
            this._onchangeyear(year);
          }}
          //onChangeYear={this.props.store_DateTime}

          onChangeMonth={(month) => {
            let monthNames = ["noval", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            // var mon=this.getDate();
            var mon = monthNames[month]
            this.setState({ month: mon })
            this._onchangemonth(month);
          }}
        // onClick={this.props.store_DateTime(this.state.month,this.state.year)}
        />

        {/* <input type="month"/> */}



      </div>

    )
  }


  button = () => {
    this.setState({ button: !this.state.button })
  }


  // componentDidMount(){
  //  this.setState({id:this.props.mid});
  //    console.log(this.props.month)
  // }
  //  onFeedbackClick(){

  //     this.props.history.push("/static-form/"  +this.props.mid+"/" +this.props.id+"/" + this.props.month+"/" +this.props.emp+"/" + this.props.pro)

  // }
  // onGoalsClick(){
  //     this.props.history.push("/dynamic-form/"  +this.props.mid+"/" +this.props.id+"/" + this.props.month+"/" +this.props.emp+"/" + this.props.pro)
  // }
  render() {
    const { month } = this.state;
    const { year } = this.state;
    return (
      <div>

        <Button color='blue' style={{ width: "auto", paddingLeft: "20px" }} onClick={() => this.button()} style={{ width: "auto" }}>{this.state.month}   {this.state.year}   <Icon name="calendar alternate outline" /></Button>

        {this.state.button && this.onCalanderClick()}
      </div>
    )
  }
}
export default withRouter(Year)