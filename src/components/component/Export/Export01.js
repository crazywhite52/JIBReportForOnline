import React, { PureComponent } from 'react'
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
    {
        name: "Johson",
        amount: 30000,
        sex: 'M',
        is_married: true
    },
    {
        name: "Monika",
        amount: 355000,
        sex: 'F',
        is_married: false
    },
    {
        name: "John",
        amount: 250000,
        sex: 'M',
        is_married: false
    },
    {
        name: "Josef",
        amount: 450500,
        sex: 'M',
        is_married: true
    }
];



class Export01 extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        //console.log(this.props.data);
        var dataarr = this.props.data;
        let newarr = Array();
        dataarr.map((todo, index) =>
            newarr.push({
                no: index + 1,
                order_type: todo.order_type,
                order_number: todo.order_number,
                user_order_type_name: todo.user_order_type_name,
                shipping_type_mes: todo.shipping_type_mes,
                box_number: todo.box_number,
                sizebox_price: todo.sizebox_price,
                sizebox_price_cod: todo.sizebox_price_cod,
                sum_price: todo.sum_price,
                order_price_total: todo.order_price_total,
                weight: todo.weight,
                size_width: todo.size_width,
                size_length: todo.size_length,
                size_high: todo.size_high,
                size_total: todo.size_total,
                payname: todo.payname,
                order_province: todo.order_province,
                logistic_date: todo.logistic_date,
            })

        );

        //console.log(dataSet1);
        const dataSetaa = newarr
        //console.log(dataSetaa);
        return (
            <>
                <ExcelFile>
                    <ExcelSheet data={dataSetaa} name="Order">
                        <ExcelColumn label="ลำดับ" value="no" />
                        <ExcelColumn label="ประเภท" value="order_type" />
                        <ExcelColumn label="Order" value="order_number" />
                        <ExcelColumn label="หน่วยงาน" value="user_order_type_name" />
                        <ExcelColumn label="รูปแบบการจัดส่ง" value="shipping_type_mes" />
                        <ExcelColumn label="Box" value="box_number" />
                        <ExcelColumn label="ค่าใช้จ่าย" value="sizebox_price" />
                        <ExcelColumn label="ค่าบริการCOD" value="sizebox_price_cod" />
                        <ExcelColumn label="ค่าใช้จ่ายรวม" value="sum_price" />
                        <ExcelColumn label="ยอดOrder" value="order_price_total" />
                        <ExcelColumn label="น้ำหนัก" value="weight" />
                        <ExcelColumn label="กว้าง cm" value="size_width" />
                        <ExcelColumn label="ยาว cm" value="size_length" />
                        <ExcelColumn label="สูง cm" value="size_high" />
                        <ExcelColumn label="ปริมาณรวม" value="size_total" />
                        <ExcelColumn label="รูปแบบการชำระเงิน" value="payname" />
                        <ExcelColumn label="พื้นที่จัดส่ง" value="order_province" />
                        <ExcelColumn label="วันที่จัดส่ง" value="logistic_date" />
                    </ExcelSheet>

                </ExcelFile>
            </>
        )
    }
}

export default Export01