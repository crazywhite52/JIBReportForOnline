import React, { Component } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBInput
} from "mdbreact";
import Sw from "./switch_location";
import ApiService from "../actions/apidata";

export default class view_location extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.Update = this.Update.bind(this);
    this.Shelf = this.Shelf.bind(this);
    this.Desc = this.Desc.bind(this);
    this.Type = this.Type.bind(this);
    this.SwUpdateA = this.SwUpdateA.bind(this);
    this.SwUpdateB = this.SwUpdateB.bind(this);
    this.SwUpdateC = this.SwUpdateC.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loadIndexData = this.loadIndexData.bind(this);
    this.MapData = this.MapData.bind(this);
    this.state = {
      modal2: false,
      inputEd: false,
      name: "",
      name_shelf: "",
      desc: "",
      type: "",
      space_id:"",
      spaceList: []
    };
    this.ApiCall = new ApiService();
  }
  componentDidMount() {
    this.loadIndexData();
  }
  handleChange(e) {
    e.preventDefault();

    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        //console.log(this.state);
      }
    );
  }

  SwUpdateA(A) {
    //alert(A);
    this.setState(
      {
        isHigh: A
      },
      () => {
        this.props.UpDateIsHigh(this.state.isHigh, this.props.id);
      }
    );
  }
  SwUpdateB(B) {
    //alert(B)
    this.setState(
      {
        HeavyLoad: B
      },
      () => {
        this.props.UpDateHeavyLoad(this.state.HeavyLoad, this.props.id);
      }
    );
  }
  SwUpdateC(C) {
    //alert(C)
    this.setState(
      {
        Status: C
      },
      () => {
        this.props.UpDateStatus(this.state.Status, this.props.id);
      }
    );
  }
  Shelf() {
    this.setState({
      inputEd: true,
      name: "Shelf",
      name_shelf: this.props.shelf_name
    });
  }
  Desc() {
    this.setState({ inputEd: true, name: "Desc", desc: this.props.desc });
  }
  Type() {
    this.setState({ inputEd: true, name: "Type", type: this.props.space_type });
  }
  Update() {
    var id = this.props.id;
    var name = this.state.name;

    if (name === "Shelf") {
      var val = this.state.name_shelf;
    } else if (name === "Desc") {
      var val = this.state.desc;
    }else{
      var val = this.state.space_id
    }
    this.props.UpdateLocation(id, name, val);
  }
  loadIndexData() {
    this.ApiCall.searchSpace("")
      .then(res => {
        this.MapData(res);
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
  }
  toggle = () => {
    this.setState(
      {
        modal2: !this.state.modal2
      },
      () => {
        this.props.offmodal(this.state.modal2);
      }
    );
  };
  render() {
    const slectOp = this.state.spaceList.map(function(item, i) {
      //console.log('test');
      return (
        <option key={i} value={item._id}>
          {item.type}
        </option>
      );
    });

    return (
      <div>
        <MDBContainer>
          <MDBModal size="lg" isOpen={this.props.opModal2}>
            <MDBModalHeader toggle={this.toggle}>
              {this.props.name_location}
            </MDBModalHeader>
            <MDBModalBody>
              <MDBRow>
                <MDBCol md="12" className="mb-12">
                  <p className="deep-orange-text">{this.props.err_log}</p>
                  {this.state.inputEd === false ? (
                    ""
                  ) : this.state.name === "Type" ? (
                    <select
                      name="space_id"
                      onChange={this.handleChange}
                      className="browser-default custom-select"
                    >
                      {/* <option>Select space type for this location.</option> */}
                      <option value="">
                      ประเภท Space
                      </option>
                      {slectOp}
                    </select>
                  ) : (
                    <MDBInput
                      label={this.state.name}
                      onChange={this.handleChange}
                      name={this.state.name === "Shelf" ? "name_shelf" : "desc"}
                      value={
                        this.state.name === "Shelf"
                          ? this.state.name_shelf
                          : this.state.desc
                      }
                      outline
                    />
                  )}
                  <MDBCard
                    color="mdb-color lighten-2"
                    text="white"
                    className="text-center"
                  >
                    <MDBCardBody className="text-left">
                      <p>
                        Location Name:{" "}
                        <strong className="orange-text">
                          {this.props.name_location}
                        </strong>
                      </p>
                      <p>
                        <MDBIcon
                          icon="edit"
                          className="amber-text"
                          onClick={this.Shelf}
                        />{" "}
                        Shelf Number/ID :{" "}
                        <strong className="orange-text">
                          {this.props.shelf_name}
                        </strong>
                      </p>
                      <p>
                        <MDBIcon
                          icon="edit"
                          className="amber-text"
                          onClick={this.Type}
                        />{" "}
                        ประเภท Space :{" "}
                        <strong className="orange-text">
                          {this.props.space_type}
                        </strong>
                      </p>
                      <p>
                        <MDBIcon
                          icon="edit"
                          className="amber-text"
                          onClick={this.Desc}
                        />{" "}
                        รายละเอียด :{" "}
                        <strong className="orange-text">
                          {this.props.desc}
                        </strong>
                      </p>
                      <p>
                        Space Volumn :{" "}
                        <strong className="orange-text">
                          {this.props.space_volumn}
                        </strong>
                      </p>
                      <p>
                        Dimension Width :{" "}
                        <strong className="orange-text">{this.props.w}</strong>
                      </p>
                      <p>
                        Dimension Height :{" "}
                        <strong className="orange-text">{this.props.h}</strong>
                      </p>
                      <p>
                        Dimension Length :{" "}
                        <strong className="orange-text">{this.props.l}</strong>
                      </p>
                      <Sw
                        checkedA={this.SwUpdateA}
                        checkedB={this.SwUpdateB}
                        checkedC={this.SwUpdateC}
                        isH={this.props.isHigh}
                        hLoad={this.props.heavyLoad}
                        st={this.props.status}
                      />
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="info" onClick={this.Update}>
                Update
              </MDBBtn>
              <MDBBtn color="secondary" onClick={this.toggle}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
      </div>
    );
  }
}
