import { EVALUATION_STATE } from "@/src/features/programs/data/models/ProgramMemberEvaluationModel";
import React from "react";
import {
  EvaluatedStateIcon,
  NotEvaluatedStateIcon,
  PendingStateIcon
} from "@/src/components/Icons/states/CertificationStateIcons";

export const getCertificationIconByState = ( { state } : { state : EVALUATION_STATE } ) =>
  state === 'EVALUATED'
	? <EvaluatedStateIcon/>
	: state === 'PENDING'
	  ? <PendingStateIcon/>
	  : <NotEvaluatedStateIcon/>
