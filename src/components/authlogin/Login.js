import React, { Component } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import AuthService from "./AuthService";
import { withSnackbar } from "notistack";
import { MDBBtn, MDBIcon } from "mdbreact";
import "./Login.css";
import logo from "./JIB-LOGO/jib-logo-white2.png";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      open: false,
      username: null,
      password: null,
      profile: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.chktime = this.chktime.bind(this);
    this.Auth = new AuthService();
  }
  componentWillMount() {
    window.removeEventListener("resize", this._handleWindowResize);
    if (this.Auth.loggedIn()) this.props.history.replace("/");
  }
  componentDidMount() {
    if (this.Auth.loggedIn()) {
      let profile = this.Auth.getProfile();
      this.setState({ profile: profile });
      // this.props.enqueueSnackbar("ยินดีต้อนรับ เข้าสู่ระบบ.....", {
      //   variant: "success"
      // });
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };
  chktime() {
   
    let timeAfter30Mins = new Date(this.state.profile.exp*1000);
    var limit = timeAfter30Mins.getDate()+'/'+(timeAfter30Mins.getMonth()+1)+'/'+timeAfter30Mins.getFullYear()+' เวลา '+timeAfter30Mins.getHours()+':'+timeAfter30Mins.getMinutes()+':'+timeAfter30Mins.getSeconds()+' น.';
  
    return (limit);
  }

  render() {
    const { vertical, horizontal, open } = this.state;
    return (
      <div>
        <div className="background" />
        <div className="background2" />
        <div className="loginForm">
          <hgroup>
            <h1>
              <img style={{ width: "150px" }} src={logo} />
            </h1>
            <k style={{ color: "#ffffff", fontSize: "14px" }}>
              JIB Report For Online
            </k>
          </hgroup>
          {!this.Auth.loggedIn() && (
            <form onSubmit={this.handleFormSubmit}>
              <Input
                autoFocus
                autoComplete={"off"}
                placeholder="รหัสพนักงาน"
                type="text"
                name="username"
                onChange={this.handleChange}
                inputProps={{
                  "aria-label": "Description"
                }}
              />
              <br />
              <br />
              <Input
                autoComplete={"off"}
                placeholder="password"
                type="password"
                name="password"
                onChange={this.handleChange}
                inputProps={{
                  "aria-label": "Description"
                }}
              />
              <br /> <br />
              <MDBBtn gradient="purple" type="supmit">
                เข้าสู่ระบบ
              </MDBBtn>
              {/* <Button variant="contained" type="supmit">
                {" "}
                เข้าระบบ
              </Button> */}
            </form>
          )}
          {this.Auth.loggedIn() && (
            <div style={{ color: "green" }}>
              <br />

              <h5 style={{ textAlign: "left" }}>
                <k style={{ color: "black", margin: 20, marginLeft: 30 }}>
                  <MDBIcon
                    icon="check-circle"
                    size="2x"
                    className="green-text pr-3"
                  />{" "}
                  คุณกำลังใช้งานระบบอยู่{" "}
                </k>
              </h5>
              <h6 style={{ textAlign: "left", margin: 20, marginLeft: 30 }}>
                <k style={{ color: "black" }}>รหัสผู้ใช้งาน :</k>{" "}
                {this.state.profile.username}
              </h6>
              <h6 style={{ textAlign: "left", margin: 20, marginLeft: 30 }}>
                <k style={{ color: "black" }}>ชื่อผู้ใช้ : </k>
                {this.state.profile.fullname}
              </h6>
              <h6 style={{ textAlign: "left", margin: 20, marginLeft: 30 }}>
                <k style={{ color: "black" }}>หมดเวลา :</k> {this.chktime()}
              </h6>
              <br />
              <MDBBtn
                gradient="peach"
                type="button"
                style={{ color: "white" }}
                onClick={this.handleLogout}
              >
                ออกจากระบบ
              </MDBBtn>
              {/* <Button
                variant="contained"
                type="button"
                onClick={this.handleLogout}
              >
                {" "}
                ออกจากระบบ
              </Button> */}
              <br />
              <br />
              <br />
            </div>
          )}
        </div>
      </div>
    );
  }
  handleFormSubmit(e) {
    e.preventDefault();
    if (
      this.state.username === null ||
      this.state.username === "" ||
      this.state.password === "" ||
      this.state.password === null
    ) {
      this.props.enqueueSnackbar(
        "รหัสผู้ใช้หรือ พาสเวิร์ดไม่ถูกต้อง ลองใหม่อีกครั้ง..",
        {
          variant: "error"
        }
      );
    } else {
      this.Auth.login(this.state.username, this.state.password)
        .then(res => {
          if (res.accessapp === false) {
            this.props.enqueueSnackbar(
              "รหัสผู้ใช้หรือ พาสเวิร์ดไม่ถูกต้อง ลองใหม่อีกครั้ง..",
              {
                variant: "error"
              }
            );
          } else {
            //  console.log(res)
            window.location.reload();
            //  this.props.history.reload('/');
          }
        })
        .catch(err => {
          this.props.enqueueSnackbar(
            "รหัสผู้ใช้หรือ พาสเวิร์ดไม่ถูกต้อง ลองใหม่อีกครั้ง..",
            {
              variant: "error"
            }
          );
        });
    }
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleLogout() {
    this.Auth.logout();
    window.location.reload();
  }
}
export default withSnackbar(Login);
