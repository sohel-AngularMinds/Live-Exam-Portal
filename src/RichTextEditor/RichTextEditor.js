import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.css'
import { useRef, useEffect } from 'react'


//-----------function start working from here

function RichTextEditor(props) {
  

  let { data, onChange } = props;
  let reactQuilRef = useRef(null);

  
  function attachQuillRefs(text) {
    onChange(reactQuilRef,text);
  }
  
  useEffect(() => {
    attachQuillRefs(`${data}`);
  }, [])

  return (    
    <div className="question-richText">      
      <ReactQuill
        theme={'snow'}
        defaultValue={data}
        ref={(el) => {
          reactQuilRef = el
        }}
        className="question-richText"
        placeholder="insert text here..."
        modules={RichTextEditor.modules}
        formats={RichTextEditor.formats}
        onChange={(value) => attachQuillRefs(value)}
        onBlur={(value)=>attachQuillRefs(value)}
      />
    </div>
  )
}

RichTextEditor.modules = {
  toolbar: [
    ["bold", "italic", "code-block", "underline", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ["link", "image", "video"]
  ],
};

RichTextEditor.formats = [
  "bold",
  "italic",
  "code-block",
  "underline",
  "blockquote",
  "list",
  "bullet",
  "size",
  "color",
  "background",
  "align",
  "link",
  "image",
  "video",
]

export default RichTextEditor

// {/* <div>{parse(text)}</div> */}
// <div>{
//   console.log(tex ? tex.getContents().ops[0].insert : 'a')//for error format
// }</div>