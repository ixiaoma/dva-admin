import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Button, Table, Space, Form, Row, Col, Input, Modal } from 'antd';
import Icon from 'components/Icon';

const pageData = []
for (let i = 0; i < 46; i++) {
  pageData.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const FilterForm = () => {
  const [form] = Form.useForm();

  const searchFilter = (value)=>{
    console.log(value)
  }

  const resetFilter = () => {
    form.resetFields();
  }
  
  return(
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={searchFilter}
    >
      <Row gutter={24}>
        <Col span={8}>
            <Form.Item name="name" label="姓名">
              <Input placeholder="请输入姓名" />
            </Form.Item>
          </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">查询</Button>
          <Button style={{ margin: '0 8px' }} onClick={resetFilter}>重置</Button>
          {/* <a
            style={{ fontSize: 12 }}
            onClick={() => {
              setExpand(!expand);
            }}
          >
            {expand ? <UpOutlined /> : <DownOutlined />} Collapse
          </a> */}
        </Col>
      </Row>
    </Form>
  )
}

class ModelCom extends Component{
  componentWillReceiveProps(newProps){
    console.log(newProps)
    // if(newProps.formObj.id){
    //   this.setState({
    //     form: newProps.formObj
    //   })
    // }
  }
  render(){
    const { title = "新增", visible, formData = {name:'11'}, closeModel, onSubmit } = this.props
    const submit = () => {
      onSubmit(1)
    }
    return (
      <Modal
          title={title}
          visible={visible}
          onOk={submit}
          onCancel={closeModel}
        >
          <p>{formData.name}</p>
        </Modal>
    )
  }
}

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list
}))

class StaticPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      visible : false,
      formData:{}
    }
  }
  
  onSubmit = (value)=>{
    console.log(value)
  };

  render(){
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        fixed: 'left'
      },
      {
        title: '年龄',
        dataIndex: 'age'
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
      {
        title: '操作',
        width: 120,
        fixed: 'right',
        render: (text, record) => (
          <Space>
            <Icon type="edit" size="30" onClick={()=>showModel(record)}/>
            <Icon type="trash" />
          </Space>
        )
      }
    ]

    const showModel = (record) => {
      console.log(record)
      this.setState({visible:true,formData:{name:record.name}})
    }
    const closeModel = ()=>{
      this.setState({visible:false})
    }
    const onSubmit = (data) => {
      console.log(data)
      this.setState({visible:false})
    }
    const {visible, formData} = this.state
    return(
      <Card size="small">
        <FilterForm/>
        <ModelCom visible={visible} closeModel={closeModel} onSubmit={onSubmit} formData={formData}/>
        <Button type="primary" onClick={showModel}>新增</Button>
        <Table size="small" bordered columns={columns} dataSource={pageData} scroll={{x:'max-content'}}/>
       </Card>
    )
  }
}
import { createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/static',
  title: '锁屏',
  component: StaticPage
});

export default app => createRoute(app, routesConfig);
