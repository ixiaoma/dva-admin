import $$ from 'cmn-utils';
import PageHelper from '@/utils/pageHelper';

export async function getData(payload) {
  return $$.post('http://cdb-tst.earth.xpaas.lenovo.com/account/loginLog/page', payload).then(resp => {
    return PageHelper.resFormat(resp);
  })
}