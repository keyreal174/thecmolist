import React from "react";
import {
  Button,
  Col,
  Container,
  Modal,
  NavDropdown,
  Row,
} from "react-bootstrap";
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

const AddVendors = ({ show, handleClose, categories }) => {
  return (
    <>
      <Modal
        className="modal vendor-category-modal"
        show={show}
        onHide={handleClose}
        size="lg"
      >
        <Modal.Header closeButton as="h4">
          <Container>
            <Row>
              <Col md={4}>Category</Col>
              <Col md={4}>My Tools</Col>
              <Col md={4}>Popular Tools</Col>
            </Row>
          </Container>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {categories.map((cate, i) => (
              <Row key={i} className="mb-3 align-items-center">
                <Col md={4}>
                  <CategoryDropdown
                    category={cate}
                    categoryList={categories}
                    categoryId={i}
                  />
                </Col>
                <Col md={4}></Col>
                <Col md={4}>
                  <div className="vendor-category--popular-tools">
                    {cate.tools.map((tool, ti) => (
                      <PopularTool tool={tool} key={ti} />
                    ))}
                  </div>
                </Col>
              </Row>
            ))}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-white modal-cancel-button"
            variant="outline-primary"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className="btn__homepage-blue modal-ok-button"
            variant="primary"
            onClick={handleClose}
          >
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddVendors;
