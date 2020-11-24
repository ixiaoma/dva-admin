import $$ from 'cmn-utils';

export async function getMenuData() {
  return $$.get('/frame/resource/menu').then(resp => {
    return resp
  })
}

export async function getData(payload){
  return $$.get(`/auth/system/resource/menu/${payload}`).then(res=>res)
}