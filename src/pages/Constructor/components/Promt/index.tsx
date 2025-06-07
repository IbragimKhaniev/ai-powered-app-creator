
import { GetApplicationsApplicationIdMessages200ItemPromtsItem } from "@/api/core";
import TypedMessage from "../TypedMessage";
import { useCallback, useState } from "react";
import Button from "@/components/Button";
import Change from "../Change";
import PromtDetailsModal from "../PromtDetailsModal";

interface PromtProps {
  data: GetApplicationsApplicationIdMessages200ItemPromtsItem;
  messageId: string;
  applicationId: string;
  showAnimation?: boolean;
}

const Promt: React.FC<PromtProps> = ({ data, messageId, applicationId, showAnimation }) => {
  const [isOpenedChanges, setIsOpenedChanges] = useState(false);
  const [isOpenedDetails, setIsOpenedDetails] = useState(false);

  const onClickToggleChanges = useCallback(() => {
    setIsOpenedChanges((prev) => !prev);
  }, []);

  const onClickToggleDetails = useCallback(() => {
    setIsOpenedDetails((prev) => !prev);
  }, []);

  return (
    <div className="mb-4">
      <TypedMessage
        content={data.result}
        showAnimation={showAnimation}
        className="mb-4"
      />
      <div className="flex flex-col gap-2 mb-2">
        <div className="flex gap-2">
          <Button onClick={onClickToggleChanges}>Показать изменения</Button>
        </div>
        <div className="flex gap-2">
          <Button onClick={onClickToggleDetails} variant="outline">Показать детали</Button>
        </div>
      </div>
      
      {data.id && (
        <Change
          promtId={data.id}
          messageId={messageId}
          applicationId={applicationId}
          onClickToggleChanges={onClickToggleChanges}
          isOpenedChanges={isOpenedChanges}
        />
      )}
      
      <PromtDetailsModal
        isOpen={isOpenedDetails}
        onClose={() => setIsOpenedDetails(false)}
        data={data}
      />
    </div>
  );
};

export default Promt;
