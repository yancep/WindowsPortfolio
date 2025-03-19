import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FormikValues } from 'formik';

interface TextEditorProps {
  form : FormikValues;
  formKey : string;
  label : string;
  defaultValue? : string;
  placeholder? : string;
}

export default function CustomTextEditor(
  {
	formKey,
	label,
	defaultValue = '',
	placeholder = '',
	form,
  } : TextEditorProps ) {
  const [editorContent, setEditorContent] = useState( defaultValue );
  
  useEffect( () => {
	// Sincroniza el valor inicial del editor con Formik
	if ( form.values[ formKey ] === undefined ) {
	  form.setFieldValue( formKey, defaultValue );
	}
  }, [formKey, defaultValue, form] );
  
  return (
	<div className="flex h-full w-full flex-col">
	  <span>{ label }</span>
	  <ReactQuill
		className="flex h-full w-full flex-col overflow-auto"
		modules={ modules }
		formats={ formats }
		theme="snow"
		value={ form.values[ formKey ] || editorContent }
		onChange={ ( content ) => {
		  setEditorContent( content );
		  form.setFieldValue( formKey, content );
		} }
		placeholder={ placeholder }
	  />
	</div>
  );
}

const modules = {
  toolbar : [
	[{ font : [] }],
	[{ header : [] }],
	['bold', 'italic', 'underline', 'strike'],
	[{ color : [] }, { background : [] }],
	[{ list : 'ordered' }, { list : 'bullet' }, { list : 'check' }],
	[{ align : [] }],
	[{ indent : '-1' }, { indent : '+1' }],
	['link', 'image', 'video'],
  ],
};

const formats = [
  'bold',
  'italic',
  'underline',
  'strike',
  'link',
  'image',
  'video',
  'formula',
  'header',
  'ordered',
  'bullet',
  'list',
  'check',
  'indent',
  'header',
  'color',
  'background',
  'font',
  'align',
  'clean',
];
