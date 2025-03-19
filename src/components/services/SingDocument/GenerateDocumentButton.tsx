/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { CustomIconButton } from '@/src/components/buttons/CustomIconButton';

interface CustomDownloadButtonProps {
  handleGenerate : () => Promise<void>;
  disabled : boolean;
}

export default function GenerateDocumentButton(
  {
	handleGenerate,
	disabled,
  } : CustomDownloadButtonProps ) {
  
  const [loading, setLoading] = useState( false );
  const changeLoading = () => setLoading( !loading );
  
  async function generateDocument() {
	changeLoading();
	await handleGenerate();
	changeLoading()
  }
  
  return (
	<CustomIconButton
	  isLoading={ loading }
	  isDisabled={ disabled }
	  onPress={ generateDocument }
	  icon={
		GenerateDocumentIcon
	  }
	  info="Generar anexo"
	/>
  );
}


const GenerateDocumentIcon = <svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
	d="M10 8.125C10.3452 8.125 10.625 8.40482 10.625 8.75V10.625H12.5C12.8452 10.625 13.125 10.9048 13.125 11.25C13.125 11.5952 12.8452 11.875 12.5 11.875H10.625V13.75C10.625 14.0952 10.3452 14.375 10 14.375C9.65482 14.375 9.375 14.0952 9.375 13.75V11.875H7.5C7.15482 11.875 6.875 11.5952 6.875 11.25C6.875 10.9048 7.15482 10.625 7.5 10.625H9.375V8.75C9.375 8.40482 9.65482 8.125 10 8.125Z"
	fill="#51596C"
  />
  <path
	d="M17.5 5.625V17.5C17.5 18.8807 16.3807 20 15 20H5C3.61929 20 2.5 18.8807 2.5 17.5V2.5C2.5 1.11929 3.61929 0 5 0H11.875L17.5 5.625ZM13.75 5.625C12.7145 5.625 11.875 4.78553 11.875 3.75V1.25H5C4.30964 1.25 3.75 1.80964 3.75 2.5V17.5C3.75 18.1904 4.30964 18.75 5 18.75H15C15.6904 18.75 16.25 18.1904 16.25 17.5V5.625H13.75Z"
	fill="#51596C"
  />
</svg>;