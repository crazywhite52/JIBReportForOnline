import React, { Component } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBCol,
  MDBRow,
  MDBMask,
  MDBView,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardGroup,
  MDBPopoverBody,
  MDBPopoverHeader,
  MDBTooltip,
  MDBPopover,
  MDBInput,
  MDBAlert
} from "mdbreact";
import ApiService from "../actions/apidata";
import PopImg from "./pop_image";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export default class modal_img extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.EditType = this.EditType.bind(this);
    this.EditDesc = this.EditDesc.bind(this);
    this.EditComment = this.EditComment.bind(this);
    this.EditWidth = this.EditWidth.bind(this);
    this.EditLeng = this.EditLeng.bind(this);
    this.EditHeight = this.EditHeight.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.Update = this.Update.bind(this);
    this.ImgUpdate = this.ImgUpdate.bind(this);
    this.UpdatePic = this.UpdatePic.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleChangeSele = this.handleChangeSele.bind(this);

    this.state = {
      modal: false,
      modal2: false,
      url: "",
      nameEdit: "",
      type: "",
      desc: "",
      comment: "",
      width: "",
      leng: "",
      height: "",
      chkedit: false,
      chkupdate: false,
      SwStatus: ""
    };
    this.ApiCall = new ApiService();
  }
  handleChangeSele(e) {
    this.setState({ SwStatus: e.target.value }, () => {
      //alert(this.state.SwStatus)
      let id = this.props.id;
      this.props.SwUpdate(this.state.SwStatus,id);
    });
  }
  handleSwitch() {
    this.setState(
      {
        SwStatus: !this.state.SwStatus
      },
      () => {
        console.log(this.state.SwStatus);
      }
    );
  }
  ImgUpdate() {
    //alert(this.props.id);
    this.setState({
      modal2: true
    });
  }
  UpdatePic(pic) {
    //alert(pic);
    this.props.ImageUpdate(pic, this.props.id);
  }
  Update() {
    //alert(this.state.nameEdit+'ID-->'+this.props.id)
    let id = this.props.id;

    this.props.update(
      this.state.nameEdit === "ประเภท"
        ? this.state.type
        : this.state.nameEdit === "รายละเอียด"
        ? this.state.desc
        : this.state.nameEdit === "comment"
        ? this.state.comment
        : this.state.nameEdit === "ความกว้าง"
        ? this.state.width
        : this.state.nameEdit === "ความยาว"
        ? this.state.leng
        : this.state.nameEdit === "ความสูง"
        ? this.state.height
        : "",
      id,
      this.state.nameEdit,
      this.props.width,
      this.props.leng,
      this.props.height
    );
    this.setState({ chkedit: false });
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
  EditType() {
    //alert(this.props.id);
    this.setState({ chkedit: true, nameEdit: "ประเภท", type: this.props.type });
  }
  EditDesc() {
    //alert(this.props.id);
    this.setState({
      chkedit: true,
      nameEdit: "รายละเอียด",
      desc: this.props.desc
    });
  }
  EditComment() {
    this.setState({
      chkedit: true,
      nameEdit: "comment",
      comment: this.props.comment
    });
  }
  EditWidth() {
    this.setState({
      chkedit: true,
      nameEdit: "ความกว้าง",
      width: this.props.width
    });
  }
  EditLeng() {
    this.setState({
      chkedit: true,
      nameEdit: "ความยาว",
      leng: this.props.leng
    });
  }
  EditHeight() {
    this.setState({
      chkedit: true,
      nameEdit: "ความสูง",
      height: this.props.height
    });
  }
  componentDidMount() {}
  ModalPopOff = () => {
    this.setState({
      modal2: false
    });
  };
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
  render() {
    const formed =
      this.state.chkedit === true ? (
        <MDBRow>
          <MDBCol>
            <MDBInput
              label={this.state.nameEdit}
              onChange={this.handleChange}
              name={
                this.state.nameEdit === "ประเภท"
                  ? "type"
                  : this.state.nameEdit === "รายละเอียด"
                  ? "desc"
                  : this.state.nameEdit === "comment"
                  ? "comment"
                  : this.state.nameEdit === "ความกว้าง"
                  ? "width"
                  : this.state.nameEdit === "ความยาว"
                  ? "leng"
                  : this.state.nameEdit === "ความสูง"
                  ? "height"
                  : ""
              }
              type={
                this.state.nameEdit === "ประเภท"
                  ? "text"
                  : this.state.nameEdit === "รายละเอียด"
                  ? "text"
                  : this.state.nameEdit === "comment"
                  ? "text"
                  : this.state.nameEdit === "ความกว้าง"
                  ? "number"
                  : this.state.nameEdit === "ความยาว"
                  ? "number"
                  : this.state.nameEdit === "ความสูง"
                  ? "number"
                  : ""
              }
              value={
                this.state.nameEdit === "ประเภท"
                  ? this.state.type
                  : this.state.nameEdit === "รายละเอียด"
                  ? this.state.desc
                  : this.state.nameEdit === "comment"
                  ? this.state.comment
                  : this.state.nameEdit === "ความกว้าง"
                  ? this.state.width
                  : this.state.nameEdit === "ความยาว"
                  ? this.state.leng
                  : this.state.nameEdit === "ความสูง"
                  ? this.state.height
                  : ""
              }
              outline
              icon="edit"
            />
            <MDBBtn size="sm" color="success" onClick={this.Update}>
              <MDBIcon icon="times-circle" /> Update
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      ) : (
        ""
      );
    const err =
      this.props.update_log_err === "" ? (
        ""
      ) : (
        <MDBAlert color="danger">{this.props.update_log_err}</MDBAlert>
      );
    return (
      <div>
        <MDBContainer>
          {/* <MDBBtn onClick={this.toggle}>Modal</MDBBtn> */}
          <MDBModal
            isOpen={this.props.op}
            toggle={this.toggle}
            size="lg"
            //backdrop={false}
          >
            <MDBModalHeader toggle={this.toggle}>
              <h4>
                IMAGE NAME:{" "}
                <strong className="orange-text">{this.props.name}</strong>
              </h4>
              <footer
                style={{ fontSize: 12, color: "red" }}
                className="blockquote-footer mb-2"
              >
                คลิกที่รูปภาพเพื่อแก้ไข
              </footer>
            </MDBModalHeader>
            <MDBModalBody>
              {err}
              {formed}

              <MDBRow className="">
                <MDBCol md="6">
                  <MDBView hover zoom onClick={this.ImgUpdate}>
                    <img
                      src={this.props.url}
                      className="img-fluid"
                      alt="ImgSpace"
                    />
                    <MDBMask className="flex-center">
                      <p className="white-text">Zoom effect</p>
                    </MDBMask>
                  </MDBView>
                </MDBCol>
                <MDBCol md="6">
                  <MDBCard
                    color="primary-color"
                    text="white"
                    className="text-left p-3"
                  >
                    <blockquote className="blockquote mb-0">
                      <p>
                        <MDBIcon
                          icon="edit"
                          className="amber-text"
                          onClick={this.EditType}
                        />
                        ประเภท :{this.props.type}
                      </p>
                      <p>
                        <MDBIcon
                          icon="edit"
                          className="amber-text"
                          onClick={this.EditDesc}
                        />
                        รายละเอียด : {this.props.desc}
                      </p>
                      <p>
                        <MDBIcon
                          icon="edit"
                          className="amber-text"
                          onClick={this.EditComment}
                        />
                        comment : {this.props.comment}
                      </p>
                      <p>
                        <MDBIcon
                          icon="edit"
                          className="amber-text"
                          onClick={this.EditWidth}
                        />
                        ความกว้าง(width) : {this.props.width}
                      </p>
                      <p>
                        <MDBIcon
                          icon="edit"
                          className="amber-text"
                          onClick={this.EditLeng}
                        />
                        ความยาว(length) : {this.props.leng}
                      </p>
                      <p>
                        <MDBIcon
                          icon="edit"
                          className="amber-text"
                          onClick={this.EditHeight}
                        />
                        ความสูง(height) : {this.props.height}
                      </p>
                      <p>ปริมาตร(volumn) : {this.props.volumn}</p>
                    </blockquote>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="6">
                  Status
                  <select
                    onChange={this.handleChangeSele}
                    className="browser-default custom-select sm"
                  >
                    {this.props.status === "true" ? (
                      <option value="true">ON</option>
                    ) : (
                      <option value="false">OFF</option>
                    )}
                    <option value="true">ON</option>
                    <option value="false">OFF</option>
                  </select>
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn size="md" color="danger" onClick={this.toggle}>
                <MDBIcon icon="times-circle" /> ปิด
              </MDBBtn>
            </MDBModalFooter>
          </MDBModal>
          <PopImg
            popOp={this.state.modal2}
            sendPic={this.UpdatePic}
            offmodal2={this.ModalPopOff}
          />
        </MDBContainer>
      </div>
    );
  }
}
