import React, { Component } from "react";
import { Form, TextArea, Button, Icon, Label } from 'semantic-ui-react'
import Header from "../Components/Header";
import { Redirect } from "react-router-dom";
import axios from "axios"
import Footer from "../Components/Footer";
import apiconstants from '../Config';
import Tab from "../Components/Tab"
import Year from "../Components/YearMonthPicker"

class Managermain5 extends React.Component {
  constructor() {
    super()
    this.state = {
      dynamic: [],
      locationPath: "",
      mm: (new Date().getMonth() + 1),
      yr: (new Date().getFullYear()),
      id: null,
    };


  }

  componentWillMount() {
    this.setState({ locationPath: this.props.history.location.pathname })
    let id = this.props.match.params.id
    this.setState({ id: id })

    this.prepopulate(id + '', this.state.mm + '', this.state.yr + '')
    // const response = axios({
    //     method: 'GET',
    //   //   url: 'http://192.168.1.245:8095/add_goals',
    //     url: apiconstants.URL+`viewgoal/${id}/${month}`,

    // }) 
    //     .then(response => {
    //       console.log(response)

    //         if (response.data.length != 0) {
    //           const da = [];
    //             console.log(JSON.stringify(response.data))
    //             response.data.map((datas)=>{
    //               da.push(datas);
    //             })
    //             this.setState({ dynamic: da })


    //           }



    //         else {


    //             this.setState({ dynamic: this.state.dynamic.concat({id:this.props.match.params.id, goals:"", deadline:"", month: this.props.match.params.month}) });


    //           }
    //     })

  }


  prepopulate(id, mon, year) {
    axios({
      method: 'GET',
      url: apiconstants.URL + `viewgoal/${id}/${mon}/${year}`,
    })
      .then(response => {
        console.log(response.data)
        this.setState({ dynamic: response.data })

      })
  }

  handleGoalsChange = i => evt => {
    const newGoals = this.state.dynamic.map((row, j) => {
      if (i !== j) return row;
      return { ...row, goal: evt.target.value };
    });

    this.setState({ dynamic: newGoals });
  };
  handleDeadlineChange = i => evt => {
    const newDeadline = this.state.dynamic.map((row, j) => {
      if (i !== j) return row;
      return { ...row, deadline: evt.target.value };
    });

    this.setState({ dynamic: newDeadline });
  };








  // handleSubmit = e => {
  //     e.preventDefault();
  //     var id=this.props.match.params.id
  //     var month=this.props.match.params.month
  //     var emp=this.props.match.params.emp
  //     console.log(JSON.stringify(this.state.dynamic));
  //         fetch( apiconstants.URL+`addgoals/${id}/${month}`,{
  //             method:'POST',
  //             headers:{
  //                 'Content-Type':'application/json'
  //             },
  //             body:JSON.stringify(this.state.dynamic)
  //         }).then(res=>{
  //             console.log(res)
  //         }).then(response=>console.log(response))
  // };


  handleSubmit = async (e) => {
    e.preventDefault();
    let id = this.props.match.params.id
    fetch(apiconstants.URL + `addgoals/${id}/${this.state.mm}/${this.state.yr}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.dynamic)

    })
  }


  handleAdd = () => {
    this.setState({

      dynamic: this.state.dynamic.concat({ id: this.props.match.params.id, goal: "", deadline: "", })


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
    const pathURL = this.state.locationPath;



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
        <Tab
          mid={this.props.match.params.mid}
          id={this.props.match.params.id}
          month={this.props.match.params.month}
          emp={this.props.match.params.emp}
          pro={this.props.match.params.pro}
          pathURL={pathURL}
        />
        <Label size='large' style={{ color: "black", width: "auto" }} ><Icon name='user' />

          {this.props.match.params.pro}
        </Label>
        <Year changeYear={this.store_Year.bind(this)} changeMonth={this.store_Month.bind(this)} />
        <br />
        <br />

        <h1 style={{ color: "black" }}>{this.props.match.params.emp}'s Goals</h1>
        <br />
        <br />
        <br />



        {/* {
          this.state.dynamic.map((row, i) => (
          <div style={{ paddingLeft: "10%" }} className="form1">

            <TextArea style={{ color: "black", width: "400px", height: "50px" }}
              placeholder="Enter Goals"
              value={row.goal}
              onChange={this.handleGoalsChange(i)} />
            <br />
            <input type='date' style={{ color: "black", }}
              placeholder="Enter Deadline"
              value={row.deadline}
              onChange={this.handleDeadlineChange(i)}
            />
            <br />
            <br />
          </div>
        ))} */}


        {/* <button onClick={this.setRedirect1}
          style={{ width: "auto", }}
          className="ui blue button"> <Icon name="arrow circle left" />Go Back</button>

        <Button
          type="button"
          onClick={this.handleAdd}
          className="ui green button"
          style={{ width: "auto" }}>
          <Icon name="add circle" />
          Add More Goals
              </Button>

        <Button onClick={this.handleSubmit} style={{ width: "auto" }} className="ui green button" >  <Icon name="arrow circle save" /> Save</Button> */}




{
            this.state.yr > new Date().getFullYear()
              ? <h1>Cannot Fill feedback for selected Month or Year </h1> :
              ((this.state.yr < new Date().getFullYear() || (this.state.yr == new Date().getFullYear() && this.state.mm <= (new Date().getMonth() + 1))) ?
                this.state.dynamic.map((row, i) => (
                  <div style={{ paddingLeft: "10%" }} className="">
                    <TextArea style={{ color: "black", height: "60px" }}
                      placeholder="Enter Goals"
                      value={row.goal}
                      onChange={this.handleGoalsChange(i)} 
                      disabled={(this.state.yr < (new Date().getFullYear()) || this.state.mm < (new Date().getMonth() + 1)) ? true : false}

                      required />

<input type='date' style={{ color: "black", }}
              placeholder="Enter Deadline"
              value={row.deadline}
              disabled={(this.state.yr < (new Date().getFullYear()) || this.state.mm < (new Date().getMonth() + 1)) ? true : false}

              onChange={this.handleDeadlineChange(i)}
            />

                    
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
               <div> <Button
                  type="button"
                  onClick={this.handleAdd}
                  className="ui blue button"
                  style={{ width: "auto" }} > Add more questions </Button>
                  
                  
                  <Button onClick={this.handleSubmit} style={{ width: "auto" }} className="ui green button" >  <Icon name="arrow circle save" /> Save</Button> 
                  
                  
                  </div>
                  }
             
            </div>


          }





        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Footer />
      </div>

    );
  }


}
export default Managermain5