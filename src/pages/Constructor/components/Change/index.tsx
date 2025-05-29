import { useGetApplicationsApplicationIdMessagesMessageIdPromtsPromtIdChanges } from "@/api/core";
import TypedMessage from "../TypedMessage";
import { useEffect } from "react";

interface ChangeProps {
  promtId: string;
  messageId: string;
  applicationId: string;
}

const Change: React.FC<ChangeProps> = ({ promtId, messageId, applicationId }) => {
  const { data } = useGetApplicationsApplicationIdMessagesMessageIdPromtsPromtIdChanges(
    applicationId,
    messageId,
    promtId,
  );
  
  useEffect(() => {
    if (data) {
      console.log("Changes fetched:", data);
    }
  }, [data]);

  return (
    <div>
      Смотри консоль логов для изменений
    </div>
  );
};

export default Change;
