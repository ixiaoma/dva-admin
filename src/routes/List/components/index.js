import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Button } from 'antd';
import Icon from 'components/Icon';
import DataTable from 'components/DataTable';
// import Form from 'components/Form'

const columns = [
  {
    title: '名称',
    name: 'name',
    tableItem: {
      width: 120,
      fixed: 'left'
    },
    formItem: {}
  },
  {
    title: '年龄',
    name: 'age',
    tableItem: {},
    formItem: {}
  },
  {
    title: '地址',
    name: 'address',
    tableItem: {},
    dict: [
      { code: '1', codeName: '111' },
      { code: '2', codeName: '222' },
      { code: '3', codeName: '333' },
    ],
    formItem: {
      type: 'select',
    }
  },
  {
    title: '操作',
    name:'action',
    tableItem: {
      width: 100,
      fixed: 'right',
      render: (text, record) => (
        <DataTable.Oper>
          <Button tooltip="修改">
            <Icon type="edit" />
          </Button>
          <Button tooltip="删除">
            <Icon type="trash" />
          </Button>
        </DataTable.Oper>
      )
    },
    formItem: {
      type: 'hidden',
    }
  }
]

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list
}))

export default class List extends Component{
  componentDidMount(){
    const { dispatch } = this.props
    const params = {"take":10,"skip":0,"page":1,"pageSize":10,"searchFilter":{"filters":[],"logic":"and"},"objectType":"61","conditionId":""}
    dispatch({
      type:'list/getListData',
      payload:params
    })
  };

  onSubmit = (value)=>{
    console.log(value)
  };

  tableChange = (data)=>{
    console.log(data)
  }

  render(){

    const { list,loading } = this.props
    const { pageData } = list

    const dataTableProps = {
      loading,
      columns,
      rowKey: 'id',
      dataItems: pageData,
      onChange:(data)=>{this.tableChange(data)}
      // showNum: true
    }
    
    return(
      <Card size="small">
        {/* <Form type="inline" columns={columns} onSubmit={this.onSubmit} /> */}
        <DataTable pagination { ...dataTableProps }/>
       </Card>
    )
  }
}