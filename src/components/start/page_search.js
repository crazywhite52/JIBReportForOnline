import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ImageZoom from "react-medium-image-zoom";
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
import Tbdata from "./tb_jqx_search";
import ModalComp from "./modal_img";
import CreateSpace from "./create_space";
import EditSpace from "./edit_space";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export default class page_search extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.BtnSearch = this.BtnSearch.bind(this);
    this.loadIndexData = this.loadIndexData.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.SaveSpace = this.SaveSpace.bind(this);
    this.op = this.op.bind(this);
    this.op2 = this.op2.bind(this);
    this.op3 = this.op3.bind(this);
    this.SwUpdate = this.SwUpdate.bind(this);
    this.update = this.update.bind(this);
    this.ImageUpdate = this.ImageUpdate.bind(this);

    this.state = {
      datasearch: [],
      loading: false,
      modal: false,
      modal2: false,
      modal3: false,
      name: "",
      url: "",
      checkedSw: true,
      type_view: "",
      desc: "",
      comment: "",
      width: "",
      height: "",
      leng: "",
      volumn_view: "",
      edit: false,
      id: "",
      id_ed: "",
      image_ed: "",
      type_ed: "",
      desc_ed: "",
      comment_ed: "",
      width_ed: "",
      height_ed: "",
      leng_ed: "",
      update_log_err: "",
      status: ""
    };
    this.ApiCall = new ApiService();
  }
  ImageUpdate(pic, id) {
    // this.setState({
    //   name: pic
    // });
    let bodysend = Array();
    let filter = Array();
    let updatem = Array();

    filter = {
      _id: id
    };
    updatem = {
      image: pic
    };
    bodysend = {
      filter: filter,
      update: updatem
    };
    console.log(bodysend);
    this.ApiCall.updateSpace(bodysend)
      .then(res => {
        if (res.status === "success") {
          this.ApiCall.imageList()
            .then(res => {
              var name = pic;
              let updatedList = res.filter(function(item) {
                return (
                  item.name.toLowerCase().search(name.toLowerCase()) !== -1
                );
              });
              //console.log(updatedList);
              this.setState({ url: updatedList[0].url, name: name }, () => {
                this.BtnSearch();
              });
            })
            .catch(error => {
              console.error(error.message);
            });
        } else {
          console.log(res);
        }
      })
      .catch(error => {
        console.error(error.message);
      });
  }
  SwUpdate(val, id) {
    if (val === "false") {
      var st = false;
    } else {
      var st = true;
    }
    let updatem = Array();
    let filter = Array();
    let bodysend = Array();
    filter = {
      _id: id
    };
    updatem = {
      status: st
    };
    bodysend = {
      filter: filter,
      update: updatem
    };
    //console.log(bodysend);
    this.ApiCall.updateSpace(bodysend).then(res => {
      if (res.status === "success") {
        this.BtnSearch();
      } else {
        console.log(res);
        //alert(res.deatail.message);
        this.setState({
          update_log_err: res.deatail.message
        });
      }
    });
  }
  update(val, id, field, width, length, height) {
    var w = parseInt(width, 10);
    var h = parseInt(height, 10);
    var l = parseInt(length, 10);
    let bodysend = Array();
    let updatem = Array();
    let filter = Array();
    let dimension = Array();
    let dimensionW = Array();
    let dimensionL = Array();
    let dimensionH = Array();

    dimensionW = {
      width: parseInt(val, 10),
      length: l,
      height: h
    };
    dimensionL = {
      width: w,
      length: parseInt(val, 10),
      height: h
    };
    dimensionH = {
      width: w,
      length: l,
      height: parseInt(val, 10)
    };
    filter = {
      _id: id
    };

    if (field === "ประเภท") {
      updatem = {
        type: val
      };
    } else if (field === "รายละเอียด") {
      updatem = {
        desc: val
      };
    } else if (field === "comment") {
      updatem = {
        comment: val
      };
    } else if (field === "ความกว้าง") {
      updatem = {
        dimension: dimensionW
      };
    } else if (field === "ความยาว") {
      updatem = {
        dimension: dimensionL
      };
    } else if (field === "ความสูง") {
      updatem = {
        dimension: dimensionH
      };
    }

    // else if (field === "ความกว้าง") {
    //   updatem = {
    //     dimensionW
    //   };
    // } else if (field === "ความยาว") {
    //   updatem = {
    //     dimensionL
    //   };
    // } else if (field === "ความสูง") {
    //   updatem = {
    //     dimensionH
    //   };
    // }

    bodysend = {
      filter: filter,
      update: updatem
    };
    //console.log(bodysend);
    this.ApiCall.updateSpace(bodysend)
      .then(res => {
        if (res.status === "success") {
          if (field === "ประเภท") {
            this.setState(
              {
                type_view: val
              },
              () => {
                this.BtnSearch();
              }
            );
          } else if (field === "รายละเอียด") {
            this.setState(
              {
                desc: val
              },
              () => {
                this.BtnSearch();
              }
            );
          } else if (field === "comment") {
            this.setState(
              {
                comment: val
              },
              () => {
                this.BtnSearch();
              }
            );
          } else if (field === "ความกว้าง") {
            this.setState(
              {
                width: val
              },
              () => {
                this.BtnSearch();
              }
            );
          } else if (field === "ความยาว") {
            this.setState(
              {
                leng: val
              },
              () => {
                this.BtnSearch();
              }
            );
          } else if (field === "ความสูง") {
            this.setState(
              {
                height: val
              },
              () => {
                this.BtnSearch();
              }
            );
          }
          this.timeout = setTimeout(() => {
            alert("บันทึกข้อมูลสำเร็จ");
            this.setState(
              {
                modal: false
              },
              () => {
                this.setState({
                  update_log_err: ""
                });
              }
            );
          }, 1500);
        } else {
          console.log(res);
          //alert(res.deatail.message);
          this.setState({
            update_log_err: res.deatail.message
          });
        }
      })
      .catch(error => {
        console.error(error.message);
        this.setState({
          update_log_err: error.message
        });
      });
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
      url: "",
      update_log_err: ""
    });
  }
  toggle2() {
    this.setState({
      modal2: !this.state.modal2,
      update_log_err: ""
    });
  }
  toggle3() {
    this.setState({
      modal3: !this.state.modal3,
      update_log_err: ""
    });
  }
  handleSwitch(e) {
    this.setState(
      {
        checkedSw: !this.state.checkedSw
      },
      () => {
        console.log(this.state.checkedSw);
      }
    );
  }
  op(a, b, type, desc, comment, width, height, leng, volumn, id, status) {
    this.setState(
      {
        modal: true,
        id: id,
        name: b,
        type_view: type,
        desc: desc,
        comment: comment,
        width: width,
        height: height,
        leng: leng,
        volumn_view: volumn,
        status: status
      },
      () => {
        //alert(this.state.name);
        //console.log(this.state.modal);
        this.ApiCall.imageList()
          .then(res => {
            var name = this.state.name;
            let updatedList = res.filter(function(item) {
              return item.name.toLowerCase().search(name.toLowerCase()) !== -1;
            });
            //console.log(updatedList);
            this.setState({ url: updatedList[0].url });
          })
          .catch(error => {
            console.error(error.message);
          });
      }
    );
  }
  op2(tr, edit, id, image_ed) {
    this.setState(
      {
        modal2: true,
        edit: edit,
        id: id,
        image_ed: image_ed
      },
      () => {
        //alert(this.state.modal2);
      }
    );
  }
  op3(tr, edit, id, image_ed, type, desc, comment, width, height, leng) {
    this.setState(
      {
        modal3: true,
        edit: edit,
        id_ed: id,
        image_ed: image_ed,
        type_ed: type,
        desc_ed: desc,
        comment_ed: comment,
        width_ed: width,
        height_ed: height,
        leng_ed: leng
      },
      () => {}
    );
  }
  handleChange(e) {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value
    });
  }
  MapData(datares) {
    //let d = Array();
    let newArray = [];
    for (var x in datares) {
      newArray.push({
        ["_id"]: datares[x]._id,
        ["type"]: datares[x].type,
        ["desc"]: datares[x].desc,
        ["status"]: datares[x].status,
        ["comment"]: datares[x].comment,
        ["image"]: datares[x].image,
        ["volumn"]: datares[x].volumn,
        ["width"]: datares[x].dimension.width,
        ["height"]: datares[x].dimension.height,
        ["leng"]: datares[x].dimension.length
      });
    }
    this.setState({ datasearch: newArray }, () => {});
    //console.log(newArray);
    // res.map(function(item, i) {
    //   console.log("test" + i);
    // });
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
  componentDidMount() {
    this.loadIndexData();
    //console.log(this.state)
  }
  BtnSearch() {
    let params = Array();
    params = {
      type: this.state.type === "" ? undefined : this.state.type,
      status: this.state.checkedSw,
      volumn: this.state.volumn === "" ? undefined : this.state.volumn
    };
    //console.log(params);
    this.ApiCall.searchSpace(params)
      .then(datares => {
        //console.log(res);
        let newArray = [];
        for (var x in datares) {
          newArray.push({
            ["_id"]: datares[x]._id,
            ["type"]: datares[x].type,
            ["desc"]: datares[x].desc,
            ["status"]: datares[x].status,
            ["comment"]: datares[x].comment,
            ["image"]: datares[x].image,
            ["volumn"]: datares[x].volumn,
            ["width"]: datares[x].dimension.width,
            ["height"]: datares[x].dimension.height,
            ["leng"]: datares[x].dimension.length
          });
        }
        this.setState({ loading: true }, () => {
          this.timeout = setTimeout(() => {
            this.setState({
              datasearch: newArray,
              loading: false,
              type: "",
              status: "",
              volumn: ""
            });
          }, 1000);
        });
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  SaveSpace(type, desc, comment, status, image, width, height, length) {
    var w = parseInt(width, 10);
    var h = parseInt(height, 10);
    var l = parseInt(length, 10);
    let spacedata = Array();
    spacedata = {
      type: type,
      dimension: {
        width: w,
        length: h,
        height: l
      },
      desc: desc,
      status: status,
      comment: comment,
      image: image
    };

    this.ApiCall.createSpace(spacedata)
      .then(res => {
        if (res.status === "success") {
          this.setState(
            {
              modal2: false
            },
            () => {
              this.BtnSearch();
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
  render() {
    return (
      <LoadingOverlay active={this.state.loading} spinner text="loading...">
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
                      &nbsp;Search Space
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
                      <MDBCol md="2">
                        <label htmlFor="formInput1">ประเภท</label>
                        <input
                          name="type"
                          onChange={this.handleChange}
                          value={this.state.type}
                          id="formInput1"
                          className="form-control form-control-sm"
                          type="text"
                          placeholder=""
                        />
                      </MDBCol>
                      <MDBCol
                        md="1"
                        style={{ paddingLeft: 0, paddingRight: 0 }}
                      >
                        <label
                          style={{ "margin-bottom": 0 }}
                          htmlFor="formInput2"
                        >
                          สถานะ
                        </label>
                        <br />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.checkedSw}
                              color="primary"
                              onClick={this.handleSwitch}
                            />
                          }
                          label={
                            this.state.checkedSw === true
                              ? "STATUS ON"
                              : "STATUS OFF"
                          }
                        />

                        {/* <select
                          id="formInput2"
                          name="status"
                          value={this.state.status}
                          onChange={this.handleChange}
                          className="form-control form-control-sm"
                        >
                          <option value="">Choose your option</option>
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select> */}
                        {/* <input
                        name="status"
                        onChange={this.handleChange}
                        id="formInput2"
                        className="form-control form-control-sm"
                        type="text"
                        placeholder=""
                      /> */}
                      </MDBCol>
                      <MDBCol md="2">
                        <label htmlFor="formInput3">volumn</label>
                        <input
                          value={this.state.volumn}
                          name="volumn"
                          onChange={this.handleChange}
                          id="formInput3"
                          className="form-control form-control-sm"
                          type="text"
                          placeholder=""
                        />
                      </MDBCol>
                      <MDBCol md="2" style={{ bottom: 0, top: 26 }}>
                        <MDBBtn
                          onClick={this.BtnSearch}
                          outline
                          size="sm"
                          color="primary"
                        >
                          <MDBIcon icon="search" /> ค้นหา
                        </MDBBtn>
                        <MDBBtn size="sm" onClick={this.op2} color="primary">
                          <MDBIcon icon="plus" /> สร้าง
                        </MDBBtn>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: 10 }}>
                      <MDBCol>
                        <Tbdata
                          Adata={this.state.datasearch}
                          op={this.op}
                          op2={this.op2}
                          op3={this.op3}
                        />
                      </MDBCol>
                    </MDBRow>
                  </Grid>
                </Grid>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <ModalComp
          ImageUpdate={this.ImageUpdate}
          update={this.update}
          SwUpdate={this.SwUpdate}
          op={this.state.modal}
          name={this.state.name}
          id={this.state.id}
          fff={this.toggle}
          url={this.state.url}
          type={this.state.type_view}
          desc={this.state.desc}
          comment={this.state.comment}
          width={this.state.width}
          height={this.state.height}
          leng={this.state.leng}
          volumn={this.state.volumn_view}
          update_log_err={this.state.update_log_err}
          status={this.state.status}
        ></ModalComp>
        <CreateSpace
          opCreate={this.state.modal2}
          closemodal={this.toggle2}
          saveSpace={this.SaveSpace}
          edit={this.state.edit}
          id={this.state.id}
        />
        <EditSpace
          opEdit={this.state.modal3}
          closeop3={this.toggle3}
          id={this.state.id_ed}
          type_ed={this.state.type_ed}
          desc_ed={this.state.desc_ed}
          image_ed={this.state.image_ed}
          comment_ed={this.state.comment_ed}
          width_ed={this.state.width_ed}
          height_ed={this.state.height_ed}
          leng_ed={this.state.leng_ed}
        />
      </LoadingOverlay>
    );
  }
}
