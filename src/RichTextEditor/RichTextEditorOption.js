import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.css'
import { useRef, useEffect } from 'react'


//-----------function start working from here

function RichTextEditorOption(props) {
  
  
  let { data, changeRichOptionText } = props;
  let reactQuilRef = useRef(null);

  
  function attachQuillRefs(text) {
    changeRichOptionText(reactQuilRef,text);
  }
  
  useEffect(() => {
    attachQuillRefs(`${data}`);
  }, [])


  return (    
    <div className="option-richText">      
      <ReactQuill
        theme={'snow'}
        defaultValue={data}
        ref={(el) => {
          reactQuilRef = el
        }}
        className="option-richText"
        
        placeholder="insert text here..."
        modules={RichTextEditorOption.modules}
        formats={RichTextEditorOption.formats}
        onChange={(value)=>attachQuillRefs(value)}
      />
    </div>
  )
}

RichTextEditorOption.modules = {
  toolbar: [
    ["bold", "italic", "code-block", "underline", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ["link", "image", "video"]
  ],
};

RichTextEditorOption.formats = [
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

export default RichTextEditorOption

// {/* <div>{parse(text)}</div> */}
// <div>{
//   console.log(tex ? tex.getContents().ops[0].insert : 'a')//for error format
// }</div>











































































// import React from 'react'
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { useState, useRef, useEffect } from 'react'
// import './style2.css';
// //-----------function start working from here

// function RichTextEditorOption(props) {
//   console.log(props);
//   const [text, setText] = useState('');
//   const [tex, setTex] = useState();
//   let reactQuilRef = useRef(null);


//   function attachQuillRefs() {
//     if (typeof reactQuilRef.getEditor !== 'function') return;
//     {
//       let editor = reactQuilRef.getEditor();
//       setTex(reactQuilRef.makeUnprivilegedEditor(editor));
//     }

//   }

//   // quilRef= reactQuilRef.makeUnprivilegedEditor(reactQuilRef.getEditor())
//   // console.log(quilRef)

//   // console.log(tex?tex.getText():'a');  



//   //component did mount
//   useEffect(() => {
//     attachQuillRefs();
//   }, [])

//   //component did update
//   useEffect(() => {
//     attachQuillRefs();
//   }, [reactQuilRef])


//   return (    
//     <div>      
//       <ReactQuill
//         theme={'snow'}
//         defaultValue={text}
//         ref={(el) => {
//           reactQuilRef = el
//         }}
//         placeholder="insert text here..."
//         modules={RichTextEditorOption.modules}
//         formats={RichTextEditorOption.formats}
//         onChange={(value) => { setText(value) }}
//       />
//     </div>
//   )
// }

// RichTextEditorOption.modules = {
//   toolbar: [
//     ["bold", "italic", "code-block", "underline", "blockquote"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     [{ size: ['small', false, 'large', 'huge'] }],
//     [{ 'color': [] }, { 'background': [] }],
//     [{ 'align': [] }],
//     ["link", "image", "video"]
//   ],
// };

// RichTextEditorOption.formats = [
//   "bold",
//   "italic",
//   "code-block",
//   "underline",
//   "blockquote",
//   "list",
//   "bullet",
//   "size",
//   "color",
//   "background",
//   "align",
//   "link",
//   "image",
//   "video",
// ]

// export default RichTextEditorOption

// // {/* <div>{parse(text)}</div> */}
// // <div>{
// //   console.log(tex ? tex.getContents().ops[0].insert : 'a')//for error format
// // }</div>