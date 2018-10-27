import Controller from '@ember/controller';
import $ from 'jquery';
import { run } from '@ember/runloop';
import { inject } from '@ember/service';

export default Controller.extend({

    current_identifier_from_storage: '',
    current_question_index: '',
    get_questionnaire : inject('questionnaire'), // inject questionnaire Service
    questionsAnswerObjects : null,

    init() {
        this._super(...arguments);
        localStorage.clear();
        this.handleQuestionnaireFormInteractions();
        this.questionsAnswerObjects = [];
    },

    actions: {

        SendQuestionnaireAnswersToServer() {

            // Show/Hide Loader
            let loading = document.getElementById('loading'),
                container = document.getElementById('container'),
                success_container = document.getElementById('success-container');

            loading.style.display = 'block';

            setTimeout(() => {
                loading.style.display = 'none';
                container.style.display = 'none';
                success_container.style.display = 'flex';
            },1000);
            // Show/Hide Loader

            this.questionsAnswerObjects = this.get('get_questionnaire').preparedAnswersObj;

            let completedScanForTextValues = false;
            for(let i = 0; i < this.questionsAnswerObjects.length; i++) {
                if(this.questionsAnswerObjects[i].question_type === "text") {

                    // let's get this text question type value using the input id

                    /*
                     Added + 1 on the index for each identifier to make an input id, since h3 tag is using actual
                     identifier to represent each question for scrolling |
                     e.g original identifier = "list_12111755" - original Index 16
                     Index is now 17 after adding 1 to the 16 above
                     Now Text Input Id = list_1211175517 - i.e list_12111755 + 17 coerce to string
                    */

                    let formInputId = this.questionsAnswerObjects[i].identifier + (i+1);
                    let inputId = document.getElementById(formInputId);

                    // replace answer
                    this.questionsAnswerObjects[i].answer = inputId.value;
                    completedScanForTextValues = true;
                }
            }

            if(completedScanForTextValues) {
                this.get('get_questionnaire').sendToServer(); // send to Service for Server processing
            }

        }

    },

    handleQuestionnaireFormInteractions() {
        $(document).ready( ($) => {

            let input_field_tag = $('.input-field');
            this.current_identifier_from_storage = localStorage.getItem('current_identifier');
            let questionHeaderId = document.getElementById( this.current_identifier_from_storage );
            let questionIndex = input_field_tag.index( questionHeaderId );


            let $sections = input_field_tag,
                $bodyContainer = $('html, body'),
                $document = $(document),
                numSections = $sections.length,
                // currSection = questionIndex,
                isAnimating = false;

            // Animate to a specific index.
            let gotoSection = (index) => {
                if($sections.eq(index) && $sections.eq(index).offset())
                {
                    isAnimating = true;
                    $bodyContainer.animate({
                        scrollTop: $sections.eq(index).offset().top
                    }, 2000, () => {
                        isAnimating = false;
                    });
                }
            };

            // Find out next index and then animate.
            let handleNext = () => {

                let current_question_index_from_storage = localStorage.getItem('current_question_index');

                if(
                    current_question_index_from_storage === null ||
                    current_question_index_from_storage === undefined ||
                    current_question_index_from_storage === "NaN" ||
                    current_question_index_from_storage === ""
                ) {
                    localStorage.setItem('current_question_index', 0);
                    this.current_question_index = 0;
                } else {
                    this.current_question_index = parseInt(current_question_index_from_storage) + 1;
                }

                localStorage.setItem('current_question_index', this.current_question_index);

                this.current_identifier_from_storage = localStorage.getItem('current_identifier');

                questionIndex = this.current_question_index;

                // console.log(
                //     'current_identifier_from_storage ', this.current_identifier_from_storage,
                //     ' current_question_index ', this.current_question_index
                // );

                // this.current_question_index = localStorage.getItem('current_question_index');
                // console.log('current_question_index ', this.current_question_index, ' questionIndex ', questionIndex, 'questionHeaderId ', questionHeaderId);

                // console.log('Main currSection Next btn Index - ', questionIndex);
                if (!isAnimating && questionIndex < numSections ) {
                    let isPro = false;
                    for(let i=questionIndex; i< numSections ; i++)
                    {
                        if( $sections.eq(questionIndex) )
                            questionIndex++;
                        if( $sections.eq(questionIndex).css("display") !== "none" )
                        {
                            isPro = true;
                            break;
                        }
                    }
                    if(isPro)
                        gotoSection(questionIndex);
                }
            };

            let goToTop = () => {
                if (!isAnimating){ //  && currSection < numSections ) {
                    // currSection = 0;
                    gotoSection(questionIndex);
                }
            };

            // Find out previous index and then animate.
            let handlePrev = () => {
                if (!isAnimating && questionIndex > 0) {
                    let isPro = false;
                    for(let j=questionIndex; j > 0; j--)
                    {
                        questionIndex--;
                        if($sections.eq(questionIndex) &&  $sections.eq(questionIndex).css("display") !== "none" )
                        {
                            isPro = true;
                            break;
                        }
                    }
                    if(isPro) {
                        if(questionIndex === 0) {
                            localStorage.clear();
                            questionIndex = 0;
                            localStorage.setItem('current_question_index', 0);
                        } else {
                            if(questionIndex === -1 || questionIndex === -2) {
                                localStorage.setItem('current_question_index', 0);
                            } else {
                                let newQuestionIndex = questionIndex - 1;
                                localStorage.setItem('current_question_index', newQuestionIndex);
                            }
                        }
                        gotoSection(questionIndex);
                    }

                }
            };

            // Handle clicks.

            $('.next_field').click(() => {
                run(() => {
                    handleNext();
                });
            });

            $('.prev_field').click(() => {
                run(() => {
                    handlePrev();
                });
            });

            $('.top_field').click(() => {
                run(() => {
                    goToTop();
                });
            });
            // Handle keyboard input.
            $document.keyup((e) => {
                if (e.keyCode === 38) { handlePrev(); } // Up arrow.
                if (e.keyCode === 13) { handleNext();}
                if (e.keyCode === 40) { handleNext(); } // Down arrow.
            });

        });


    }

});