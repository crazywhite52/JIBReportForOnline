import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBIcon,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import jib from "./img/jib-logo-white2.png";
import AuthService from "./authlogin/AuthService";
import SideNavigation from './SideNavigation_v2';
class TopNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseID: "",
      accessapp: [],
      accessadmin: 0,
      isOpen: false,
      profile: {}
    };
    this.Auth = new AuthService();
    // this.getRoutetitle = this.getRoutetitle.bind(this);
  }

  componentDidMount() {
    let Access = this.Auth.getAccess();
    let Accessadmin = this.Auth.getAccessadmin();
    if (Access != 0) {
      let Accessapp = JSON.parse(Access);
      this.setState({ accessapp: Accessapp, accessadmin: Accessadmin }, () => {
        // console.log(this.state.accessapp);
      });
    } else {
      this.setState({ accessapp: [], accessadmin: [] }, () => {
        // console.log(this.state.accessapp);
      });
    }
    if (this.Auth.loggedIn()) {
      let profile = this.Auth.getProfile();
      this.setState({ profile: profile });
    }

  }
  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  closeCollapse = collapseID => () =>
    this.state.collapseID === collapseID && this.setState({ collapseID: "" });


  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  render() {
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("mainNavbarCollapse")}
      />
    );
    return (
      <div>
        {/* <SideNavigation /> */}
        {this.Auth.loggedIn() && (
          <MDBNavbar
            color="indigo darken-4"
            //style={{ background: "#2a2662" }}
            // className="flexible-navbar"
            dark
            expand="md"
            scrolling
          >
            <MDBNavbarBrand href="/" style={{ paddingTop: 0, paddingBottom: 0 }}>
              {/* <strong className="white-text">JIBQuicktron</strong> */}
              <img
                style={{ paddingLeft: 0, height: 35, marginLeft: 0 }}
                alt="MDB React Logo"
                className="img-fluid"
                src={jib}
              /> <strong className="white-text">Report For Online</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse("mainNavbarCollapse")} />
            <MDBCollapse
              id="navbarCollapse"
              isOpen={this.state.collapseID}
              navbar>
              <MDBNavbarNav left>
                <MDBNavItem>
                  <MDBNavLink
                    to="/"
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                  >
                    Home</MDBNavLink>
                </MDBNavItem>        
                <MDBNavItem>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/RP001"
                  >
                    <MDBIcon
                      icon="angle-right"
                      size="1x"
                      className="amber-text pr-3"
                    />
                    <strong>Report</strong>
                  </MDBNavLink>
                </MDBNavItem>

              </MDBNavbarNav>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBNavLink className="waves-effect waves-light" to="#!">
                    <MDBIcon icon="user-clock" /> {this.state.profile.username}{','}{this.state.profile.fullname}
                  </MDBNavLink>
                </MDBNavItem>

              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>)}
      </div>
    );
  }
}

export default TopNavigation;
