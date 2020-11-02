import React,{useRef} from 'react';
import { EditableMathField} from 'react-mathquill';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectLatex, TYPE } from '../../slices/EquationSlice';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

let modifying=false,firstWhileFinished=false,secondWhileFinished=false,selectedLatex="";

function EditableField(props){
    const latex = useSelector(selectLatex);
    const dispatch = useDispatch();
    const editableField = useRef();
    const {classes} = props;

    const handleChange = (mathField) => {
        // Called everytime the input changes
        //console.log(mathField.latex());
        let nowCursor = editableField.current.getElementsByClassName('mq-hasCursor')[0];
        if(modifying===false){
            selectedLatex=showAutoCompleteAndSelect(mathField.latex())
        }
        if(nowCursor !== undefined){
            if(selectedLatex!==""){
                if(modifying===false && isCommandInput(nowCursor)){
                    modifying=true;
                    mathField.cmd(selectedLatex);
                    modifying=false;
                    firstWhileFinished=false;
                    secondWhileFinished=false;
                    selectedLatex="";
                    dispatch(TYPE(mathField.latex()))
                }
                else if(modifying===true){
                    let nowCursorElement = editableField.current.getElementsByClassName('mq-cursor')[0];
                    while(!firstWhileFinished){
                        while(!isMqnonleaf(nowCursorElement.nextSibling)) {
                            mathField.keystroke('Left');
                            nowCursorElement = editableField.current.getElementsByClassName('mq-cursor')[0];
                        }
                        firstWhileFinished=true;
                        break;
                    }
                    while(!secondWhileFinished){
                        mathField.keystroke('Left');
                        nowCursorElement = editableField.current.getElementsByClassName('mq-cursor')[0];
                        if(isCommandInput(nowCursorElement.nextSibling)) {
                            secondWhileFinished=true;
                        }
                        mathField.keystroke('Right');
                        mathField.keystroke('Backspace');
                        break;
                    }
                }
            }
            else {
                dispatch(TYPE(mathField.latex()))
            }
        }
    }

    return (
        <div ref={editableField}>
        <EditableMathField
            className={classes.root}
            latex={latex}
            onChange={handleChange}
        />
        </div>
    )
}
const showAutoCompleteAndSelect = (latexField) => {
    //\로 시작하면 해당 글자에 해당하는 수식 후보군을 모달창에 보여주고, 사용자가 선택한 수식을 반환
    //사용자가 선택하지 않았을 경우(esc로 종료한 경우) 빈문자열을 반환
    return "\\frac";
}
const isCommandInput = (nowCursor) => {
    return nowCursor!==null && nowCursor.className.includes("mq-latex-command-input");
}
const isMqnonleaf = (nowCursor) => {
    return nowCursor!==null && nowCursor.className.includes("mq-non-leaf");
}


export default withStyles(useStyles)(EditableField)