import { getData } from '../service'
export default {
  namespace:'list',

  state:{
    pageData:{}
  },

  reducers: {
    setPageData(state, { payload }) {
      return {
        ...state,
        pageData: payload
      };
    }
  },

  effects: {
    *getListData({ payload },{ call, put }){
      const data = yield call(getData,payload)
      yield put({
        type:'setPageData',
        payload:data
      })
    }
  }
}