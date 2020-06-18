import React, { PureComponent } from 'react'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Tb001 from '../component/RP001/TbRP001'
import Form from '../component/RP001/Form001'
import ApiService from '../actions/apidata';
import AuthService from '../authlogin/AuthService'
import LoadingOverlay from "react-loading-overlay";
import Export01 from '../component/Export/Export01'
import { withSnackbar } from "notistack";
var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
class Report001 extends PureComponent {
    constructor(props) {
        super(props)
        this.ApiCall = new ApiService();
        this.Auth = new AuthService();
        this.state = {
            loading: false,
            DataList: [],
            shipping_id: 1,
            dateBegin: date,
            user: '',
            dateEnd: date
        }
    }
    componentWillMount() {
        if (!this.Auth.loggedIn()) {
            this.props.history.replace('/login')
        }
        else {
            try {

                const profile = this.Auth.getProfile()
                this.setState({
                    user: profile
                }, () => {
                    let Access = this.Auth.getAccess();
                    let Accessapp = JSON.parse(Access);
                    let Accessadmin = this.Auth.getAccessadmin();
                    //console.log(Accessadmin);
                    if (Accessapp.length == 0 && Accessadmin==0) {
                        this.props.enqueueSnackbar("คุณยังไม่มีสิทธิ์เข้าใช้หน้าจอนี้", {
                            variant: "error"
                        });
                        this.props.history.replace('/login')
                    } else {

                    }
                    //console.log(Accessapp[0]['menu_id']);

                })
            }
            catch (err) {
                this.Auth.logout()
                this.props.history.replace('/login')
            }
        }
    }
    componentDidMount() {

        this.LoadData();
    }
    Btsearch = (shipid, dateBegin, dateEnd) => {
        //console.log(shipid + dateBegin + dateEnd);
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
                    }, () => {
                        this.LoadData();
                    })
                })

            }, 1500)
        })
    }
    LoadData = () => {

        let datasend = Array();
        datasend = {
            "shipping_id": this.state.shipping_id,
            "dateBegin": this.state.dateBegin,
            "dateEnd": this.state.dateEnd
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
                    // console.log(this.state.DataList);
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
                        <Export01 data={this.state.DataList} />
                        <Tb001 data={this.state.DataList}
                        />
                    </LoadingOverlay>
                </MDBContainer>
            </div>
        )
    }
}

export default withSnackbar(Report001)
