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
import {
  CategoryDropdown,
  RenderVendorCategoryRow,
} from "../AddVendors/AddVendors";
// import "./AddVendors.scss";

const AddSkills = ({
  submitAfter,
  getSkillCategories,
  skillCategories,
  getSuggestions,
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
        skills: [],
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

  const updateSkills = (tools, name) => {
    const skillTemp = skills.map((temp) => {
      if (temp.category === name) {
        return {
          category: temp.category,
          skills: tools,
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
    <Form id="form-add-vendors" onSubmit={handleSubmit}>
      <Row className="form-add-vendors--header">
        <Col md={4}>Category</Col>
        <Col md={4}>Expertise</Col>
      </Row>
      <div className="form-add-vendors--content">
        {categories.map((cate, i) => (
          <RenderVendorCategoryRow
            key={i}
            id={i}
            cate={cate}
            getSuggestions={getSuggestions}
            availableCategories={availableCategories}
            updateVendors={(tools) => updateSkills(tools, cate.name)}
            changeCategory={changeCategory}
            skill
          />
        ))}
        {availableCategories.length > 0 && (
          <RenderVendorCategoryRow
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
    getSuggestions: dispatch.suggestionsModel.getSuggestions,
    saveSkills: dispatch.contentModel.saveSkills,
  };
};

export default connect(mapState, mapDispatch)(AddSkills);
