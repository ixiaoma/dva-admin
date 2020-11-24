import $$ from 'cmn-utils';
import modelEnhance from '@/utils/modelEnhance';

export default modelEnhance({
  namespace: 'global',

  state: {
    menu: [],
    flatMenu: [],
  },

  effects: {
    *getMenu({ payload }, { call, put }) {
      // const { status, data } = yield call(getMenu, payload);
      // if (status) {
        const data = [
          {
            name: '仪表盘',
            icon: 'DashboardOutlined',
            path: '/dashboard',
          },
          {
            name: '系统管理',
            icon: 'BulbOutlined',
            path: '/systemManage',
            children: [
              {
                name: '菜单管理',
                path: '/menu',
              }
            ],
          },
          {
            name: '列表',
            icon: 'DashboardOutlined',
            path: '/list'
          },
          {
            name:'静态操作',
            icon: '',
            path: '/static'
          }
        ]
        const loopMenu = (menu, pitem = {}) => {
          menu.forEach(item => {
            if (pitem.path) {
              item.parentPath = pitem.parentPath ? pitem.parentPath.concat(pitem.path) : [pitem.path];
            }
            if (item.children && item.children.length) {
              loopMenu(item.children, item);
            }
          });
        }
        loopMenu(data);
        yield put({
          type: 'getMenuSuccess',
          payload: data,
        });
      }
    // },
  },

  reducers: {
    getMenuSuccess(state, { payload }) {
      return {
        ...state,
        menu: payload,
        flatMenu: getFlatMenu(payload),
      };
    }
  },
});

export function getFlatMenu(menus) {
  let menu = [];
  menus.forEach(item => {
    if (item.children) {
      menu = menu.concat(getFlatMenu(item.children));
    }
    menu.push(item);
  });
  return menu;
}

export async function getMenu(payload) {
  return $$.post('/user/menu', payload);
}