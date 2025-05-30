
import { GetApplicationsApplicationIdMessages200ItemPromtsItem } from "@/api/core";
import TypedMessage from "../TypedMessage";
import { useCallback, useState } from "react";
import Button from "@/components/Button";
import Change from "../Change";

interface PromtProps {
  data: GetApplicationsApplicationIdMessages200ItemPromtsItem & { _id?: string };
  messageId: string;
  applicationId: string;
  showAnimation?: boolean;
}

const Promt: React.FC<PromtProps> = ({ data, messageId, applicationId, showAnimation }) => {
  const [isOpenedChanges, setIsOpenedChanges] = useState(false);

  const onClickToggleChanges = useCallback(() => {
    setIsOpenedChanges((prev) => !prev);
  }, []);

  return (
    <div className="mb-4">
      <TypedMessage
        content={data.result}
        showAnimation={showAnimation}
        className="mb-4"
      />
      <Button onClick={onClickToggleChanges}>Показать изменения</Button>
      {data._id && (
        <Change
          promtId={data._id}
          messageId={messageId}
          applicationId={applicationId}
          onClickToggleChanges={onClickToggleChanges}
          isOpenedChanges={isOpenedChanges}
        />
      )}
    </div>
  );
};

export default Promt;
