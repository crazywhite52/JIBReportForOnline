import * as React from 'react';
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.metrodark.css";



class Tb_location extends React.PureComponent<any, IGridProps> {
    private myGrid = React.createRef<JqxGrid>();

    componentDidMount() {

    }
    public render() {
        // const imagerenderer = (row: number, datafield: string, value: string): string => {
        //     return '<img style="margin-left: 5px;" alt="img null" height="100%" width="100%" src="' + value + '"/>';
        // };
        function formatNumber(e:any) {
            return e.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
          }
        const data = this.props.Adata;
        const source: any = {
            datafields: [
                { name: 'id', type: 'string' },
                { name: 'name', type: 'string' },
                { name: 'shelf', type: 'string' },
                { name: 'desc', type: 'string' },
                { name: 'space_type', type: 'string' },
                { name: 'space_volumn', type: 'number' },
                { name: 'space_image', type: 'string' },
                { name: 'dimension_w', type: 'string' },
                { name: 'dimension_h', type: 'string' },
                { name: 'dimension_l', type: 'string' },
                { name: 'isHigh', type: 'string' },
                { name: 'heavyLoad', type: 'string' },
                { name: 'status', type: 'string' }


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
                text: 'Details', datafield: 'image', align: 'center', columntype: 'button', width: 100, sortable: false, filterable: false, cellsrenderer: function () {
                    return "✍";},buttonclick: (row: number): void => {
                    let x = this.myGrid.current!.getrowdata(row);
                    
                    this.props.opModal2(true,x.name,x.shelf,x.space_type,x.desc,formatNumber(x.space_volumn),x.dimension_w,x.dimension_h,x.dimension_l,x.isHigh,x.heavyLoad,x.status,x.id)
                }
            },
            // {
            //     text: '', align: 'center', columntype: 'button', sortable: false, filterable: false, width: 100, cellsrenderer: function () {
            //         return "แก้ไข";
            //     }, buttonclick: (row: number): void => {
            //         let value = this.myGrid.current!.getrowdata(row);
            //         alert(value.id);
            //     }
            // },
            { text: 'id', datafield: 'id', hidden: true, align: 'center', width: '' },
            // { text: 'type', datafield: 'type', filtertype: 'checkedlist', align: 'center', width: 150 },
            { text: 'Location Name', datafield: 'name', align: 'center', width: '10%' },
            { text: 'Shelf Number/ID', datafield: 'shelf', align: 'center', width: '15%' },
            { text: 'Description', datafield: 'desc', align: 'center', width: '15%' },
            { text: 'Space Type', datafield: 'space_type', width: '8%',align: 'center' },
            { text: 'Space Volumn', datafield: 'space_volumn', width: '5%',align: 'center',cellsformat: 'n',cellsalign: 'right' },
            { text: 'Space Image', datafield: 'space_image', width: '5%',align: 'center',cellsalign:'center' },
            { text: 'Dimension Width', datafield: 'dimension_w', align: 'center', width: '6%',cellsalign:'center' },
            { text: 'Dimension Height', datafield: 'dimension_h', align: 'center', width: '6%',cellsalign:'center' },
            { text: 'Dimension Length', datafield: 'dimension_l', align: 'center', width: '6%',cellsalign:'center' },
            { text: 'IsHigh', datafield: 'isHigh', align: 'center', width: '5%',cellsalign:'center',cellclassname: cellClass,cellsrenderer:strenderer },
            { text: 'HeavyLoad', datafield: 'heavyLoad', align: 'center', width: '5%',cellsalign:'center',cellclassname: cellClass,cellsrenderer:strenderer },
            { text: 'Status', datafield: 'status', align: 'center', width: '5%',cellsalign:'center',cellclassname: cellClass,cellsrenderer:strenderer }
        ]


        return (
            <div>
                <JqxGrid
                    //rowsheight={60}
                    // @ts-ignore
                    ref={this.myGrid}
                    //filterable={true}
                    statusbarheight={25}
                    showaggregates={true}
                    selectionmode={'multiplerowsextended'}
                    theme="metrodark"
                    pageable={true}
                    pagesizeoptions={['50', '100','500']}
                    columnsreorder={true}
                    //showfilterrow={true}
                    height={700}
                    width={'100%'} source={new jqx.dataAdapter(source)} columns={columns}
                    columnsresize={true} sortable={true} />

            </div>
        );
    }

}
export default Tb_location;