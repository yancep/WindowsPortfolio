import React from 'react';
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";


function MemberStats() {
  return (
    <Card className='py-2 mt-6 mr-4 w-[59rem]'>
      <CardHeader className='pb-0 pt-2 px-4 flex-col items-start '>
        <p className="text-tiny uppercase font-bold">Participantes</p>
        <small className="text-default-500">Participantes</small>
      </CardHeader>
      <CardBody className='overflow-visible py-2 flex'>
        <Divider/>
      </CardBody>
    </Card>
  );
}



export default MemberStats;
