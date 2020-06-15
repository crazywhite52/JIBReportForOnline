import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { MDBInput } from "mdbreact";
import { MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdbreact";
import { MDBBtn, MDBIcon } from "mdbreact";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withSnackbar } from "notistack";
import LoadingOverlay from "react-loading-overlay";
import dateFormat from "dateformat";
import NumberFormat from "react-number-format";
import ApiService from "../actions/apidata";
import AuthService from "../authlogin/AuthService";
class trackserial extends Component {
  constructor(props) {
    super(props);
    this.senddata = this.senddata.bind(this);
    this.state = {
      completed: 0,
      doc_number: "",
      active: false,
      databox: []
    };
    this.Auth = new AuthService();
    this.ApiCall = new ApiService();
  }
  senddata(serialno) {
    // ตัวอย่างการเรียก API
    // this.setState({ active: true }, () => {
    //   this.ApiCall.GetdataSerial(encodeURIComponent(serialno))
    //     .then(res => {
    //       if (res.length > 0) {
    //         setTimeout(
    //           () =>
    //             this.setState({
    //               databox: res,
    //               active: false
    //             }),
    //           3000
    //         );
    //       } else {
    //         setTimeout(
    //           () =>
    //             this.setState({ databox: [], active: false }, () => {
    //               this.props.enqueueSnackbar("ไม่พบข้อมูล Serial นี้...", {
    //                 variant: "error"
    //               });
    //             }),
    //           3000
    //         );
    //       }
    //     })
    //     .catch(error => {
    //       console.error(error.message);
    //     });
    // });
  }

  render() {
    return (
      <LoadingOverlay
        color="red"
        active={this.state.active}
        spinner
        text="กำลังดึงข้อมูล . . ."
      >
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
                    style={{ padding: 0, marginLeft: 15, marginTop: 10 }}
                  >
                    <h4 style={{ color: "green" }}>
                      <MDBIcon
                        fab
                        icon="searchengin"
                        size="2x"
                        className="pink-text pr-3"
                      />
                      &nbsp;Example Test
                    </h4>
                  </Grid>
                  <Grid
                    item
                    lg={6}
                    xl={6}
                    xs={6}
                    sm={6}
                    md={6}
                    style={{ paddingLeft: 20 }}
                  >
                    <MDBInput
                      label="Test Number"
                      icon="barcode"
                      value={this.state.doc_number}
                      autoFocus={true}
                      ref={input => {
                        this.doc_number = input;
                      }}
                      onChange={event =>
                        this.setState(
                          { doc_number: event.target.value },
                          () => {}
                        )
                      }
                      onKeyPress={event => {
                        if (event.key === "Enter") {
                          if (event.target.value === "") {
                          } else {
                            this.senddata(event.target.value);
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    lg={6}
                    xl={6}
                    xs={6}
                    sm={6}
                    md={6}
                    style={{ padding: 3 }}
                  />
                  <Grid
                    item
                    lg={12}
                    xl={12}
                    xs={12}
                    sm={12}
                    md={12}
                    style={{ padding: 5 }}
                  >
                    <LinearProgress
                      color="secondary"
                      variant="determinate"
                      value={this.state.completed}
                    />
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    xl={12}
                    xs={12}
                    sm={12}
                    md={12}
                    style={{ padding: 10 }}
                  />
                </Grid>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </LoadingOverlay>
    );
  }
}
export default withSnackbar(trackserial);
