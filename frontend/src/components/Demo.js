import React, { useEffect, useState } from 'react';
import {ContentState, convertFromHTML, convertToRaw, Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { selectSubmitted } from '../slices/EquationSlice';
import { useSelector } from 'react-redux'
import {StaticMathField} from 'react-mathquill';

// const useStyles = makeStyles({
//     editor: {
//         border: '1px solid #ccc',
//         cursor: 'text',
//         minHeight: 80,
//         padding: 10,
//     }
// });

export default function Demo() {
    const state = ContentState.createFromBlockArray(convertFromHTML('<StaticMathField>//sqrt</StaticMathField>'))
    // const [editorState, setEditorState] = useState(
    //     () => EditorState.createWithContent(state)
    // );
    // // useEffect = (() => {

    // // });
    // //const classes = useStyles();
    // const onChange = (editorState) => {
    //     setEditorState(editorState)
    //     // EditorState.createWithContent(convertFromRaw(JSON.parse(CONTENT)))
    // }
    // const handleKeyCommand = (command) => {
    //     const newState = RichUtils.handleKeyCommand(editorState, command);
    //     if (newState) {
    //         onChange(newState);
    //         return 'handled';
    //     }
    //     return 'not-handled';
    // }
    const result = useSelector(selectSubmitted);
    let rows = [];
    useEffect (() => {
    
    }, [result])

    result.forEach(element => {
        rows.push(<StaticMathField>{element}</StaticMathField>)
    });

    const handleClick = () => {
        // let content = editorState.getCurrentContent();
        // console.log(convertToRaw(content).blocks[0].text);

    }
    return (
        <>
            {/* <div style={
                {
                    border: '1px solid #ccc',
                    cursor: 'text',
                    minHeight: 500,
                    padding: 10,
                }
            }>
                <Editor
                    editorState={editorState}
                    onChange={onChange}
                    placeholder="Demo... Equations from AllRoundEditor will come below"
                />
            </div> */}
            {rows}
            <Button variant="contained" color="primary" component={Link} to="AllRoundEditor">AllRoundEditor</Button>
            <Button variant="contained" color="primary" onClick={handleClick}>Check</Button>
        </>
    )
}