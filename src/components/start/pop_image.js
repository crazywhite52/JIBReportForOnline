import React, { Component } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBRow,
  MDBCol
} from "mdbreact";
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";
import ApiService from "../actions/apidata";

export default class pop_image extends Component {
  constructor(props) {
    super(props);
    this.ApiIma = this.ApiIma.bind(this);
    this.onPick = this.onPick.bind(this);
    this.SaveChanges = this.SaveChanges.bind(this);
    this.state = {
      modal: false,
      imaList: [],
      name: ""
    };
    this.ApiCall = new ApiService();
  }
  componentDidMount() {
    this.ApiIma();
  }
  SaveChanges() {
    this.setState(
      {
        modal: !this.state.modal
      },
      () => {
        this.props.offmodal2(this.state.modal);
        this.props.sendPic(this.state.name);
      }
    );
  }
  onPick(image) {
    this.setState({ image }, () => {
      //console.log(this.state.image);
      this.setState(
        {
          name: this.state.image.value
        },
        () => {
          
        }
      );
    });
  }
  ApiIma() {
    this.ApiCall.imageList()
      .then(res => {
        //console.log(res);
        this.setState({
          imaList: res
        });
      })
      .catch(error => {
        console.error(error.message);
      });
  }
  toggle = () => {
    this.setState(
      {
        modal: !this.state.modal
      },
      () => {
        this.props.offmodal2(this.state.modal);
      }
    );
  };
  render() {
    return (
      <div>
        <MDBContainer>
          <MDBModal size="lg" isOpen={this.props.popOp} toggle={this.toggle}>
            <MDBModalHeader toggle={this.toggle}>
              IMAGE NAME : {this.state.name}
            </MDBModalHeader>
            <MDBModalBody>
              <MDBRow>
                <MDBCol>
                  <div style={{ marginLeft: 60 }}>
                    <ImagePicker
                      images={this.state.imaList.map((image, i) => ({
                        src: image.url,
                        value: image.name
                      }))}
                      onPick={this.onPick}
                    />
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={this.toggle}>
                Close
              </MDBBtn>
              <MDBBtn color="primary" onClick={this.SaveChanges}>
                Save changes
              </MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
      </div>
    );
  }
}
