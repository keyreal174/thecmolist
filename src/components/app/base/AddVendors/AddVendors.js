import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import {
  Button,
  Col,
  Dropdown,
  Form,
  FormControl,
  NavDropdown,
  Row,
} from "react-bootstrap";
import {
  AsyncTypeahead,
  Typeahead,
  TypeaheadMenu,
} from "react-bootstrap-typeahead";
import clsx from "clsx";
import "./AddVendors.scss";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

const CategoryDropdown = ({
  category,
  categoryList,
  categoryId,
  changeCategory,
}) => {
  const dropref = useRef();
  const [value, setValue] = useState("");
  return (
    <div>
      <Dropdown className="navbar-dropdown vendor-category-dropdown">
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          {category && category.name ? "#" + category.name : ""}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <div className="px-3 mb-2 category-filter-text">
            <FormControl
              autoFocus
              className="px-3"
              placeholder="Type to filter..."
              onChange={(e) => setValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                  if (
                    dropref &&
                    dropref.current &&
                    dropref.current.children &&
                    dropref.current.children.length > 0
                  ) {
                    dropref.current.children[0].focus();
                  }
                }
              }}
              value={value}
            />
          </div>
          <div ref={dropref}>
            {categoryList
              .filter((item) =>
                item.name.toLowerCase().includes((value || "").toLowerCase())
              )
              .map((item, idx) => (
                <Dropdown.Item
                  key={idx}
                  eventKey={idx}
                  onClick={() => changeCategory(item)}
                >
                  <p className="category-dropdown--name"># {item.name}</p>
                  <p className="category-dropdown--description">
                    {item.description}
                  </p>
                </Dropdown.Item>
              ))}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
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
  skill,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [myTools, setMyTools] = useState([]);
  const [options, setOptions] = useState([]);
  const [toolSumarize, setToolSumarize] = useState([]);

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
      [
        ...(value || []),
        {
          ...tool,
          review: "",
        },
      ].filter(
        (t, index, self) =>
          index === self.findIndex((item) => item.name === t.name)
      )
    );
  };

  const handleChangeCategory = (citem) => {
    changeCategory(citem, id);
  };

  const onToolSumarize = (e, tool) => {
    const slug = tool.slug || tool.id;
    const temp = myTools.map((t) => {
      if (t.slug === slug || t.id === slug) {
        return {
          ...t,
          review: e.target.value,
        };
      }
      return t;
    });

    setMyTools(temp);
  };

  const onChangeSelctedOptions = (selectedOption) => {
    const sOption = selectedOption.map((item) => ({
      ...item,
      review: item.review || "",
    }));

    setMyTools(sOption);
  };

  useEffect(() => {
    updateVendors && updateVendors([...myTools]);
  }, [myTools]);

  return (
    <div className="mb-3">
      <Row className="align-items-center">
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
                <TypeaheadMenu
                  options={results}
                  labelKey="name"
                  {...menuProps}
                />
              );
            }}
            selected={myTools}
            onChange={(selectedOption) => {
              onChangeSelctedOptions(selectedOption);
            }}
            placeholder={
              skill ? "Summarize your experience" : "Search & select vendor(s)"
            }
            renderMenuItemChildren={(option) => (
              <React.Fragment>
                <span>{option.name}</span>
              </React.Fragment>
            )}
          />
        </Col>
        <Col md={4}>
          {!skill && (
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
          )}
        </Col>
      </Row>
      {myTools.map((tool, index) => (
        <Row key={index} className="mb-2 mytool-review">
          <Col md={4} sm={12}></Col>
          <Col md={6} sm={12}>
            <Form.Control
              as="textarea"
              className="profile--textarea vendor--profile--textarea fadeAndSlideElementInFast"
              rows="1"
              placeholder={`Why did you select ${tool.name}?`}
              onChange={(e) => onToolSumarize(e, tool)}
            />
          </Col>
        </Row>
      ))}
    </div>
  );
};

const AddVendors = ({
  submitAfter,
  getVendorCategories,
  vendorCategories,
  getSuggestions,
  saveVendors,
  categoryTitle,
}) => {
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    getVendorCategories();
  }, []);

  useEffect(() => {
    if (vendorCategories && vendorCategories.length > 0) {
      const vendorTemp = vendorCategories.map((cate) => {
        return {
          category: cate.name,
          vendors: [],
        };
      });
      setVendors(vendorTemp);
      let category = -1;
      if (categoryTitle)
        category = vendorCategories.findIndex(
          (item) => item.name === categoryTitle
        );
      const categoryTemp =
        category === -1
          ? vendorCategories.filter((_, i) => i < 5)
          : category !== -1 && category > 4
          ? [
              vendorCategories[category],
              ...vendorCategories.filter((_, i) => i < 4),
            ]
          : [
              vendorCategories[category],
              ...vendorCategories.filter((_, i) => i < 5 && i !== category),
            ];
      setCategories(categoryTemp);
      if (category !== -1 && category > 4) {
        setAvailableCategories(
          vendorCategories.filter((_, i) => i >= 4 && i !== category)
        );
      } else {
        setAvailableCategories(vendorCategories.filter((_, i) => i >= 5));
      }
    }
  }, [vendorCategories]);

  const changeCategory = (citem, oid) => {
    const cCategory = availableCategories.find(
      (item) => item.name === citem.name
    );
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
        if (item.name === citem.name) {
          return oCategory;
        }
        return item;
      })
    );
  };

  const addNewCategory = (cid, oid) => {
    const cCategory = availableCategories.find((c) => c.name === cid.name);

    setCategories((value) => [...value, cCategory]);

    setAvailableCategories((value) =>
      value.filter((c, i) => c.name !== cid.name)
    );
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
    <Form
      className="form-add-vendors"
      id="form-add-vendors"
      onSubmit={handleSubmit}
    >
      <Row className="form-add-vendors--header">
        <Col md={4}>Category</Col>
        <Col md={4}>My Vendors</Col>
        <Col md={4}>Popular Vendors</Col>
      </Row>
      <div className="form-add-vendors--content">
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
      </div>
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
