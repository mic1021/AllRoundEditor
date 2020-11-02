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

function EditableField(props) {
    const latex = useSelector(selectLatex);
    const dispatch = useDispatch();
    //const {classes} = props;
    /*
    const showAutoCompleteAndSelect = (latexField) => {
        //\로 시작하면 해당 글자에 해당하는 수식 후보군을 모달창에 보여주고, 사용자가 선택한 수식을 반환
        //사용자가 선택하지 않았을 경우(esc로 종료한 경우) 빈문자열을 반환
        return "\\frac";
    }
    const isText = (nowCursor) => {
        return  nowCursor!==null && nowCursor.nodeValue==="\\";
    }
    const isCommandInput = (nowCursor) => {
        return nowCursor!==null && nowCursor.className.includes("mq-latex-command-input");
    }
    const isMqnonleaf = (nowCursor) => {
        return nowCursor!==null && nowCursor.className.includes("mq-non-leaf");
    }
    const getLatexField = (nowCursor) =>{
        return nowCursor!==null && nowCursor.innerText;
    }
    */

    const handleChange = (event) => {
        dispatch(TYPE(event.latex()));
    }

    return (
        <EditableMathField
            latex={latex}
            onChange={handleChange}
        >    
        </EditableMathField>
    )
}

export default withStyles(useStyles)(EditableField)