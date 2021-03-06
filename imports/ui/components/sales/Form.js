import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
import NavigationBar from "./../nav-bar/NavigationBar";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { sale: this.props.location.sale };
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleCreate(event) {
    event.preventDefault();
    // Find the text field via the React ref
    let idCard = ReactDOM.findDOMNode(this.refs.idCard).value.trim();
    let sale = {
      idCard: parseInt(idCard)
    };
    if (this.state.sale) {
      sale._id = this.state.sale._id;
      this.setState({ sale: undefined });
    }
    Meteor.call("saleMethods.insert", sale, function(error, result) {
      if (error) {
        alert(error);
      } else {
        alert("Exito");
      }
    });
    ReactDOM.findDOMNode(this.refs.idCard).value = "";
  }

  render() {
    let sale = this.props.location.sale;
    if (!sale) {
      sale = { client_id_card: "" };
    }
    return (
      <div>
        <NavigationBar></NavigationBar>
        <div className="ui centered grid container">
          <div className="six wide column">
            <div className="ui fluid card">
              <div className="margin-bottom-one"></div>
              <h3 align="center">Ventas</h3>
              <div className="margin-bottom-one"></div>
              <div className="content" align="center">
                <form action="" className="ui form">
                  <div className="field">
                    <label>Nit o CI</label>
                    <input
                      ref="idCard"
                      defaultValue={sale.client_id_card}
                      type="number"
                      className="form-control"
                      min="1"
                    ></input>
                  </div>
                  <div className="field text-center">
                    <button
                      onClick={this.handleCreate.bind(this)}
                      type="button"
                      className="ui basic button"
                    >
                      <i className="save icon"></i>Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Form;
