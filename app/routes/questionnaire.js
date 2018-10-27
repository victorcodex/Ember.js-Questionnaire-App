import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
    get_questionnaire : inject('questionnaire'), // inject questionnaire Service

    model (){
        return this.get('get_questionnaire');
    },

});