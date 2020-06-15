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

export default class create_location extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSwitchA = this.handleSwitchA.bind(this);
    this.handleSwitchB = this.handleSwitchB.bind(this);
    this.handleSwitchC = this.handleSwitchC.bind(this);
    this.loadIndexData = this.loadIndexData.bind(this);
    this.MapData = this.MapData.bind(this);
    //this.onPick = this.onPick.bind(this);
    this.Save = this.Save.bind(this);
    this.state = {
      spaceList: [],
      chk: true,
      modal: false,
      fields: "",
      url: "",
      checkedA: false,
      checkedB: false,
      checkedC: true,
      imaList: [],
      image: null,
      showimg: null,
      space: ""
    };
    this.ApiCall = new ApiService();
  }
  handleChange(e) {
    e.preventDefault();
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        //console.log(this.state.space_id);
      }
    );
  }
  handleSwitchA(e) {
    this.setState(
      {
        checkedA: !this.state.checkedA
      },
      () => {
        console.log(this.state.checkedA);
      }
    );
  }
  handleSwitchB(e) {
    this.setState(
      {
        checkedB: !this.state.checkedB
      },
      () => {
        console.log(this.state.checkedB);
      }
    );
  }
  handleSwitchC(e) {
    this.setState(
      {
        checkedC: !this.state.checkedC
      },
      () => {
        console.log(this.state.checkedC);
      }
    );
  }
  loadIndexData() {
    this.ApiCall.searchSpace("")
      .then(res => {
        //console.log(res);
        this.MapData(res);
        //this.setState({ datasearch: res }, () => {
        //console.log(this.state.datasearch);

        //console.log(JSON.stringify(this.state.datasearch));

        //});
      })
      .catch(error => {
        console.error(error.message);
      });
  }
  MapData(datares) {
    //let d = Array();
    let newArray = [];
    for (var x in datares) {
      newArray.push({
        ["_id"]: datares[x]._id,
        ["type"]: datares[x].type
      });
    }
    this.setState({ spaceList: newArray }, () => {});
    //console.log(newArray);
    // res.map(function(item, i) {
    //   console.log("test" + i);
    // });
  }
  componentDidMount() {
    this.loadIndexData();
    this.ApiCall.willCreateLocation()
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
  toggle = () => {
    this.setState(
      {
        modal: !this.state.modal
      },
      () => {
        this.props.fff(this.state.modal);
      }
    );
  };
  Save() {
    //   name: "JIB-MISTEST-0002",
    //   shelf: "SID000-A00001",
    //   desc: "MIS TEST STARTUP",
    //   space: space,
    //   isHigh: false,
    //   heavyLoad: false,
    //   status: true
    this.props.saveLocation(
      this.state.name,
      this.state.shelf,
      this.state.desc,
      this.state.space_id,
      this.state.checkedA, //isHigh
      this.state.checkedB, //heavyLoad
      this.state.checkedC //status
    );
  }
  render() {
    const { fields } = this.state;

    const slectOp = this.state.spaceList.map(function(item, i) {
      //console.log('test');
      return (
        <option key={i} value={item._id}>
          {item.type}
        </option>
      );
    });

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
    const inputs = newArray.map(x =>
      x.input_type === "boolean" ? (
        <FormControlLabel
          control={
            x.name === "isHigh" ? (
              <Switch
                checked={this.state.checkedA}
                color="primary"
                onClick={this.handleSwitchA}
              />
            ) : x.name === "heavyLoad" ? (
              <Switch
                checked={this.state.checkedB}
                color="primary"
                onClick={this.handleSwitchB}
              />
            ) : (
              <Switch
                checked={this.state.checkedC}
                color="primary"
                onClick={this.handleSwitchC}
              />
            )
          }
          label={
            x.name === "isHigh"
              ? "isHigh"
              : x.name === "heavyLoad"
              ? "heavyLoad"
              : x.name === "status"
              ? "status"
              : ""
          }
        />
      ) : x.input_type === "object" ? (
        <select
          name="space_id"
          onChange={this.handleChange}
          className="browser-default custom-select"
        >
          {/* <option>Select space type for this location.</option> */}
          <option value="">Select space type for this location.</option>
          {slectOp}
        </select>
      ) : (
        <MDBInput
          value={
            x.name === "name"
              ? this.state.name
              : x.name === "shelf"
              ? this.state.shelf
              : x.name === "desc"
              ? this.state.desc
              : ""
          }
          onChange={this.handleChange}
          autoComplete="off"
          label={x.placeholder}
          name={x.name}
          type={x.input_type}
          outline
        />
      )
    );

    return (
      <div>
        <MDBContainer>
          {/* <MDBBtn onClick={this.toggle}>Modal</MDBBtn> */}
          <MDBModal
            isOpen={this.props.opModal}
            size="lg"
            //backdrop={false}
          >
            <MDBModalHeader style={{ "padding-top": 10, "padding-bottom": 5 }}>
              <h5>
                <MDBIcon icon="plus-circle" /> Create Localtion{" "}
              </h5>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBRow>
                <MDBCol md="12">{inputs}</MDBCol>
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
