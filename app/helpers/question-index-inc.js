import { helper } from '@ember/component/helper';

export function questionIndexInc(params/*, hash*/) {
  return params[0] + 1;
}

export default helper(questionIndexInc);
