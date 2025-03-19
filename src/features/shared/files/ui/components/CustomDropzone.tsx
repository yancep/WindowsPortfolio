/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { MdClose } from 'react-icons/md';
import { FileIconRenderer } from './utils';

export const VisuallyHiddenInput = styled( 'input' )( {
  clip : 'rect(0 0 0 0)',
  clipPath : 'inset(50%)',
  height : 1,
  overflow : 'hidden',
  position : 'absolute',
  bottom : 0,
  left : 0,
  whiteSpace : 'nowrap',
  width : 1,
} );

const CustomDropzone = ( {
						   multiple,
						   handleSaveFiles,
						 } : {
  multiple : boolean;
  handleSaveFiles : ( files : any ) => void;
} ) => {
  const [filesToUpload, setFilesToUpload] = useState<File[]>( [] );
  
  const handleDrop = ( event : React.DragEvent<HTMLDivElement> ) => {
	event.preventDefault();
	const files = Array.from( event.dataTransfer.files );
	
	if ( multiple ) {
	  setFilesToUpload( ( prevFiles ) => [...prevFiles, ...files] );
	} else if ( files.length > 0 ) {
	  setFilesToUpload( [files[ 0 ]] );
	}
	handleSaveFiles( files );
  };
  
  const handleDragOver = ( event : React.DragEvent<HTMLDivElement> ) => {
	event.preventDefault();
	event.stopPropagation();
  };
  
  const removeFile = ( fileToRemove : File ) => {
	setFilesToUpload( ( prevFiles ) =>
	  prevFiles.filter( ( file ) => file !== fileToRemove ),
	);
  };
  
  return (
	<div
	  className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-400 p-4 text-center transition hover:bg-gray-100"
	  onDrop={ handleDrop }
	  onDragOver={ handleDragOver }
	  onClick={ () => document.getElementById( 'file-upload' )?.click() }
	>
	  { filesToUpload.length === 0 ? (
		<p className="text-gray-600">
		  { multiple
			? 'Arrastra y suelta los archivos o haz clic para seleccionar'
			: 'Arrastra y suelta el archivo o haz clic para seleccionar' }
		</p>
	  ) : (
		<div className="flex max-h-[150px] w-full justify-center overflow-x-auto p-2">
		  <div className="flex gap-4">
			{ filesToUpload.map( ( file, index ) => (
			  <div
				key={ index }
				className="relative flex h-[120px] w-[120px] flex-col items-center justify-center rounded border bg-white shadow-md"
			  >
				<div className="relative h-full w-full overflow-hidden rounded">
				  { file.type.startsWith( 'image/' ) ? (
					<img
					  alt={ file.name }
					  src={ URL.createObjectURL( file ) }
					  className="h-full w-full rounded object-cover"
					/>
				  ) : (
					<div className="flex h-full w-full items-center justify-center">
					  <FileIconRenderer ext={ file.type } name={ file.name }/>
					</div>
				  ) }
				</div>
				<button
				  onClick={ ( e ) => {
					e.stopPropagation();
					removeFile( file );
				  } }
				  className="absolute right-1 top-1 translate-x-[50%] translate-y-[-50%] rounded-full bg-white p-1 text-red-500 shadow"
				>
				  <MdClose className="h-5 w-5"/>
				</button>
			  </div>
			) ) }
		  </div>
		</div>
	  ) }
	  
	  <VisuallyHiddenInput
		id="file-upload"
		type="file"
		accept="application/pdf"
		onChange={ ( e ) => {
		  if ( e.target.files ) {
			const files = Array.from( e.target.files );
			if ( multiple ) {
			  setFilesToUpload( ( prevFiles ) => [...prevFiles, ...files] );
			} else if ( files.length > 0 ) {
			  setFilesToUpload( [files[ 0 ]] );
			}
			
			handleSaveFiles( files );
		  }
		} }
		multiple={ multiple }
	  />
	</div>
  );
};

export default CustomDropzone;
