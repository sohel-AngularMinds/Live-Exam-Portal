import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.css'
import { useRef, useEffect } from 'react'


//-----------function start working from here

function RichTextEditor(props) {
  console.log(props);
  let { data, onChange } = props;
  let reactQuilRef = useRef(null);

  
  function attachQuillRefs() {
    onChange(reactQuilRef);
  }
  
  useEffect(() => {
    attachQuillRefs();
  }, [])

  return (    
    <div>      
      <ReactQuill
        theme={'snow'}
        defaultValue={data}
        ref={(el) => {
          reactQuilRef = el
        }}
        
        placeholder="insert text here..."
        modules={RichTextEditor.modules}
        formats={RichTextEditor.formats}
        onChange={()=>attachQuillRefs()}
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