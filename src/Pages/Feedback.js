
import axios from "axios";
import React from 'react';
import { Redirect } from "react-router-dom";
import { Button, Form, Icon, Label, TextArea, TabPane, Divider } from 'semantic-ui-react';
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import MonthYearPicker from 'react-month-year-picker';
import apiconstants from '../Config';
// import "../Managerpg1/Managermain.css";
import Tab from "../Components/Tab"
import Year from "../Components/YearMonthPicker"
// import Year from "../Components/YearPick"


var bgColors = {
  "Default": "#81b71a",
  "Blue": "#00B1E1",
  "Cyan": "#",
  "Green": "#ddfada",
  "Red": "#E9573F",
  "Yellow": "#d3d3d3",
};

class Managerpage3 extends React.Component {
  constructor() {
    super();

    this.state = {
      dynamic: [],
      disabled: false,
      nullValue: false,
      mm: (new Date().getMonth() + 1),
      yr: (new Date().getFullYear()),
      id: null,

    };
    console.log((new Date().getMonth() + 1))
  }
  componentWillMount() {
    let id = this.props.match.params.id
    this.setState({ id: id })
    this.prepopulate(id + '', this.state.mm + '', this.state.yr + '')
  }
  prepopulate(id, mon, year) {
    axios({
      method: 'post',
      url: apiconstants.URL + `prepopulate/${id}/${mon}/${year}`,
    })
      .then(response => {
        console.log(response.data)
        console.log(response.data[1].answer)
        this.setState({ dynamic: response.data })

      })
  }

  handleQuesChange = i => evt => {
    const newques = this.state.dynamic.map((row, j) => {
      if (i !== j) return row;
      console.log('row', row)
      return { ...row, question: evt.target.value };
    });

    this.setState({ dynamic: newques });
  };
  handleAnsChange = i => evt => {
    const newanswer = this.state.dynamic.map((row, j) => {
      if (i !== j) return row;
      return { ...row, answer: evt.target.value };
    });

    this.setState({ dynamic: newanswer });
  };
  handleRemarkChange = i => evt => {
    const newr = this.state.dynamic.map((row, j) => {
      if (i !== j) return row;
      return { ...row, remark: evt.target.value };
    });

    this.setState({ dynamic: newr });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(this.state.mm)
    let id = this.props.match.params.id
    fetch(apiconstants.URL + `feedback/${id}/${this.state.mm}/${this.state.yr}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.dynamic)

    })
  }

  handleAdd = () => {
    this.setState({
      dynamic: this.state.dynamic.concat({ id: this.props.match.params.id, question: "", answer: "", remark: "", month: this.props.match.params.month })

    });
  };

  setRedirect1 = (event) => {
    event.preventDefault();
    console.log(this.state)

    this.setState({
      redirect1: true

    })
  };
  store_Year = (year) => {
    this.setState({
      yr: year
    }, () => {

      this.prepopulate(this.state.id + '', this.state.mm + '', this.state.yr + '')
    })
  }
  store_Month = (mon) => {
    this.setState({
      mm: mon
    }, () => this.prepopulate(this.state.id + '', this.state.mm + '', this.state.yr + ''))
  }

  render() {
    console.log(this.state.mm, this.state.yr)
    {
      var id = this.props.match.params.id
      var month = this.props.match.params.month
      if (this.state.redirect1) {
        return <Redirect to={"/manager" + "/" + (this.props.match.params.mid)} />;

      }
    }
    var mid = this.props.match.params.mid;
    return (
      <div className="manbg">
        <Header mid={mid} />
        <Tab mid={this.props.match.params.mid}
          id={this.props.match.params.id}
          month={this.props.match.params.month}
          emp={this.props.match.params.emp}
          pro={this.props.match.params.pro}
        // pathURL={pathURL}
        />
        <div className="ui calender"></div>
        <Label size='large' style={{ color: "black", width: "auto" }} ><Icon name='user' />

          {this.props.match.params.pro}
        </Label >
        {/* <Year changeYear={this.store_Year.bind(this)} changeMonth={this.store_Month.bind(this)}/> */}
        {/* <Popup/>  */}
        {/* <Month/> */}
        <br />
        <br />
        <br />

        <h1 style={{ color: " #303030" }}>Employee Feedback :<span style={{ color: "darkblue", fontWeight: "bolder" }}>{this.props.match.params.emp}</span> </h1>
        <br />
        <Year changeYear={this.store_Year.bind(this)} changeMonth={this.store_Month.bind(this)} />
                <Form  >

          {
            this.state.yr > new Date().getFullYear()
              ? <h1>Cannot Fill feedback for selected Month or Year </h1> :
              ((this.state.yr < new Date().getFullYear() || (this.state.yr == new Date().getFullYear() && this.state.mm <= (new Date().getMonth() + 1))) ?
                this.state.dynamic.map((row, i) => (
                  <div className="">
                    <TextArea style={{ color: "black", height: "60px",width:"900px" }}
                      placeholder="Enter your question"
                      value={row.question}
                      disabled={(this.state.yr < (new Date().getFullYear()) || this.state.mm < (new Date().getMonth() + 1)) ? true : ((i + 1 < 6) ? true : false)}
                      onChange={this.handleQuesChange(i)}
                      required />

                    <TextArea style={{ color: "black", height: "60px"}}
                      placeholder='Enter answer here'
                      value={row.answer == undefined ? '' : row.answer}
                      disabled={(this.state.yr < (new Date().getFullYear()) || this.state.mm < (new Date().getMonth() + 1)) ? true : false}
                      style={{ backgroundColor: bgColors.Yellow,width:"900px" }}
                      onChange={this.handleAnsChange(i)}
                      required />


                    <TextArea style={{ color: "black", height: "10px", width:"900px", height: "60px" }}
                      placeholder='Remarks. If any?'
                      style={{ backgroundColor: bgColors.Green,width:"900px" }}
                      value={row.remark === undefined ? '' : row.remark}
                      disabled={(this.state.yr < (new Date().getFullYear()) || this.state.mm < (new Date().getMonth() + 1)) ? true : false}
                      onChange={this.handleRemarkChange(i)}
                      required />
                    <br />
                    <br />
                  </div>
                )) : <h1>Cannot Fill feedback for selected Month or Year </h1>)

            // )
            // !(this.state.yr <=() && this.state.mm <=  ?
            // <h1>Cannot Fill feedback for selected Month or Year </h1> :
          }

          <br />
          <br />
          <br />

          <button onClick={this.setRedirect1}
            style={{ width: "auto", }}
            className="ui blue button"> <Icon name="arrow circle left" />Go Back</button>
          {(this.state.yr <= (new Date().getFullYear()) && this.state.mm <= (new Date().getMonth() + 1))
            &&
            <div>
              {
                (this.state.yr == (new Date().getFullYear()) && this.state.mm == (new Date().getMonth() + 1)) &&
                <Button
                  type="button"
                  onClick={this.handleAdd}
                  className="ui blue button"
                  style={{ width: "auto" }} > Add more questions </Button>}
              <Button onClick={this.handleSubmit} style={{ width: "auto" }} className="ui green button" >
                Save <Icon name="arrow circle right" />
              </Button>
            </div>


          }
        </Form>

        <Footer />
      </div>
    );
  }
}

export default Managerpage3;

