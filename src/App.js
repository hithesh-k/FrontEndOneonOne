import React from 'react'
import { BrowserRouter, Route } from "react-router-dom";
// import NINE from "./nl_logo.png";
// import { Link } from "react-router-dom";
import Managerpage1 from "./Pages/Listofreportees";
import Managerpage3 from "./Pages/Feedback";
import Managerpage4 from "./Pages/Goals"
import Employeepage1 from "./Pages/FeedbackandGoals"
import Login from "./Pages/Login"

class App extends React.Component {
  constructor() {
    super();
  };
  render() {
    return (
      <BrowserRouter>
        <div>
          <header>
            <div>
            
              <Route exact path="/login" component={Login} />
              <Route exact path="/manager/:mid/" component={Managerpage1} />
              <Route exact path={"/static-form/:mid/:id/:emp/:pro"} component={Managerpage3} />
              <Route exact path={"/dynamic-form/:mid/:id/:emp/:pro"} component={Managerpage4} />
              <Route exact path="/logout" component={Login} />
              <Route exact path={"/e/:id"} component={Employeepage1} />
             






            </div>
          </header>




        </div>
      </BrowserRouter>




      //  <BrowserRouter>
      //  <Route exact path="/e" component={Empmain1}/>
      //  <Route path ="/em-month" component={Empmain2}/>
      //  <Route path ="/month-feedback" component={Empmain3}/>
      //  <Route path ="/employee" component={Empmain1}/>
      //  <Route path ="/em-goals" component={Empmain4}/>
      //   </BrowserRouter>


      //  <Empmain4/>




    );
  }
}

export default App;
