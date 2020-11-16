import React,{useEffect, useRef} from 'react';
import { EditableMathField } from 'react-mathquill';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectLatex, TYPE, CURSOR, selectShowDialogue, selectMathCmd, toggleDialogue, selectCursor, MATHCMD} from '../../slices/EquationSlice';
import EquationSuggestionModal from './EquationSuggestionModal';

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
        if (mathCmd !== '' && mathCmd != undefined) {
            dispatch(TYPE(latex.substr(0,cur)+mathCmd+latex.substr(cur)));
            dispatch(MATHCMD(''));
        }
    }, [showDialogue, mathCmd]);

    const handleChange = (mathField) => {
        console.log(latex);
        localMathField = mathField;
        let nowCursor = editableField.current.getElementsByClassName('mq-hasCursor')[0];
        if (mathField !== undefined && nowCursor !== undefined) {
            if (!written) {
                written = true;
                mathField.write('!@#');
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

export default EditableField