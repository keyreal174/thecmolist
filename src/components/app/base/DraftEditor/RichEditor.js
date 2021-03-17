import React, { Suspense } from "react";
const DraftEditor = React.lazy(() => import("./DraftEditor"));

const RichEditor = ({
  setBody,
  getSuggestions,
  getTopicSuggestions,
  isPersonVendor,
  setIsPersonVendor,
  toolbar,
  ...rest
}) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <DraftEditor
          setBody={setBody}
          getSuggestions={getSuggestions}
          getTopicSuggestions={getTopicSuggestions}
          isPersonVendor={isPersonVendor}
          setIsPersonVendor={() => setIsPersonVendor(false)}
          toolbar={toolbar}
          {...rest}
        />
      </Suspense>
    </div>
  );
};

export default RichEditor;
