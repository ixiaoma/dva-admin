import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import DataTable from 'components/DataTable';

const columns = [
  {
    title: '名称',
    name: 'name',
    tableItem: {
      width: 120,
      fixed: 'left'
    }
  },
  {
    title: '年龄',
    name: 'age',
    tableItem: {}
  },
  {
    title: '地址',
    name: 'address',
    tableItem: {}
  },
  {
    title: '操作',
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
    }
  }
]

const pageData = {
  total:10,
  pageSize:20,
  pageNum:1,
  list:[]
}

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list
}))

export default class List extends Component{
  
  render(){

    const { list,loading } = this.props
    // const { pageData } = list

    const dataTableProps = {
      loading,
      columns,
      rowKey: 'id',
      dataItems: pageData,
      showNum: true
    }
    
    return(
      <Card size="small">
        <DataTable { ...dataTableProps }/>
       </Card>
    )
  }
}