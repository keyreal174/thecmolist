import React, { Suspense } from "react";
import PropTypes from "prop-types";
const DraftEditor = React.lazy(() => import("./DraftEditor"));

const RichEditor = React.forwardRef(
  (
    {
      getSuggestions,
      getTopicSuggestions,
      handleChange,
      isPersonVendor,
      setBody,
      setIsPersonVendor,
      toolbar,
      placeholder,
      defaultValue,
      ...rest
    },
    ref
  ) => {
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
            ref={ref}
            placeholder={placeholder}
            defaultValue={defaultValue}
            {...rest}
          />
        </Suspense>
      </div>
    );
  }
);

RichEditor.propTypes = {
  setBody: PropTypes.func.isRequired,
};

export default RichEditor;
