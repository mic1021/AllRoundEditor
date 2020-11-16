import React,{useEffect, useRef} from 'react';
import { EditableMathField } from 'react-mathquill';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectLatex, TYPE, CURSOR, selectShowDialogue, selectMathCmd, toggleDialogue } from '../../slices/EquationSlice';
import EquationSuggestionModal from './EquationSuggestionModal';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

//let modifying = false, firstWhileFinished = false, secondWhileFinished = false, binaryOperator = false, written = false, deleteCnt = 0, cur = 0;
let written = false, deleteCnt = 0, cur = 0;
let localMathField;

function EditableField(props) {
    const latex = useSelector(selectLatex);
    const mathCmd = useSelector(selectMathCmd);
    const showDialogue = useSelector(selectShowDialogue);
    const dispatch = useDispatch();
    const editableField = useRef();

    useEffect(() => {
        if (mathCmd !== '') {
            //dispatch(TYPE())
        }
    }, [showDialogue, mathCmd]);

    const handleChange = (mathField) => {
        localMathField = mathField;
        // Called everytime the input changes
        let nowCursor = editableField.current.getElementsByClassName('mq-hasCursor')[0];
        if (nowCursor !== undefined) {
            //if(selectedLatex!==""){
            //     if(modifying===false && isCommandInput(nowCursor)){
            //         modifying=true;
            //         mathField.cmd(selectedLatex);
            //         modifying=false;
            //         firstWhileFinished=false;
            //         secondWhileFinished=false;
            //         if(binaryOperator){
            //             mathField.keystroke('Right');
            //             binaryOperator=false;
            //         }
            //         selectedLatex="";
            //         dispatch(TYPE(mathField.latex()));
            //     }
            //     else if(modifying===true){
            //         let nowCursorElement = editableField.current.getElementsByClassName('mq-cursor')[0];
            //         while(!firstWhileFinished){
            //             if(isBinaryOperator(nowCursorElement.nextSibling) || isMqnonleaf(nowCursorElement.nextSibling)){
            //                 firstWhileFinished=true;
            //                 break;
            //             }
            //             mathField.keystroke('Left');
            //             nowCursorElement = editableField.current.getElementsByClassName('mq-cursor')[0];
            //         }
            //         while(!secondWhileFinished){
            //             mathField.keystroke('Left');
            //             nowCursorElement = editableField.current.getElementsByClassName('mq-cursor')[0];
            //             if(isCommandInput(nowCursorElement.nextSibling)) {
            //                 secondWhileFinished=true;
            //             }
            //             mathField.keystroke('Right');
            //             mathField.keystroke('Backspace');
            //             break;
            //         }
            //     }
            //}
            //else {
            if (!written) {
                written = true;
                try{
                    mathField.write('!@#');
                }
                catch(e){
                    console.log(e);
                    written=false;
                }
            }
            else {
                if (deleteCnt < 3) {
                    if (deleteCnt === 0) {
                        cur = mathField.latex().indexOf("!@#");
                    }
                    deleteCnt++;
                    mathField.keystroke('Backspace');
                }
                else {
                    written = false;
                    deleteCnt = 0;

                    dispatch(CURSOR(cur));
                    dispatch(TYPE(mathField.latex()));
                }
            }
            //}
        }
    }

    const updateCursorPosition = (e) => {
        if (localMathField !== undefined) {
            handleChange(localMathField);
        }
    }

    const handleKeyDown = (e) => {
        if (e.keyCode == '37' || e.keyCode == '39') { // left right
            handleChange(localMathField);
        } else if (e.keyCode == '220') {     // backslash
            dispatch(toggleDialogue(''));
        }
    }

    return (
        <div ref={editableField}>
            <EditableMathField
                latex={latex}
                onChange={handleChange}
                onClick={updateCursorPosition}
                onKeyDown={handleKeyDown}
            />
            {showDialogue && <EquationSuggestionModal></EquationSuggestionModal>}
        </div>
    )
}
// const isCommandInput = (nowCursor) => {
//     return nowCursor !== null && nowCursor.className.includes("mq-latex-command-input");
// }
// const isMqnonleaf = (nowCursor) => {
//     return nowCursor !== null && nowCursor.className.includes("mq-non-leaf");
// }

// const isBinaryOperator = (nowCursor) => {
//     return binaryOperator = (nowCursor !== null && nowCursor.className.includes("mq-binary-operator"));
// }

export default EditableField