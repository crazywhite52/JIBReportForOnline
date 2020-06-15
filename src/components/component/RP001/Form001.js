import React, { PureComponent } from 'react'
import ApiService from '../../actions/apidata'
import {
    MDBContainer,
    MDBBtn,
    MDBIcon, MDBRow, MDBCol
} from "mdbreact";
var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

class Form001 extends PureComponent {
    constructor(props) {
        super(props)
        this.ApiCall = new ApiService();
        this.state = {
            shipping: [],
            shipid: '',
            dateBegin: date,
            dateEnd: date
        }
    }
    componentDidMount() {
        this.ApiCall.searchShipping()
            .then(res => {
                console.log(res);
                this.setState({
                    shipping: res.data
                })
            }).catch(error => {
                console.error(error.message);
            });
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState(
            {
                [e.target.name]: e.target.value
            },
            () => {
                //console.log(this.state.shipid)
                //this.props.Btsearch(this.state.shipid)
            }
        );
    }
    BtClick = () => {
        
        this.props.Btsearch(this.state.shipid,this.state.dateBegin,this.state.dateEnd);
    }
    render() {
        const select = this.state.shipping.map((todo, index) =>
            <option value={todo.shipping_id}>{todo.shipping_name}</option>
        );
        return (
            <div>
                <MDBRow>
                    <MDBCol sm="4" md="2">
                        <div className="form-group">
                            <label htmlFor="formGroupExampleInput">วันที่(เริ่ม)</label>
                            <input type="date" className="form-control form-control-sm" name="dateBegin" onChange={this.handleChange}></input>
                        </div>
                    </MDBCol>
                    <MDBCol sm="4" md="2">
                        <div className="form-group">
                            <label htmlFor="formGroupExampleInput2">วันที่(สิ้นสุด)</label>
                            <input type="date" className="form-control form-control-sm" name="dateEnd" onChange={this.handleChange}></input>
                        </div>
                    </MDBCol>
                    <MDBCol sm="4" md="2">
                        <div className="form-group">
                            <label htmlFor="formGroupExampleInput2">Shipping</label>
                            <select className="form-control form-control-sm" name="shipid" onChange={this.handleChange} >
                                <option>Choose option</option>
                                {select}
                            </select>
                        </div>
                    </MDBCol>
                    <MDBCol sm="4" md="2">
                        <div className="" style={{ marginTop: 25 }}>
                            <MDBBtn type="button" size="sm" onClick={this.BtClick} ><MDBIcon icon="search" /> ค้นหา</MDBBtn>
                        </div>
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }
}

export default Form001