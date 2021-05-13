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

const CategoryDropdown = ({
  category,
  categoryList,
  categoryId,
  changeCategory,
}) => {
  return (
    <NavDropdown
      className="navbar-dropdown vendor-category-dropdown"
      title={category?.name}
    >
      {categoryList.map((item, idx) => (
        <NavDropdown.Item key={idx} onClick={() => changeCategory(idx)}>
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
  availableCategories,
  changeCategory,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [myTools, setMyTools] = useState([]);
  const [options, setOptions] = useState([]);

  const handleSearch = async (query) => {
    setIsLoading(true);
    const data = await getSuggestions({ query: query, filter: "vendors" });
    const options = data.map((i, index) => ({
      id: index,
      slug: i.slug,
      name: i.name,
      needsInsert: i.needsInsert,
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

  const handleChangeCategory = (cid) => {
    changeCategory(cid, id);
  };

  useEffect(() => {
    updateVendors && updateVendors([...myTools]);
  }, [myTools]);

  return (
    <Row className="mb-3 align-items-center">
      <Col md={4}>
        <CategoryDropdown
          category={cate}
          categoryList={availableCategories}
          categoryId={id}
          changeCategory={handleChangeCategory}
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
              <TypeaheadMenu options={results} labelKey="name" {...menuProps} />
            );
          }}
          selected={myTools}
          onChange={(selectedOption) => {
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
          {cate &&
            cate.tools.map((tool, ti) => (
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
  const [categories, setCategories] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);

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
    const categoryTemp = vendorCategories.filter((_, i) => i < 3);
    setCategories(categoryTemp);
    setAvailableCategories(vendorCategories.filter((_, i) => i >= 3));
  }, [vendorCategories]);

  const changeCategory = (cid, oid) => {
    const cCategory = availableCategories[cid];
    const oCategory = categories[oid];

    setCategories((value) =>
      value.map((item, i) => {
        if (i === oid) {
          return cCategory;
        }
        return item;
      })
    );

    setAvailableCategories((value) =>
      value.map((item, i) => {
        if (i === cid) {
          return oCategory;
        }
        return item;
      })
    );
  };

  const addNewCategory = (cid, oid) => {
    const cCategory = availableCategories[cid];

    setCategories((value) => [...value, cCategory]);

    setAvailableCategories((value) => value.filter((_, i) => i !== cid));
  };

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
      {categories.map((cate, i) => (
        <RenderVendorCategoryRow
          key={i}
          id={i}
          cate={cate}
          getSuggestions={getSuggestions}
          updateVendors={(tools) => updateVendors(tools, cate.name)}
          availableCategories={availableCategories}
          changeCategory={changeCategory}
        />
      ))}
      {availableCategories.length > 0 && (
        <RenderVendorCategoryRow
          availableCategories={availableCategories}
          changeCategory={addNewCategory}
        />
      )}
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
