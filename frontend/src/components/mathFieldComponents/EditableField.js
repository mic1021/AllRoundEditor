import React,{useRef} from 'react';
import { EditableMathField} from 'react-mathquill';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectLatex, TYPE, CURSOR} from '../../slices/EquationSlice';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

let modifying=false,firstWhileFinished=false,secondWhileFinished=false,selectedLatex="",binaryOperator=false,written=false,deleteCnt=0,cur=0;
let localMathField;

function EditableField(props){
    const latex = useSelector(selectLatex);
    const dispatch = useDispatch();
    const editableField = useRef();

    const handleChange = (mathField) => {
        localMathField = mathField;
        // Called everytime the input changes
        let nowCursor = editableField.current.getElementsByClassName('mq-hasCursor')[0];
        if(nowCursor !== undefined){
            if(modifying===false && nowCursor.innerText[0] === "\\"){
                selectedLatex=showAutoCompleteAndSelect(nowCursor.innerText);
            }   
            if(selectedLatex!==""){
                if(modifying===false && isCommandInput(nowCursor)){
                    modifying=true;
                    mathField.cmd(selectedLatex);
                    modifying=false;
                    firstWhileFinished=false;
                    secondWhileFinished=false;
                    if(binaryOperator){
                        mathField.keystroke('Right');
                        binaryOperator=false;
                    }
                    selectedLatex="";
                    dispatch(TYPE(mathField.latex()))
                }
                else if(modifying===true){
                    let nowCursorElement = editableField.current.getElementsByClassName('mq-cursor')[0];
                    while(!firstWhileFinished){
                        if(isBinaryOperator(nowCursorElement.nextSibling) || isMqnonleaf(nowCursorElement.nextSibling)){
                            firstWhileFinished=true;
                            break;
                        }
                        mathField.keystroke('Left');
                        nowCursorElement = editableField.current.getElementsByClassName('mq-cursor')[0];
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
                if(!written){
                    written=true;
                    mathField.write('!@#');
                }
                else{
                    if(deleteCnt<3){
                        if(deleteCnt===0) {
                            cur = mathField.latex().indexOf("!@#");
                        }
                        deleteCnt++;
                        mathField.keystroke('Backspace');
                    }
                    else{
                        written=false;
                        deleteCnt=0;
                        dispatch(CURSOR(cur));
                        dispatch(TYPE(mathField.latex()))
                    }
                }
            }
        }
    }

    const updateCursorPosition = (e) => {
        console.log(e);
        if(localMathField!==undefined) {
            handleChange(localMathField);
        }
    }

    return (
        <div ref={editableField}>
        <EditableMathField
            latex={latex}
            onChange={handleChange}
            onClick={updateCursorPosition}
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

const isBinaryOperator = (nowCursor) => {
    return binaryOperator = (nowCursor!==null && nowCursor.className.includes("mq-binary-operator"));
}

export default EditableField