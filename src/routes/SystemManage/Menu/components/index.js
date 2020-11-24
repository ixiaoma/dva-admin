import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout, Tree } from 'antd'
import $$ from 'cmn-utils';

@connect(({ menu, loading }) => ({
  menu,
  loading: loading.models.menu
}))

export default class Menu extends Component{
  componentDidMount(){
    this.getMenuData('1288782273767804931')
  }
  getMenuData = (key) =>{
    const { dispatch } = this.props
    dispatch({
      type:'menu/getMenuData',
      payload:key
    })
  }
  onLoadData = ({key,children})=>{
    return new Promise((resolve)=>{
      if(children){
        resolve()
      }
      this.getMenuData(key)
      resolve()
    })
  }
  onSelect = (selectedKeys)=>{
    console.log(selectedKeys)
  }
  render(){
    const { menu } = this.props
    return(
      <Layout className="full-layout page dashboard-page">
        <Tree loadData={this.onLoadData} onSelect={this.onSelect} treeData={menu.menuData} />
      </Layout>
    )
  }
}