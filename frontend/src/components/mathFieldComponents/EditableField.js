import React from 'react';
import { addStyles , EditableMathField} from 'react-mathquill';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectLatex, TYPE } from '../../slices/EquationSlice';

//addStyles()

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

let modifying=false,firstWhileFinished=false,secondWhileFinished=false,selectedLatex="";

function Child(props) {
    const latex = useSelector(selectLatex);
    const dispatch = useDispatch();
}

class EditableField extends React.Component {

    constructor(props) {
        super(props);
        this.editableField=React.createRef();
    }

    render() {
        const {classes} = this.props;

        return (
            <div ref = {this.editableField}>
            <EditableMathField
            className={classes.root}
            latex={this.state.latex} // Initial latex value for the input field
            onChange={(mathField) => {
                // Called everytime the input changes
                //console.log(mathField.latex());
                let nowCursor = this.editableField.current.getElementsByClassName('mq-hasCursor')[0];
                if(modifying===false){
                    selectedLatex=this.showAutoCompleteAndSelect(mathField.latex())
                }
                if(nowCursor !== undefined){
                    if(selectedLatex!==""){
                        if(modifying===false && this.isCommandInput(nowCursor)){
                            modifying=true;
                            mathField.cmd(selectedLatex);
                            modifying=false;
                            firstWhileFinished=false;
                            secondWhileFinished=false;
                            selectedLatex="";
                            this.dispatch(TYPE(mathField.latex()))
                        }
                        else if(modifying===true){
                            let nowCursorElement = this.editableField.current.getElementsByClassName('mq-cursor')[0];
                            while(!firstWhileFinished){
                                while(!this.isMqnonleaf(nowCursorElement.nextSibling)) {
                                    mathField.keystroke('Left');
                                    nowCursorElement = this.editableField.current.getElementsByClassName('mq-cursor')[0];
                                }
                                firstWhileFinished=true;
                                break;
                            }
                            while(!secondWhileFinished){
                                mathField.keystroke('Left');
                                nowCursorElement = this.editableField.current.getElementsByClassName('mq-cursor')[0];
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
                        this.dispatch(TYPE(mathField.latex()))
                    }
                }
            }}
            />
            </div>
        )
    }

    showAutoCompleteAndSelect(latexField){
        //\로 시작하면 해당 글자에 해당하는 수식 후보군을 모달창에 보여주고, 사용자가 선택한 수식을 반환
        //사용자가 선택하지 않았을 경우(esc로 종료한 경우) 빈문자열을 반환
        return "\\frac";
    }
    isText(nowCursor){
        return  nowCursor!==null && nowCursor.nodeValue==="\\";
    }
    isCommandInput(nowCursor){
        return nowCursor!==null && nowCursor.className.includes("mq-latex-command-input");
    }
    isMqnonleaf(nowCursor){
        return nowCursor!==null && nowCursor.className.includes("mq-non-leaf");
    }
    getLatexField(nowCursor){
        return nowCursor!==null && nowCursor.innerText;
    }
}

export default withStyles(useStyles)(EditableField)