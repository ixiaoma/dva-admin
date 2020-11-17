export default {
  namespace:'list',

  state:{

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

  effects: {
    *getListData({ payload },{ call, put }){
      yield put({
        type:'setPageData',
        payload:{}
      })
    }
  }
}