import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { MDBInput } from "mdbreact";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBContainer } from "mdbreact";
import { MDBBtn, MDBIcon } from "mdbreact";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withSnackbar } from "notistack";
import LoadingOverlay from "react-loading-overlay";
import dateFormat from "dateformat";
import NumberFormat from "react-number-format";
import ApiService from "../actions/apidata";
import AuthService from "../authlogin/AuthService";
import Tbdata from "./tb_location";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import ModalCreate from "./create_location";
import ViewLocation from "./view_location";

export default class page_location extends Component {
  constructor(props) {
    super(props);
    this.LocationData = this.LocationData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loadIndexData = this.loadIndexData.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleSwitchB = this.handleSwitchB.bind(this);
    this.handleSwitchC = this.handleSwitchC.bind(this);
    this.BtnSearch = this.BtnSearch.bind(this);
    this.OpModalCreate = this.OpModalCreate.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.SaveLocation = this.SaveLocation.bind(this);
    this.opModalView = this.opModalView.bind(this);
    this.UpDateIsHigh = this.UpDateIsHigh.bind(this);
    this.UpDateHeavyLoad = this.UpDateHeavyLoad.bind(this);
    this.UpDateStatus = this.UpDateStatus.bind(this);
    this.UpdateLocation = this.UpdateLocation.bind(this);
    this.state = {
      err_log: "",
      datasearch: [],
      checkedA: true,
      checkedB: false,
      checkedC: false,
      loading: false,
      params: [],
      name: "",
      name_location: "",
      shelf: "",
      type: "",
      volumn: "",
      modal: false,
      modal2: false,
      shelf_name: "",
      space_type: "",
      desc: "",
      space_volumn: "",
      dimension_w: "",
      dimension_h: "",
      dimension_l: "",
      isHigh: "",
      heavyLoad: "",
      status: "",
      id: ""
    };
    this.ApiCall = new ApiService();
  }
  toggle() {
    //console.log(e+'---'+b);
    this.setState({
      modal: !this.state.modal
    });
  }
  toggle2() {
    //console.log(e+'---'+b);
    this.setState({
      modal2: !this.state.modal2
    });
  }
  opModalView(
    t,
    name,
    shelf,
    space_type,
    desc,
    space_volumn,
    w,
    h,
    l,
    isHigh,
    heavyLoad,
    status,
    id
  ) {
    this.setState(
      {
        modal2: true,
        name_location: name,
        shelf_name: shelf,
        space_type: space_type,
        desc: desc,
        space_volumn: space_volumn,
        dimension_w: w,
        dimension_h: h,
        dimension_l: l,
        isHigh: isHigh,
        heavyLoad: heavyLoad,
        status: status,
        id: id
      },
      () => {
        //alert(this.state.id)
      }
    );
  }
  OpModalCreate() {
    this.setState(
      {
        modal: true
      },
      () => {
        //alert(this.state.modal2);
      }
    );
  }
  handleChange(e) {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value
    });
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
  UpDateIsHigh(x, id) {
    let updatem = Array();
    let filter = Array();
    let bodysend = Array();
    filter = {
      _id: id
    };
    updatem = {
      isHigh: x
    };
    bodysend = {
      filter: filter,
      update: updatem
    };
    this.ApiCall.updateLocation(bodysend).then(res => {
      if (res.status === "success") {
        this.setState(
          {
            //modal: false,
            loading: true
          },
          () => {
            this.timeout = setTimeout(() => {
              this.setState({ loading: false }, () => {
                this.loadIndexData();
              });
            }, 1200);
          }
        );
      } else {
        console.log(res);
      }
    });
  }
  UpDateHeavyLoad(x, id) {
    let updatem = Array();
    let filter = Array();
    let bodysend = Array();
    filter = {
      _id: id
    };
    updatem = {
      heavyLoad: x
    };
    bodysend = {
      filter: filter,
      update: updatem
    };
    this.ApiCall.updateLocation(bodysend).then(res => {
      if (res.status === "success") {
        this.setState(
          {
            //modal: false,
            loading: true
          },
          () => {
            this.timeout = setTimeout(() => {
              this.setState({ loading: false }, () => {
                this.loadIndexData();
              });
            }, 1200);
          }
        );
      } else {
        console.log(res);
      }
    });
  }

  UpDateStatus(x, id) {
    let updatem = Array();
    let filter = Array();
    let bodysend = Array();
    filter = {
      _id: id
    };
    updatem = {
      status: x
    };
    bodysend = {
      filter: filter,
      update: updatem
    };
    this.ApiCall.updateLocation(bodysend).then(res => {
      if (res.status === "success") {
        this.setState(
          {
            //modal: false,
            loading: true
          },
          () => {
            this.timeout = setTimeout(() => {
              this.setState({ loading: false }, () => {
                this.loadIndexData();
              });
            }, 1200);
          }
        );
      } else {
        console.log(res);
      }
    });
  }
  UpdateLocation(id, name, val) {
    //alert(val)
    let updatem = Array();
    let space = Array();
    let filter = Array();
    let bodysend = Array();
    filter = {
      _id: id
    };

    if (name === "Shelf") {
      updatem = {
        shelf: val
      };
    } else if (name === "Desc") {
      updatem = {
        desc: val
      };
    } else if (name === "Type") {
      space = {
        space_id: val
      };
      updatem = {
        space: space
      };
    }

    bodysend = {
      filter: filter,
      update: updatem
    };
    this.ApiCall.updateLocation(bodysend).then(res => {
      if (res.status === "success") {
        if (name === "Shelf") {
          this.setState(
            {
              shelf_name: val,
              loading: true
            },
            () => {
              this.timeout = setTimeout(() => {
                this.setState({ loading: false }, () => {
                  this.loadIndexData();
                });
              }, 1200);
            }
          );
        } else if (name === "Desc") {
          this.setState(
            {
              desc: val,
              loading: true
            },
            () => {
              this.timeout = setTimeout(() => {
                this.setState({ loading: false }, () => {
                  this.loadIndexData();
                });
              }, 1200);
            }
          );
        } else {
          
           
          this.setState(
            {
              loading: true
            },
            () => {
              this.timeout = setTimeout(() => {
                this.setState({ loading: false,err_log:"",modal2:false }, () => {
                  this.loadIndexData();
                });
              }, 1200);
            }
          );
        }
      } else {
        this.setState({
          err_log: res.deatail.message
        });
        console.log(res);
      }
    });
  }
  SaveLocation(name, shelf, desc, space, checkedA, checkedB, checkedC) {
    let bodysend = Array();
    let sp = Array();
    sp = {
      space_id: space
    };
    bodysend = {
      name: name,
      shelf: shelf,
      desc: desc,
      space: sp,
      isHigh: checkedA,
      heavyLoad: checkedB,
      status: checkedC
    };
    //console.log(bodysend);
    this.ApiCall.createLocation(bodysend)
      .then(res => {
        if (res.status === "success") {
          this.setState(
            {
              modal: false,
              loading: true
            },
            () => {
              this.timeout = setTimeout(() => {
                this.setState({ loading: false }, () => {
                  this.loadIndexData();
                });
              }, 1200);
            }
          );
        } else {
          console.log(res);
        }
      })
      .catch(error => {
        console.error(error.message);
      });
  }
  BtnSearch() {
    let params = Array();
    params = {
      name: this.state.name === "" ? undefined : this.state.name,
      shelf: this.state.shelf === "" ? undefined : this.state.shelf,
      type: this.state.type === "" ? undefined : this.state.type,
      volumn: this.state.volumn === "" ? undefined : this.state.volumn,
      isHigh: this.state.checkedB,
      heavyLoad: this.state.checkedC,
      status: this.state.checkedA
    };
    this.ApiCall.searchLocation(params)
      .then(datares => {
        let newArray = [];
        for (var x in datares) {
          newArray.push({
            ["id"]: datares[x]._id,
            ["name"]: datares[x].name,
            ["shelf"]: datares[x].shelf,
            ["desc"]: datares[x].desc,
            ["space_type"]: datares[x].space.type,
            ["space_volumn"]: datares[x].space.volumn,
            ["space_image"]: datares[x].space.image,
            ["dimension_w"]: datares[x].space.dimension.width,
            ["dimension_h"]: datares[x].space.dimension.height,
            ["dimension_l"]: datares[x].space.dimension.length,
            ["isHigh"]: datares[x].isHigh,
            ["heavyLoad"]: datares[x].heavyLoad,
            ["status"]: datares[x].status
          });
        }
        this.setState({ loading: true }, () => {
          this.timeout = setTimeout(() => {
            this.setState(
              {
                datasearch: newArray,
                loading: false,
                name: "",
                shelf: "",
                type: "",
                volumn: ""
              },
              () => {
                //console.log(this.state.datasearch);
              }
            );
          }, 1000);
        });
      })
      .catch(error => {
        console.error(error.message);
      });
  }
  loadIndexData() {
    this.ApiCall.searchLocation("")
      .then(res => {
        this.LocationData(res);
      })
      .catch(error => {
        console.error(error.message);
      });
  }
  LocationData(datares) {
    //let d = Array();
    let newArray = [];
    for (var x in datares) {
      newArray.push({
        ["id"]: datares[x]._id,
        ["name"]: datares[x].name,
        ["shelf"]: datares[x].shelf,
        ["desc"]: datares[x].desc,
        ["space_type"]: datares[x].space.type,
        ["space_volumn"]: datares[x].space.volumn,
        ["space_image"]: datares[x].space.image,
        ["dimension_w"]: datares[x].space.dimension.width,
        ["dimension_h"]: datares[x].space.dimension.height,
        ["dimension_l"]: datares[x].space.dimension.length,
        ["isHigh"]: datares[x].isHigh,
        ["heavyLoad"]: datares[x].heavyLoad,
        ["status"]: datares[x].status
      });
    }
    this.setState({ datasearch: newArray }, () => {
      //console.log(this.state.datasearch);
    });
  }
  componentDidMount() {
    this.loadIndexData();
  }

  render() {
    return (
      <MDBRow>
        <MDBCol md="12">
          <MDBCard>
            <MDBCardBody style={{ fontFamily: "Prompt" }}>
              <Grid container spacing={24}>
                <Grid
                  item
                  lg={12}
                  xl={12}
                  xs={12}
                  sm={12}
                  md={12}
                  style={{ padding: 0, marginLeft: 15, marginTop: 5 }}
                >
                  <h5 style={{ color: "green" }}>
                    <MDBIcon
                      fab
                      icon="searchengin"
                      size=""
                      className="pink-text pr-3"
                    />
                    &nbsp;Search Location
                  </h5>
                </Grid>
                <Grid
                  item
                  lg={12}
                  xl={12}
                  xs={12}
                  sm={12}
                  md={12}
                  style={{ paddingLeft: 20 }}
                >
                  <MDBRow>
                    <MDBCol
                      md="1"
                      style={{
                        "padding-right": 0,
                        "padding-left": 10,
                        "padding-bottom": 0,
                        "margin-bottom": 0,
                        bottom: 10
                      }}
                    >
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.checkedA}
                              onClick={this.handleSwitch}
                              value="checkedA"
                            />
                          }
                          label={
                            this.state.checkedA === true
                              ? "STATUS ON"
                              : "STATUS OFF"
                          }
                        />
                      </FormGroup>
                    </MDBCol>
                    <MDBCol
                      md="1"
                      style={{
                        "padding-right": 0,
                        "padding-left": 15,
                        "padding-bottom": 0,
                        "margin-bottom": 0,
                        bottom: 10
                      }}
                    >
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.checkedB}
                              onClick={this.handleSwitchB}
                              value="checkedB"
                            />
                          }
                          label={
                            this.state.checkedB === true
                              ? "isHigh ON"
                              : "isHigh OFF"
                          }
                        />
                      </FormGroup>
                    </MDBCol>
                    <MDBCol
                      md="1"
                      style={{
                        "padding-right": 0,
                        "padding-left": 0,
                        "padding-bottom": 0,
                        "margin-bottom": 0,
                        bottom: 10
                      }}
                    >
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.checkedC}
                              onClick={this.handleSwitchC}
                              value="checkedC"
                            />
                          }
                          label={
                            this.state.checkedC === true
                              ? "heavyLoad ON"
                              : "heavyLoad OFF"
                          }
                        />
                      </FormGroup>
                    </MDBCol>
                    <MDBCol md="2">
                      {" "}
                      <input
                        value={this.state.name}
                        name="name"
                        onChange={this.handleChange}
                        className="form-control form-control-sm"
                        type="text"
                        placeholder="name"
                        aria-label="name"
                      />
                    </MDBCol>
                    <MDBCol md="2">
                      {" "}
                      <input
                        value={this.state.shelf}
                        name="shelf"
                        onChange={this.handleChange}
                        className="form-control form-control-sm"
                        type="text"
                        placeholder="shelf"
                        aria-label="shelf"
                      />
                    </MDBCol>
                    <MDBCol md="1">
                      {" "}
                      <input
                        value={this.state.type}
                        name="type"
                        onChange={this.handleChange}
                        className="form-control form-control-sm"
                        type="text"
                        placeholder="type"
                        aria-label="type"
                      />
                    </MDBCol>
                    <MDBCol md="1">
                      {" "}
                      <input
                        value={this.state.volumn}
                        name="volumn"
                        onChange={this.handleChange}
                        className="form-control form-control-sm"
                        type="number"
                        placeholder="volumn"
                        aria-label="volumn"
                      />
                    </MDBCol>
                    {/* <MDBCol md="1">
                      {" "}
                      <input
                        name="isHigh"
                        onChange={this.handleChange}
                        className="form-control form-control-sm"
                        type="text"
                        placeholder="isHigh"
                        aria-label="isHigh"
                      />
                    </MDBCol> */}
                    {/* <MDBCol md="1">
                      {" "}
                      <input
                        name="heavyLoad"
                        onChange={this.handleChange}
                        className="form-control form-control-sm"
                        type="text"
                        placeholder="heavyLoad"
                        aria-label="heavyLoad"
                      />
                    </MDBCol> */}

                    <MDBCol md="2" style={{ bottom: 5 }}>
                      <MDBBtn
                        onClick={this.BtnSearch}
                        outline
                        size="sm"
                        color="primary"
                      >
                        ค้นหา
                      </MDBBtn>
                      <MDBBtn
                        size="sm"
                        color="info"
                        onClick={this.OpModalCreate}
                      >
                        สร้าง
                      </MDBBtn>
                    </MDBCol>
                    <MDBCol md="8"></MDBCol>
                  </MDBRow>
                  <LoadingOverlay
                    active={this.state.loading}
                    spinner
                    text="loading..."
                  >
                    <MDBRow style={{ paddingTop: 5 }}>
                      <MDBCol>
                        <Tbdata
                          Adata={this.state.datasearch}
                          opModal2={this.opModalView}
                        />
                      </MDBCol>
                    </MDBRow>
                  </LoadingOverlay>
                </Grid>
              </Grid>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <ViewLocation
          UpdateLocation={this.UpdateLocation}
          err_log={this.state.err_log}
          offmodal={this.toggle2}
          opModal2={this.state.modal2}
          name_location={this.state.name_location}
          shelf_name={this.state.shelf_name}
          space_type={this.state.space_type}
          desc={this.state.desc}
          space_volumn={this.state.space_volumn}
          w={this.state.dimension_w}
          h={this.state.dimension_h}
          l={this.state.dimension_l}
          isHigh={this.state.isHigh}
          heavyLoad={this.state.heavyLoad}
          status={this.state.status}
          UpDateIsHigh={this.UpDateIsHigh}
          UpDateHeavyLoad={this.UpDateHeavyLoad}
          UpDateStatus={this.UpDateStatus}
          id={this.state.id}
        />
        <ModalCreate
          opModal={this.state.modal}
          fff={this.toggle}
          saveLocation={this.SaveLocation}
        />
      </MDBRow>
    );
  }
}
