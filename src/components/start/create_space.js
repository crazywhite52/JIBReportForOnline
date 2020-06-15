import React, { Component } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBAlert,
  MDBCol,
  MDBRow,
  MDBMask,
  MDBView,
  MDBIcon,
  MDBInput,
  MDBFormInline
} from "mdbreact";
import Grid from "@material-ui/core/Grid";
import ApiService from "../actions/apidata";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";

export default class create_space extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.onPick = this.onPick.bind(this);
    this.ApiIma = this.ApiIma.bind(this);
    this.Save = this.Save.bind(this);
    this.state = {
      chk: true,
      modal: false,
      fields: "",
      url: "",
      checkedA: true,
      imaList: [],
      image: "",
      showimg: null
    };
    this.ApiCall = new ApiService();
  }
  Save() {
    // if (
    //   this.state.type === undefined ||
    //   this.state.desc === undefined ||
    //   this.state.width === undefined ||
    //   this.state.height === undefined ||
    //   this.state.length === undefined ||
    //   this.state.image === undefined
    // ) {
    //   this.setState({
    //     chk: false
    //   });
    // } else {
    this.setState({
      chk: true
    });
    this.props.saveSpace(
      this.state.type,
      this.state.desc,
      this.state.comment,
      this.state.checkedA,
      this.state.image,
      this.state.width,
      this.state.height,
      this.state.length
    );
    this.timeout = setTimeout(() => {
      this.setState({
        type: "",
        desc: "",
        comment: "",
        checkedA: true,
        image: null
      });
    }, 2000);
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
  componentDidMount() {
    this.ApiIma();
    this.ApiCall.willCreateSpace()
      .then(res => {
        //console.log(res);
        this.setState({
          fields: res
        });
      })
      .catch(error => {
        console.error(error.message);
      });
  }
  onPick(image) {
    this.setState({ image }, () => {
      //console.log(this.state.image);
      this.setState({
        image: this.state.image.value,
        showimg: this.state.image.value
      });
    });
  }
  toggle = () => {
    this.setState(
      {
        modal: false,
        type: "",
        desc: "",
        comment: "",
        checkedA: true,
        image: null
      },
      () => {
        //console.log(this.state.modal);
        this.props.closemodal(this.state.modal);
      }
    );
  };
  handleSwitch(e) {
    this.setState(
      {
        checkedA: !this.state.checkedA
      },
      () => {
        console.log(this.state.checkedA);
      }
    );
  }
  handleChange(e) {
    e.preventDefault();

    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        console.log(this.state);
      }
    );
  }

  render() {
    const { fields } = this.state;
    let data = Array();
    data = fields.field;

    let newArray = [];
    for (var x in data) {
      newArray.push({
        ["name"]: data[x].name,
        ["input_type"]: data[x].input_type,
        ["placeholder"]: data[x].placeholder
      });
    }
    //console.log(newArray);

    //const numbers = [1, 2, 3, 4, 5];
    const doubled = newArray.map(number =>
      number.input_type === "boolean" ? (
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedA}
              color="primary"
              onClick={this.handleSwitch}
            />
          }
          label={this.state.checkedA === true ? "STATUS ON" : "STATUS OFF"}
        />
      ) : number.input_type === "object" ? (
        ""
      ) : (
        <MDBInput
          size="sm"
          type={number.input_type}
          name={number.name}
          label={
            number.placeholder === "Space Type"
              ? "ประเภท Space"
              : number.placeholder === "Description"
              ? "ลายละเอียด"
              : number.placeholder
          }
          value={
            number.name === "image"
              ? this.state.image
              : number.name === "type"
              ? this.state.type
              : number.name === "desc"
              ? this.state.desc
              : number.name === "status"
              ? this.state.status
              : number.name === "comment"
              ? this.state.comment
              : ""
          }
          onChange={this.handleChange}
          disabled={number.name === "image" ? true : ""}
          outline
          icon="info-circle"
        />
      )
    );
    //console.log(doubled);

    return (
      <div>
        <MDBContainer>
          {/* <MDBBtn onClick={this.toggle}>Modal</MDBBtn> */}
          <MDBModal
            isOpen={this.props.opCreate}
            size="lg"
            //backdrop={false}
          >
            <MDBModalHeader style={{ "padding-top": 10, "padding-bottom": 5 }}>
              <h5>
                <MDBIcon icon="plus-circle" />{" "}Create Space{" "}
              </h5>
            </MDBModalHeader>
            <MDBModalBody>
              {this.state.chk === false ? (
                <MDBAlert color="warning" dismiss>
                  <strong>กรุณาตรวจสอบข้อมูลให้ครบถ้วนอีกครั้ง!</strong> You
                  should check in on some of those fields below.
                </MDBAlert>
              ) : (
                ""
              )}
              <MDBRow>
                <MDBCol md="6">{doubled}</MDBCol>
                <MDBCol md="6">
                  <div className="form-group">
                    <label style={{ "padding-top": 10 }}>Dimension</label>
                    <MDBInput
                      style={{ width: 150 }}
                      type="number"
                      name="width"
                      onChange={this.handleChange}
                      size="sm"
                      label="Width"
                    />
                    <MDBInput
                      style={{ width: 150 }}
                      type="number"
                      name="height"
                      onChange={this.handleChange}
                      size="sm"
                      label="Height"
                    />
                    <MDBInput
                      style={{ width: 150 }}
                      type="number"
                      name="length"
                      onChange={this.handleChange}
                      size="sm"
                      label="Length"
                    />
                  </div>
                </MDBCol>
              </MDBRow>
              Name: {this.state.showimg}
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
              <MDBBtn size="md" color="info" onClick={this.Save}>
                <MDBIcon icon="cloud" /> บันทึก
              </MDBBtn>
              <MDBBtn size="md" color="danger" onClick={this.toggle}>
                <MDBIcon icon="times-circle" /> ปิด
              </MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
      </div>
    );
  }
}
