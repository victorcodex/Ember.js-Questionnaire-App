import { helper } from '@ember/component/helper';

export function choiceIndentifier(params/*, hash*/) {
    if(params[0] && params[1]) {
        let concatenateParams = params[0] + '_' + params[1].replace(/ /g,'_');
        return concatenateParams;
    } else {
        return params;
    }
}

export default helper(choiceIndentifier);
