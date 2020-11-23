import $$ from 'cmn-utils';

export async function getData(payload) {
  return $$.post('http://cdb-tst.earth.xpaas.lenovo.com/account/loginLog/page', payload).then(resp => {
    return resp
  })
}