import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Col, Form, NavDropdown, Row } from "react-bootstrap";
import {
  AsyncTypeahead,
  Typeahead,
  TypeaheadMenu,
} from "react-bootstrap-typeahead";
import clsx from "clsx";
import "./AddVendors.scss";

const CategoryDropdown = ({ category, categoryList, categoryId }) => {
  return (
    <NavDropdown
      className="navbar-dropdown vendor-category-dropdown"
      title={category.name}
    >
      {categoryList.map((item, idx) => (
        <NavDropdown.Item
          key={idx}
          className={clsx(idx === categoryId && "filter-dropdown-item-enabled")}
        >
          {item.name}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
};

const PopularTool = ({ tool, onSelectTool }) => {
  return (
    <div
      className="vendor-category--popular-tools--tool"
      onClick={onSelectTool}
    >
      <div className="vendor-category--popular-tools--tool--icon">
        <img src={tool.icon} alt="tool" className="p-0" />
      </div>
      <p className="vendor-category--popular-tools--tool--name">{tool.name}</p>
    </div>
  );
};

const RenderVendorCategoryRow = ({
  id,
  cate,
  getSuggestions,
  updateVendors,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [myTools, setMyTools] = useState([]);
  const [options, setOptions] = useState([]);

  const handleSearch = async (query) => {
    setIsLoading(true);
    const data = await getSuggestions(query);
    const options = data.map((i, index) => ({
      id: index,
      slug: i.slug,
      name: i.name,
    }));

    setOptions(options);
    setIsLoading(false);
  };

  const onSelectTool = (tool, cate) => {
    setMyTools((value) =>
      [...(value || []), tool].filter(
        (t, index, self) =>
          index === self.findIndex((item) => item.name === t.name)
      )
    );
  };

  useEffect(() => {
    updateVendors([...myTools]);
  }, [myTools]);

  return (
    <Row className="mb-3 align-items-center">
      <Col md={4}>
        <CategoryDropdown category={cate} categoryList={[]} categoryId={id} />
      </Col>
      <Col md={4}>
        <AsyncTypeahead
          id="async-global-search"
          key={cate.name + id}
          isLoading={isLoading}
          labelKey="name"
          multiple
          minLength={0}
          onSearch={handleSearch}
          options={options}
          emptyLabel=""
          renderMenu={(results, menuProps) => {
            if (!results.length) {
              return null;
            }
            return (
              <TypeaheadMenu options={results} labelKey="name" {...menuProps} />
            );
          }}
          selected={myTools}
          onChange={(selectedOption) => {
            console.log(selectedOption);
            setMyTools(selectedOption);
          }}
          placeholder="Search & select tool(s)"
          renderMenuItemChildren={(option) => (
            <React.Fragment>
              <span>{option.name}</span>
            </React.Fragment>
          )}
        />
      </Col>
      <Col md={4}>
        <div className="vendor-category--popular-tools">
          {cate.tools.map((tool, ti) => (
            <PopularTool
              tool={tool}
              key={ti}
              onSelectTool={() => onSelectTool(tool, cate.name)}
            />
          ))}
        </div>
      </Col>
    </Row>
  );
};

const AddVendors = ({
  submitAfter,
  getVendorCategories,
  vendorCategories,
  getSuggestions,
  saveVendors,
}) => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    getVendorCategories();
  }, []);

  useEffect(() => {
    const vendorTemp = vendorCategories.map((cate) => {
      return {
        category: cate.name,
        vendors: [],
      };
    });
    setVendors(vendorTemp);
  }, [vendorCategories]);

  const updateVendors = (tools, name) => {
    const vendorTemp = vendors.map((temp) => {
      if (temp.category === name) {
        return {
          category: temp.category,
          vendors: tools,
        };
      }
      return temp;
    });
    setVendors(vendorTemp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveVendors(vendors);
    submitAfter && submitAfter();
  };

  return (
    <Form id="form-add-vendors" onSubmit={handleSubmit}>
      {vendorCategories.map((cate, i) => (
        <RenderVendorCategoryRow
          key={i}
          id={i}
          cate={cate}
          getSuggestions={getSuggestions}
          updateVendors={(tools) => updateVendors(tools, cate.name)}
        />
      ))}
    </Form>
  );
};

const mapState = (state) => {
  return {
    vendorCategories: state.vendorsModel.vendorCategories,
    suggestions: state.suggestionsModel.suggestions,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getVendorCategories: dispatch.vendorsModel.getVendorCategories,
    getSuggestions: dispatch.suggestionsModel.getSuggestions,
    saveVendors: dispatch.contentModel.saveVendors,
  };
};

export default connect(mapState, mapDispatch)(AddVendors);
