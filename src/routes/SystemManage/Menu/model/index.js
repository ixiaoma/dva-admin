import { getData } from '../service'
export default {
  namespace:'menu',

  state:{
    menuData:[]
  },

  reducers: {
    setMenuData(state, { payload }) {
      return {
        ...state,
        menuData: payload
      };
    }
  },

  effects: {
    *getMenuData({ payload },{ call, put, select }){
      const data = yield call(getData,payload)
      const menuList = yield select(state => state.menu.menuData)
      const list = data.map(ele=>{
        return {
          ...ele,
          key:ele.id,
          title:ele.name,
          isLeaf: !ele.children
        }
      })
      const returnList = deepData({payload, menuList, list})
      yield put({
        type:'setMenuData',
        payload:returnList
      })
    }
  }
}
export function deepData({payload, menuList, list}){
  let returnList = []
  if(menuList.length){
    returnList = menuList.map(ele=>{
      if(ele.key == payload){
        return {
          ...ele,
          children:list
        }
      }else{
        if(ele.children && ele.children.length){
          return {
            ...ele,
            children:deepData({payload, menuList:ele.children, list})
          }
        }
      }
      return ele
    })
  }else{
    returnList = list
  }
  return returnList
}