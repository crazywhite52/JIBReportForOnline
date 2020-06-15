import React, { PureComponent } from 'react'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Tb001 from '../component/RP001/TbRP001'
import Form from '../component/RP001/Form001'
import ApiService from '../actions/apidata';
import LoadingOverlay from "react-loading-overlay";
class Report001 extends PureComponent {
    constructor(props) {
        super(props)
        this.ApiCall = new ApiService();
        this.state = {
            loading: false,
            DataList: [],
            shipping_id: '',
            dateBegin: '',
            dateEnd: ''
        }
    }
    componentDidMount() {
        this.LoadData();

    }
    Btsearch = (shipid, dateBegin, dateEnd) => {
        this.setState({
            loading: true
        }, () => {

            this.timeout = setTimeout(() => {
                this.setState({
                    shipping_id: shipid,
                    dateBegin: dateBegin,
                    dateEnd: dateEnd
                }, () => {
                    this.setState({
                        loading: false
                    })
                })

            }, 1500)
        })
    }
    LoadData = () => {

        let datasend = Array();
        datasend = {
            "shipping_id": 1,
            "dateBegin": "2020-05-01",
            "dateEnd": "2020-05-31"
        }
        this.setState({
            loading: true
        })
        this.ApiCall.searchShippingPrice(datasend)
            .then(res => {
                //console.log(res);
                this.setState({
                    DataList: res.data,
                    loading: false
                }, () => {
                    console.log(this.state.DataList);
                })
            }).catch(error => {
                console.error(error.message);
            });
    }
    render() {
        return (
            <div>
                <MDBContainer fluid>
                    <LoadingOverlay active={this.state.loading} spinner text="loading...">
                        <Form Btsearch={this.Btsearch} />
                        <Tb001 data={this.state.DataList} />
                    </LoadingOverlay>
                </MDBContainer>
            </div>
        )
    }
}

export default Report001
