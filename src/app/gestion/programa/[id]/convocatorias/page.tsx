import ProgramConvocationView from "@/src/features/programs/ui/views/ProgramConvocationsView/ProgramConvocationView";

export default async function Page( { params } : { params : Promise<{ id : string }> } ) {
  const id = ( await params ).id;
  
  return <ProgramConvocationView id={ id }/>
}
