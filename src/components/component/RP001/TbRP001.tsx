import * as React from 'react';
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.metrodark.css";
import './styleGrid.css'
import {
    MDBContainer,
    MDBBtn,
    MDBIcon,MDBRow, MDBCol
  } from "mdbreact";


class TbRP001 extends React.PureComponent<any, IGridProps> {
    private myGrid = React.createRef<JqxGrid>();
    constructor(props: IGridProps) {
        super(props) 
        this.excelBtnOnClick = this.excelBtnOnClick.bind(this);

    }
    componentDidMount() {

    }

    private excelBtnOnClick() {
        this.myGrid.current!.exportdata('xls', 'jqxGrid');
    };

    public render() {
        // const imagerenderer = (row: number, datafield: string, value: string): string => {
        //     return '<img style="margin-left: 5px;" alt="img null" height="100%" width="100%" src="' + value + '"/>';
        // };
        const data = this.props.data;
        const source: any = {
            datafields: [
                { name: 'available', type: 'bool' },
                { name: 'order_number', type: 'string' },
                { name: 'user_order_type_name', type: 'string' },
                { name: 'box_number', type: 'string' },
                { name: 'sizebox_price_cod', type: 'float' },
                { name: 'sizebox_price', type: 'float' },
                { name: 'sum_price', type: 'float' },
                { name: 'order_price_total', type: 'float' },
                { name: 'logistic_date', type: 'string' },
                { name: 'size_high', type: 'float' },
                { name: 'size_length', type: 'float' },
                { name: 'size_total', type: 'float' },
                { name: 'size_width', type: 'float' },
                { name: 'weight', type: 'float' },
                { name: 'payname', type: 'string' },
                { name: 'shipping_type_mes', type: 'string' },
                { name: 'order_province', type: 'string' },
                { name: 'order_type', type: 'string' },
            
                
            ],
            datatype: 'array',
            id: 'order_number',
            localdata: data
        };
      
        const colorSum_price = (row: number, columnfield: any, value: number): string => {
                return 'colorSum';
        }

        const columns: any = [
            { text: 'No', align: 'center', width: '45',filterable:false,datafield:'available',cellsrenderer: (row: any) => {
                const value = this.myGrid.current!.getrowdata(row); 
                //console.log(value);
                const nn = value.visibleindex+1;
                return '<div class="jqx-grid-cell-middle-align" style="margin-top: 8px;">'+nn+'</div>';
            } },
            { text: 'ประเภท', align: 'center',datafield:'order_type',cellsalign: 'center', width: '4%' },
            { text: 'Order', align: 'center',datafield: 'order_number', cellsalign: 'center', width: '8%' },
            { text: 'หน่วยงาน', align: 'center',datafield: 'user_order_type_name',cellsalign: 'center', width: '7%' },
            { text: 'รูปแบบการจัดส่ง', align: 'center', width: '6%',datafield: 'shipping_type_mes',cellsalign: 'center',filterable:false },
            { text: 'ขนส่งแมส', align: 'center', width: '5%',filterable:false },
            { text: 'Box', columngroup: 'Name',align: 'center',datafield: 'box_number',cellsalign: 'center', width: 70,filterable:false },
            { text: 'ค่าใช้จ่าย',  columngroup: 'Name',align: 'center',datafield: 'sizebox_price',cellsalign: 'right',cellsformat: 'f2', width: 100 },
            { text: 'ค่าบริการCOD',  columngroup: 'Name',align: 'center',datafield: 'sizebox_price_cod',cellsalign: 'right',cellsformat: 'f2', width: 90 },
            { text: 'ค่าใช้จ่ายรวม',  columngroup: 'Name',align: 'center',datafield: 'sum_price',cellsalign: 'right',cellsformat: 'f2', cellclassname: colorSum_price, width: 80 },
            { text: 'ยอดOrder',  columngroup: 'Name',align: 'center', datafield: 'order_price_total',cellsalign: 'right',cellsformat: 'f2',width: 100 },
            { text: 'น้ำหนัก',  columngroup: 'Name',align: 'center',datafield: 'weight', cellsalign: 'right',width: 60 },
            { text: 'กว้าง cm',  columngroup: 'Name',align: 'center',datafield: 'size_width',cellsalign: 'right', width: 60 },
            { text: 'ยาว cm',  columngroup: 'Name',align: 'center',datafield: 'size_length',cellsalign: 'right', width: 60 },
            { text: 'สูง cm',  columngroup: 'Name',align: 'center',datafield: 'size_high',cellsalign: 'right', width: 60 },
            { text: 'ปริมาณรวม', align: 'center',datafield: 'size_total',cellsalign: 'right', width: '4%' },
            { text: 'รูปแบบการชำระเงิน', align: 'center',datafield: 'payname', width: '10%' },
            { text: 'พื้นที่จัดส่ง', align: 'center',datafield: 'order_province',cellsalign: 'center', width: '7%' },
            { text: 'วันที่จัดส่ง', align: 'center',datafield: 'logistic_date', cellsalign: 'center',width: '9%' },
        ]
        // filtertype: 'checkedlist'
        const columngroups: any = [
            { text: 'JIB', align: 'center', name: 'Name' }
        ]

        


        return (
            <div>
                  <MDBRow>
                  <MDBCol>
                  <MDBBtn color="primary" onClick={this.excelBtnOnClick} size="sm"><MDBIcon icon="file-export" /> Export</MDBBtn>   
                <JqxGrid
                    //rowsheight={60}
                    // @ts-ignore
                    ref={this.myGrid}
                    filterable={true}
                    //statusbarheight={20}
                    showaggregates={true}
                    selectionmode={'singlecell'}
                    theme="Light"
                    pageable={true}
                    pagesizeoptions={['100','200','500','1000']}
                    pagesize={100}
                    columnsreorder={true}
                    showfilterrow={true}
                    height={700}
                    width={'100%'} source={new jqx.dataAdapter(source)} 
                    columns={columns}
                    columngroups={columngroups}
                    columnsresize={true} sortable={true} />
                    </MDBCol>
</MDBRow>
            </div>
        );
    }

}
export default TbRP001;
