import Component from '@ember/component';
import $ from 'jquery';
import { inject } from '@ember/service';

export default Component.extend({

    get_questionnaire : inject('questionnaire'), // inject questionnaire Service

    questionsAnswerObjects : null,

    actions: {

        getSingleChoiceObject(question, question_identifier, hasJump, selectedValueForJumpToDestination) {

            this.questionsAnswerObjects = this.get('get_questionnaire').preparedAnswersObj;

            for(let i = 0; i < this.questionsAnswerObjects.length; i++) {
                if(this.questionsAnswerObjects[i].identifier === question.identifier) {
                    // replace answer
                    this.questionsAnswerObjects[i].answer = selectedValueForJumpToDestination;
                }
            }

            console.log('this.questionsAnswerObjects ', this.questionsAnswerObjects);

            let JumpToDestinationId = '',
                questionHeaderId = '',
                questionIdentifier = '',
                input_field_tag = $('.input-field'),
                questionIndex = input_field_tag.index( questionHeaderId );

            // Get Jump Destination Id or No Jump
            if(hasJump.length > 0) {
                for (let i = 0; i < hasJump.length; i++) {
                    for(let ii = 0;  ii < hasJump[i].conditions.length; ii++) {
                        if(hasJump[i].conditions[ii].value === selectedValueForJumpToDestination) {
                            JumpToDestinationId = hasJump[i].destination.id;
                        }
                    }
                }
                questionIdentifier = JumpToDestinationId; // Identifier = jump to id index base on selection value
                questionHeaderId = document.getElementById( questionIdentifier );
                questionIndex = input_field_tag.index( questionHeaderId );
                localStorage.setItem('current_identifier', questionIdentifier);
                localStorage.setItem('current_question_index', Number(questionIndex));
                // console.log( "Index: " + questionIndex, ' - questionIdentifier ', questionIdentifier, ' - JumpToDestinationId ', JumpToDestinationId );
            } else {
                questionIdentifier = question_identifier; // Identifier = maintain normal id index
                questionHeaderId = document.getElementById( questionIdentifier );
                questionIndex = input_field_tag.index( questionHeaderId );
                localStorage.setItem('current_identifier', questionIdentifier);
                localStorage.setItem('current_question_index', questionIndex);
                // console.log("Index: " + questionIndex, ' questionIdentifier ', questionIdentifier, ' ', questionHeaderId);
            }

            // Get Jump Destination Id or No Jump

            let $sections = input_field_tag,
                $bodyContainer = $('html, body'),
                numSections = $sections.length,
                currSection = questionIndex,
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


            if (!isAnimating && currSection < numSections ) {
                let isPro = false;
                for(let i=currSection; i< numSections ; i++)
                {
                    if( $sections.eq(currSection) )
                        currSection++;
                    if( $sections.eq(currSection).css("display") !== "none" )
                    {
                        isPro = true;
                        break;
                    }
                }
                if(isPro)
                    gotoSection(currSection);
            }

            // Find out next index and then animate.


            // console.log('question ', question);
        },
    },
});
