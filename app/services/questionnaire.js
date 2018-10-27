import Service from '@ember/service';
import $ from 'jquery';

export default Service.extend({

    questionnaires: null,
    preparedAnswersObj: null,

    init() {
        this._super(...arguments);
        this.preparedAnswersObj = [];
        let url = '/data/questionnaire.json'; // get questionnaire.json path
        return $.getJSON( url, () =>  {}) // return getJSON
            .done(() => {})
            .fail(() => {}) // Opps, getJSON has failed
            .always((data) =>  {
                if(data.questionnaire) {
                    this.prepareQuestionnaireAnswersNew(data.questionnaire.questions);
                    console.log(data.questionnaire);
                    return this.set('questionnaires', data.questionnaire); // set questionnaires with returned json data
                }
            });

    },

    prepareQuestionnaireAnswersNew(questions) {
        let getQuestionnairaQuestions = questions;
        for(let i = 0; i < getQuestionnairaQuestions.length; i++) {
            this.preparedAnswersObj.push(
                { // Needed params for Questionnaire Answers
                    headline: getQuestionnairaQuestions[i].headline,
                    identifier: getQuestionnairaQuestions[i].identifier,
                    question_type: getQuestionnairaQuestions[i].question_type,
                    required: getQuestionnairaQuestions[i].required,
                    answer: null
                }
            );
        }
    },

    sendToServer() {
        console.log(this.preparedAnswersObj);  // send Answers to Server for processing
    }

});
