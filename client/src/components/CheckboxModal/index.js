import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const $ = window.$;

class CheckboxModal extends Component {
  componentDidMount() {
    this.showModal();
  }

  showModal() {
    $('#exampleModalCenter').modal('show');
  }

  componentWillUnmount() {
    this.hideModal();
  }

  hideModal() {
    $('#exampleModalCenter').modal('hide');
  }

  render() {
    return (
      <div>
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">
                  {this.props.title}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.props.user.name}, {this.props.question}
              </div>
              <form>
                <div className="col">
                  {this.props.choices.map(choice => {
                    return (
                      <div key={choice.description} className="form-check">
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            onChange={this.props.handleInputChange}
                            checked={choice.enabled}
                            name={choice.description}
                          />
                          {choice.description}
                        </label>
                        <br />
                      </div>
                    );
                  })}
                </div>
              </form>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.props.handleFormSubmit}>
                  Submit
                </button>
                <Link to={this.props.link}>
                  <button type="button" className="btn btn-secondary">
                    Next
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckboxModal;
