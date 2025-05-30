
import { useGetApplicationsApplicationIdMessagesMessageIdPromtsPromtIdChanges } from "@/api/core";
import ChangesModal from "../ChangesModal";
import { useState, useEffect } from "react";

interface ChangeProps {
  promtId: string;
  messageId: string;
  applicationId: string;

  isOpenedChanges: boolean;

  onClickToggleChanges: VoidFunction;
}

const Change: React.FC<ChangeProps> = ({ promtId, messageId, applicationId, isOpenedChanges, onClickToggleChanges }) => {

  const { data } = useGetApplicationsApplicationIdMessagesMessageIdPromtsPromtIdChanges(
    applicationId,
    messageId,
    promtId,
    {
      query: {
        enabled: Boolean(isOpenedChanges),
      }
    }
  );

  if (!isOpenedChanges) {
    return null
  }

  return (
    <ChangesModal 
      isOpen
      onClose={onClickToggleChanges}
      data={data}
    />
  );
};

export default Change;
