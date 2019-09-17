import React from 'react';
import './Pop.css';
import { Button, Form, Icon, Label, TextArea, TabPane, Divider } from 'semantic-ui-react';
import "../Components/popup.css"

export default class Pop extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>{this.props.text}</h1>
          {
          this.props.type=="disagree" &&
          <Form>
            <TextArea placeholder='Reason' style={{ minHeight: 100, width: "auto" }} />
          </Form>
          }
          <Button style={{ width: "auto" }} color="green" onClick={this.props.closePopup} >Send</Button>
          <Button color="red" style={{ width: "auto" }} onClick={this.props.closePopup}>Cancel</Button>
          

          {/* {
            this.props.type=="agree" &&
            <div  className="modal fade">
            <div className="modal-dialog modal-confirm">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="icon-box">
                    <i className="material-icons"></i>
                  </div>
                  <h4 className="modal-title">Awesome!</h4>
                </div>
                <div className="modal-body">
                  <p className="text-center">Feedback has been Recorded</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-success btn-block" data-dismiss="modal">OK</button>
                </div>
              </div>
            </div>
          </div>
           
          } */}
         
        </div>
      </div>
    );
  }
}
