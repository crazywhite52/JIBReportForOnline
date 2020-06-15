import * as React from 'react';
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.metrodark.css";
import {
    MDBContainer,
    MDBBtn,
    MDBIcon
  } from "mdbreact";


class Tb_jqx_serach extends React.PureComponent<any, IGridProps> {
    private myGrid = React.createRef<JqxGrid>();

    componentDidMount() {

    }

    public render() {
        // const imagerenderer = (row: number, datafield: string, value: string): string => {
        //     return '<img style="margin-left: 5px;" alt="img null" height="100%" width="100%" src="' + value + '"/>';
        // };
        const data = this.props.Adata;
        const source: any = {
            datafields: [
                { name: '_id', type: 'string' },
                { name: 'type', type: 'string' },
                { name: 'desc', type: 'string' },
                { name: 'status', type: 'string' },
                { name: 'comment', type: 'string' },
                { name: 'volumn', type: 'number' },
                { name: 'width', type: 'string' },
                { name: 'height', type: 'string' },
                { name: 'leng', type: 'string' },
                { name: 'image', type: 'string' }

            ],
            datatype: 'array',
            localdata: data
        };
        const cellClass = (row: number, columnfield: any, value: string): any => {
            if(value==='false'){
                return 'red';
            }else{
                return 'green';
            }
        }
        const strenderer = (row: number, column: any, value: any): any => {
            if(value==='false'){
                return '<div class="jqx-grid-cell-middle-align" style="margin-top: 8px;">OFF</div>';
            }else{
                return '<div class="jqx-grid-cell-middle-align" style="margin-top: 8px;">ON</div>';
            }
        }
        const columns: any = [
            {
                text: 'View/Edit', datafield: 'image', align: 'center', columntype: 'button', width: 115, sortable: false, filterable: false, cellsrenderer: function () {
                    return "✍"},buttonclick: (row: number): void => {
                    let value = this.myGrid.current!.getrowdata(row);
                    this.props.op(true,value.image,value.type,value.desc,value.comment,value.width,value.height,value.leng,value.volumn,value._id,value.status);
                }
            },
            // {
            //     text: '', align: 'center', columntype: 'button', sortable: false, filterable: false, width: 100, cellsrenderer: function () {
            //         return "แก้ไข";
            //     }, buttonclick: (row: number): void => {
            //         let value = this.myGrid.current!.getrowdata(row);
            //         this.props.op3(true,true,value._id,value.image,value.type,value.desc,value.comment,value.width,value.height,value.leng);
            //     }
            // },
            { text: '_id', datafield: '_id', hidden: true, align: 'center', width: '' },
            { text: 'Type', datafield: 'type', filtertype: 'checkedlist', align: 'center', width: '10%' },
            { text: 'Description', datafield: 'desc', align: 'center', width: '25%' },
            { text: 'Comment', datafield: 'comment', align: 'center', width: '32%' },
            { text: 'Width', datafield: 'width', width: 60,align: 'center',cellsalign: 'center' },
            { text: 'Height', datafield: 'height', width: 60,align: 'center',cellsalign: 'center' },
            { text: 'Length', datafield: 'leng', width: 60,align: 'center',cellsalign: 'center' },
            { text: 'Volumn', datafield: 'volumn', align: 'center', width: 150,cellsformat: 'n',cellsalign: 'right' },
            { text: 'Status', datafield: 'status', align: 'center', width: '5%',cellsalign: 'center',cellclassname: cellClass,cellsrenderer:strenderer },
        ]


        return (
            <div>
                <JqxGrid
                    //rowsheight={60}
                    // @ts-ignore
                    ref={this.myGrid}
                    filterable={true}
                    //statusbarheight={20}
                    showaggregates={true}
                    selectionmode={'multiplerowsextended'}
                    theme="metrodark"
                    pageable={true}
                    pagesizeoptions={['50','100','500']}
                    columnsreorder={true}
                    showfilterrow={true}
                    height={680}
                    width={'100%'} source={new jqx.dataAdapter(source)} columns={columns}
                    columnsresize={true} sortable={true} />

            </div>
        );
    }

}
export default Tb_jqx_serach;