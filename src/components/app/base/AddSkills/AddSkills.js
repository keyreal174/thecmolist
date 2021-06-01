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
              .filter((item) => item.name.toLowerCase().includes(value))
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

const RenderSkillCategoryRow = ({
  id,
  cate,
  updateSkills,
  availableCategories,
  changeCategory,
  skill,
}) => {
  const [mySkill, setMySkill] = useState("");

  const handleChangeCategory = (citem) => {
    changeCategory(citem, id);
  };

  useEffect(() => {
    updateSkills && updateSkills(mySkill);
  }, [mySkill]);

  let placeholderText = "";
  if (cate && cate.description && cate.description.length > 0) {
    placeholderText = `Summarize your ${cate.description} expertise`;
  }
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
      <Col md={8}>
        <Form.Control
          as="textarea"
          className="skills-text-area"
          placeholder={placeholderText}
          rows={1}
          name="headline"
          onChange={(e) => {
            setMySkill(e.target.value);
          }}
          value={mySkill}
        />
      </Col>
    </Row>
  );
};

const AddSkills = ({
  submitAfter,
  getSkillCategories,
  skillCategories,
  saveSkills,
}) => {
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    getSkillCategories();
  }, []);

  useEffect(() => {
    const skillTemp = skillCategories.map((cate) => {
      return {
        category: cate.name,
        skill: "",
      };
    });
    setSkills(skillTemp);
    const categoryTemp = skillCategories.filter((_, i) => i < 5);
    setCategories(categoryTemp);
    setAvailableCategories(skillCategories.filter((_, i) => i >= 5));
  }, [skillCategories]);

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

  const updateSkills = (skill, name) => {
    const skillTemp = skills.map((temp) => {
      if (temp.category === name) {
        return {
          category: temp.category,
          skill: skill,
        };
      }
      return temp;
    });
    setSkills(skillTemp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveSkills(skills);
    submitAfter && submitAfter();
  };

  return (
    <Form
      className="form-add-vendors"
      id="form-add-skills"
      onSubmit={handleSubmit}
    >
      <Row className="form-add-vendors--header">
        <Col md={4}>Expertise</Col>
        <Col md={4}>Experience</Col>
      </Row>
      <div className="form-add-vendors--content">
        {categories.map((cate, i) => (
          <RenderSkillCategoryRow
            key={i}
            id={i}
            cate={cate}
            availableCategories={availableCategories}
            updateSkills={(skill) => updateSkills(skill, cate.name)}
            changeCategory={changeCategory}
            skill
          />
        ))}
        {availableCategories.length > 0 && (
          <RenderSkillCategoryRow
            availableCategories={availableCategories}
            changeCategory={addNewCategory}
            skill
          />
        )}
      </div>
    </Form>
  );
};

const mapState = (state) => {
  return {
    skillCategories: state.vendorsModel.skillCategories,
    suggestions: state.suggestionsModel.suggestions,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSkillCategories: dispatch.vendorsModel.getSkillCategories,
    saveSkills: dispatch.contentModel.saveSkills,
  };
};

export default connect(mapState, mapDispatch)(AddSkills);
