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

const PopularTool = ({ tool }) => {
  return (
    <div className="vendor-category--popular-tools--tool">
      <div className="vendor-category--popular-tools--tool--icon">
        <img src={tool.icon} alt="tool" className="p-0" />
      </div>
      <p className="vendor-category--popular-tools--tool--name">{tool.name}</p>
    </div>
  );
};

const AddVendors = ({
  handleClose,
  getVendorCategories,
  vendorCategories,
  getSuggestions,
  saveVendors,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [myTools, setMyTools] = useState({});
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getVendorCategories();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vendors = vendorCategories.map((cate) => {
      return {
        category: cate,
        vendors: myTools[cate.name] || [],
      };
    });
    await saveVendors(vendors);
    handleClose && handleClose();
  };

  return (
    <Form id="form-add-vendors" onSubmit={handleSubmit}>
      {vendorCategories.map((cate, i) => (
        <Row key={i} className="mb-3 align-items-center">
          <Col md={4}>
            <CategoryDropdown
              category={cate}
              categoryList={[]}
              categoryId={i}
            />
          </Col>
          <Col md={4}>
            <AsyncTypeahead
              id="async-global-search"
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
                  <TypeaheadMenu
                    options={results}
                    labelKey="name"
                    {...menuProps}
                  />
                );
              }}
              onChange={(selectedOption) => {
                console.log(selectedOption);
                setMyTools((value) => ({
                  ...value,
                  [cate.name]: selectedOption,
                }));
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
                <PopularTool tool={tool} key={ti} />
              ))}
            </div>
          </Col>
        </Row>
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
