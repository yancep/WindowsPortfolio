/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { CustomIconButton } from '@/src/components/buttons/CustomIconButton';
import DownloadIcon from '@/src/components/Icons/extra/DownloadIcon';

interface CustomDownloadButtonProps {
  setDataForPDF : ( data : Uint8Array ) => void;
  enabled : boolean;
  getDocument : () => Promise<Uint8Array | undefined>;
}

export default function DownloadDocumentButton( {
												  setDataForPDF,
												  enabled,
												  getDocument,
												} : CustomDownloadButtonProps ) {
  const [loading, setLoading] = useState( false );
  
  const downloadDocument = async () => {
	setLoading( true );
	const file = await getDocument();
	if ( file ) setDataForPDF( file );
  };
  
  return (
	<CustomIconButton
	  onPress={ downloadDocument }
	  icon={ <DownloadIcon/> }
	  info="Descargar anexo"
	  isLoading={ loading }
	  isDisabled={ !enabled }
	/>
  );
}
