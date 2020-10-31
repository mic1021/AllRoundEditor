import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import BottomToolbarBox from './BottomToolbarBox';
import { addStyles , EditableMathField} from 'react-mathquill';

addStyles()

export default class TextArea extends React.Component {
    render() {
        return(
            <Accordion>
                <AccordionSummary>
                    <EditableField></EditableField>
                </AccordionSummary>
                <AccordionDetails>
                    <BottomToolbarBox></BottomToolbarBox>
                </AccordionDetails>
            </Accordion>
        )
    }
}
let modifying=false,firstWhileFinished=false,secondWhileFinished=false,selectedLatex="";
class EditableField extends React.Component {
    constructor(props) {
      super(props)
   
      this.state = {
        latex: ''
      }
    }
   
    render() {
        var nowCursor = document.getElementsByClassName('mq-hasCursor')[0];
        
        return (
            <EditableMathField
            latex={this.state.latex} // Initial latex value for the input field
            onChange={(mathField) => {
                // Called everytime the input changes
                let nowCursor = document.getElementsByClassName('mq-hasCursor')[0];
                if(modifying==false){
                    selectedLatex=this.showAutoCompleteAndSelect(mathField.latex())
                }
                if(nowCursor != undefined){
                    if(selectedLatex!=""){
                        if(modifying==false && this.isCommandInput(nowCursor)){
                            modifying=true;
                            mathField.cmd(selectedLatex);
                            modifying=false;
                            firstWhileFinished=false;
                            secondWhileFinished=false;
                            this.setState({
                                latex:mathField.latex()
                            })
                        }
                        else if(modifying==true){
                            let nowCursorElement = document.getElementsByClassName('mq-cursor')[0];
                            while(!firstWhileFinished){
                                while(!this.isMqnonleaf(nowCursorElement.nextSibling)) {
                                    mathField.keystroke('Left');
                                    nowCursorElement = document.getElementsByClassName('mq-cursor')[0];
                                }
                                firstWhileFinished=true;
                                break;
                            }
                            while(!secondWhileFinished){
                                mathField.keystroke('Left');
                                nowCursorElement = document.getElementsByClassName('mq-cursor')[0];
                                if(this.isCommandInput(nowCursorElement.nextSibling)) {
                                    secondWhileFinished=true;
                                }
                                mathField.keystroke('Right');
                                mathField.keystroke('Backspace');
                                break;
                            }
                        }
                    }
                    else {
                        this.setState({
                            latex:mathField.latex()
                        })
                    }
                }
            }}
            />
        )
    }

    showAutoCompleteAndSelect(latexField){
        //\로 시작하면 해당 글자에 해당하는 수식 후보군을 모달창에 보여주고, 사용자가 선택한 수식을 반환
        //사용자가 선택하지 않았을 경우(esc로 종료한 경우) 빈문자열을 반환
        return "\\frac";
    }
    isText(nowCursor){
        return  nowCursor!=null && nowCursor.nodeValue=="\\";
    }
    isCommandInput(nowCursor){
        return nowCursor!=null && nowCursor.className.includes("mq-latex-command-input");
    }
    isMqnonleaf(nowCursor){
        return nowCursor!=null && nowCursor.className.includes("mq-non-leaf");
    }
    getLatexField(nowCursor){
        return nowCursor!=null && nowCursor.innerText;
    }
}