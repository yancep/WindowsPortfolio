import React from 'react';
import { Card, CardBody, CardHeader } from "@heroui/react";

interface ChartsCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  cardClassNames?: string;
  headerClassNames?: string;
  bodyClassNames?: string;
}

function ChartsCard({
  title,
  subtitle,
  children,
  cardClassNames = '',
  headerClassNames = '',
  bodyClassNames = '',
}: ChartsCardProps) {
  return (
    <Card className={` ${cardClassNames}`}>
      <CardHeader className={` ${headerClassNames}`}>
        <p className="text-tiny font-bold uppercase">{title}</p>
        {subtitle && <small className="text-default-500">{subtitle}</small>}
      </CardHeader>
      <CardBody className={` ${bodyClassNames}`}>{children}</CardBody>
    </Card>
  );
}

export default ChartsCard;
