
import { useGetApplicationsApplicationIdMessagesMessageIdPromtsPromtIdChanges } from "@/api/core";
import ChangesModal from "../ChangesModal";
import { useState, useEffect } from "react";

interface ChangeProps {
  promtId: string;
  messageId: string;
  applicationId: string;
}

const Change: React.FC<ChangeProps> = ({ promtId, messageId, applicationId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data } = useGetApplicationsApplicationIdMessagesMessageIdPromtsPromtIdChanges(
    applicationId,
    messageId,
    promtId,
  );
  
  useEffect(() => {
    if (data) {
      console.log("Changes fetched:", data);
      setIsModalOpen(true);
    }
  }, [data]);

  return (
    <ChangesModal 
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      data={data}
    />
  );
};

export default Change;
