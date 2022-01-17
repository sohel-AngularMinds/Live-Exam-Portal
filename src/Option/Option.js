import React from 'react'
import RichTextEditorOption from '../RichTextEditor/RichTextEditorOption';


const Option = (props) => {
    let { id, optionNumber, type, remove, changeOptionData, changeOptionText, changerichTextEditor, changeRichOptionText, data, errorText } = props

    const ChangeOptionText = (refs, value) => {
        changeRichOptionText(value, optionNumber);
    }



    return (
        <div className="col-12 my-2">

            {data.richTextEditor ?
                <>
                    <div className="input-group">
                        <span className={`input-group-text align-baseline gap-2 ${type === 'MULTIPLE RESPONSE' ? 'checkbox' : 'radio'}`}>
                            <span className="">
                                <input
                                    className="form-check-input"
                                    type={type === 'MULTIPLE RESPONSE' ? 'checkbox' : 'radio'}
                                    name={type === 'MULTIPLE RESPONSE' ? `check${optionNumber + 1}` : 'isCorrect'}
                                    id={id}
                                    value={id}
                                    defaultChecked={data.isCorrect ? true : false}
                                    onChange={() => {
                                        changeOptionData(id, type)
                                    }}
                                />
                            </span>
                            <span className="mt-2">
                                <h6>Option {optionNumber + 1} </h6>
                            </span>
                        </span>
                    </div>
                    <div className="option-richTex">
                        <RichTextEditorOption
                            id={id}
                            data={data !== 'undefined' ? data.option : ''}
                            changeRichOptionText={ChangeOptionText}
                            className="option-richText"
                        />
                    </div>
                </>
                :
                <div className="input-group">
                    <span className={`input-group-text align-baseline gap-2 ${type === 'MULTIPLE RESPONSE' ? 'checkbox' : 'radio'}`}>
                        <span className="">
                            <input
                                className="form-check-input"
                                type={type === 'MULTIPLE RESPONSE' ? 'checkbox' : 'radio'}
                                name={type === 'MULTIPLE RESPONSE' ? `check${optionNumber + 1}` : 'isCorrect'}
                                id={id}
                                value={id}
                                defaultChecked={data.isCorrect ? true : false}
                                onChange={() => {
                                    changeOptionData(id, type)
                                }}
                            />
                        </span>
                        <span className="mt-2">
                            <h6>Option {optionNumber + 1} </h6>
                        </span>
                    </span>

                    <textarea
                        className="form-control"
                        aria-label="With textarea"
                        name="option"
                        defaultValue={data !== 'undefined' ? data.option : ''}
                        onChange={(e) => {
                            changeOptionText(e, id, optionNumber, 'ta');
                        }}
                    ></textarea>
                </div>
            }
            
            <div className="point d-inline-block">
                <span
                    className="form-text"
                    onClick={() => remove(id)}
                >
                    Remove Option
                </span>
                <span className="form-text"> | </span>

                <span
                    className="form-text"
                    onClick={() => {
                        changerichTextEditor(id, data.richTextEditor)
                    }}
                    id={optionNumber}
                >
                    {data.richTextEditor ? "Disable" : "Enable"} Rich Text Editor
                </span>
            </div>

            {
                errorText ?
                    <div className="form-text text-danger">
                        {errorText}
                    </div> : <div>&nbsp;&nbsp;<br /></div>
            }
        </div>
    )
}

export default Option