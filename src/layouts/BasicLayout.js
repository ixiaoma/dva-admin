import React,{ PureComponent } from 'react'
import { connect, router } from 'dva';
import { LeftSideBar } from './SideBar';
import { Layout } from 'antd';
import NavBar from './NavBar';
import cx from 'classnames';
import './styles/basic.less';
import 'assets/styles/transition.less';
import isEqual from 'react-fast-compare';
import pathToRegexp from 'path-to-regexp';
import { enquireIsMobile } from '@/utils/enquireScreen';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
const { Switch } = router;
const { Content, Header } = Layout;

@connect(({ global }) => ({ global }))
export default class BasicLayout extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      collapsedLeftSide: false, // 左边栏开关控制
      leftCollapsedWidth: 60, // 左边栏宽度
      expandTopBar: false, // 头部多功能区开合
      theme:{
        leftSide: 'darkgrey', // 左边
        navbar: 'light', // 顶部
        layout: [
          'fixedHeader',
          'fixedSidebar',
          'fixedBreadcrumbs'
        ]
      }, // 皮肤设置
      currentMenu: {},//当前路由
      isMobile:false//是否移动端
    };

    props.dispatch({
      type: 'global/getMenu'
    });
  }

  componentDidMount(){
    this.unregisterEnquire = enquireIsMobile(ismobile => {
      const { isMobile, theme } = this.state;
      if (isMobile !== ismobile) {
        // 如查是移动端则不固定侧边栏
        if (ismobile && $$.isArray(theme.layout)) {
          theme.layout = theme.layout.filter(item => item !== 'fixedSidebar');
        }
        this.setState({
          isMobile: ismobile
        });
      }
    })
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (
      !isEqual(this.props.location.pathname, prevProps.location.pathname) ||
      !isEqual(this.props.global.flatMenu, prevProps.global.flatMenu)
    ) {
      this.setState({
        currentMenu: this.getCurrentMenu() || {}
      });
    }
  }
  //获取当前菜单
  getCurrentMenu(){
    const { location: { pathname }, global } = this.props;
    const menu = this.getMeunMatchKeys(global.flatMenu, pathname)[0];
    return menu;
  }

  getMeunMatchKeys = (flatMenu, path) => {
    return flatMenu.filter(item => {
      return pathToRegexp(item.path).test(path);
    });
  };

  componentWillUnmount() {
    // 清理监听
    this.unregisterEnquire();
  }

  //菜单收缩控制
  onCollapseLeftSide = _ => {
    const collapsedLeftSide = this.state.leftCollapsedWidth === 0 ? true : !this.state.collapsedLeftSide;
    this.setState({
      collapsedLeftSide,
      leftCollapsedWidth: 60
    });
  };

  render(){
    const {
      theme,
      isMobile,
      currentMenu,
      collapsedLeftSide,
      leftCollapsedWidth
    } = this.state

    const { routerData, location, global } = this.props
    const { menu, flatMenu } = global;
    const { childRoutes } = routerData;

    const classnames = cx('basic-layout', 'full-layout', {
      fixed: theme.layout && theme.layout.indexOf('fixedSidebar') !== -1,
      'fixed-header':
        theme.layout && theme.layout.indexOf('fixedHeader') !== -1,
      'fixed-breadcrumbs':
        theme.layout && theme.layout.indexOf('fixedBreadcrumbs') !== -1,
      'hided-breadcrumbs':
        theme.layout && theme.layout.indexOf('hidedBreadcrumbs') !== -1
    });

    return(
      <Layout className={classnames}>
        <Header>
          <NavBar
            collapsed={collapsedLeftSide}
            onCollapseLeftSide={this.onCollapseLeftSide}
            onExpandTopBar={this.onExpandTopBar}
            theme={theme.navbar}
            isMobile={isMobile}
          />
        </Header>
        <Layout>
          <LeftSideBar
            collapsed={collapsedLeftSide}
            leftCollapsedWidth={leftCollapsedWidth}
            onCollapse={this.onCollapseLeftSide}
            location={location}
            theme={theme.leftSide}
            flatMenu={flatMenu}
            currentMenu={currentMenu}
            menu={menu}
            isMobile={isMobile}
          />
          <Content>
            <Layout className="full-layout">
              <Content style={{ overflow: 'hidden' }}>
                <SwitchTransition>
                  <CSSTransition
                    key={location.pathname}
                    classNames="fade"
                    timeout={500}
                  >
                    <Layout className="full-layout">
                      <Content className="router-page">
                        <Switch location={location}>{childRoutes}</Switch>
                      </Content>
                    </Layout>
                  </CSSTransition>
                </SwitchTransition>
              </Content>
            </Layout>
          </Content>
        </Layout>
        {/* <SkinToolbox onChangeTheme={this.onChangeTheme} theme={theme} /> */}
      </Layout>
    )
  }
}