import { helper } from '@ember/component/helper';

export function concatenateIndexHeadline(params/*, hash*/) {
  if(params[0] && params[1]) {
      return params[0] + ': ' + params[1];
  }else {
      return params
  }
}

export default helper(concatenateIndexHeadline);
