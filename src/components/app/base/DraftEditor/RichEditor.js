import React, { Suspense } from "react";
import PropTypes from "prop-types";
const DraftEditor = React.lazy(() => import("./DraftEditor"));

const RichEditor = ({
  getSuggestions,
  getTopicSuggestions,
  handleChange,
  isPersonVendor,
  setBody,
  setIsPersonVendor,
  toolbar,
  ...rest
}) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <DraftEditor
          getSuggestions={getSuggestions}
          getTopicSuggestions={getTopicSuggestions}
          handleChange={handleChange}
          isPersonVendor={isPersonVendor}
          setBody={setBody}
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
