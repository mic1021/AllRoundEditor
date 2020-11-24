import React,{useEffect, useRef} from 'react';
import { EditableMathField } from 'react-mathquill';
import { useSelector, useDispatch } from 'react-redux';
import { selectLatex, TYPE, CURSOR, selectShowDialogue, selectMathCmd, toggleDialogue, selectCursor, MATHCMD} from '../../slices/EquationSlice';
import EquationSuggestionModal from './EquationSuggestionModal';
import { makeStyles } from '@material-ui/core';

const placeHolder="press\\ backslash(\\backslash)\\ to\\ search\\ math\\ symbols";

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

let written = false, deleteCnt = 0, cur = 0;
let localMathField;

function EditableField(props) {
    const latex = useSelector(selectLatex);
    const mathCmd = useSelector(selectMathCmd);
    const showDialogue = useSelector(selectShowDialogue);
    const dispatch = useDispatch();
    const editableField = useRef();
    cur = useSelector(selectCursor);

    useEffect(() => {
        if (mathCmd !== '' && mathCmd !== undefined) {
            dispatch(TYPE(latex.substr(0,cur)+mathCmd+latex.substr(cur)));
            dispatch(MATHCMD(''));
        }
    }, [showDialogue, mathCmd,latex,dispatch]);

    const handleChange = (mathField) => {
        localMathField = mathField;
        let nowCursor = editableField.current.getElementsByClassName('mq-hasCursor')[0];
        if (mathField !== undefined && nowCursor !== undefined) {
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
                    let currentLatex=mathField.latex();
                    let idx = currentLatex.indexOf(placeHolder);
                    if(idx!=-1) currentLatex = currentLatex.substr(0,idx)+currentLatex.substr(idx+placeHolder.length);
                    dispatch(CURSOR(cur));
                    dispatch(TYPE(currentLatex));
                }
            }
        }
    }

    const updateCursorPosition = (e) => {
        if (localMathField !== undefined) {
            handleChange(localMathField);
        }
    }

    const handleKeyDown = (e) => {
        if (Number(e.keyCode)===37 || Number(e.keyCode) === 39) { // left right
            handleChange(localMathField);
        } else if (Number(e.keyCode) === 220) {     // backslash
            dispatch(toggleDialogue(''));
        }
    }

    return (
        <div ref={editableField}>
            <EditableMathField
                latex={latex==""?placeHolder:latex}
                onChange={handleChange}
                onClick={updateCursorPosition}
                onKeyDown={handleKeyDown}
            />
            {showDialogue && <EquationSuggestionModal></EquationSuggestionModal>}
        </div>
    )
}

export default EditableField