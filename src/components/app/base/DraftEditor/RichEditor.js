import React, { Suspense } from "react";
import PropTypes from "prop-types";
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

RichEditor.propTypes = {
  setBody: PropTypes.func.isRequired,
  getSuggestions: PropTypes.func.isRequired,
  getTopicSuggestions: PropTypes.func.isRequired,
};

export default RichEditor;
