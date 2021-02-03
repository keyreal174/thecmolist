import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";
import Filter from "../base/Filter/Filter";
import RenderList from "./RenderList";

const Search = (props) => {
  const [filters, setFilters] = useState([]);
  const [modules, setModules] = useState(null);
  const [filterIdx, setFilterIdx] = useState(null);

  const changeFilter = (idx) => {
    setFilterIdx(idx);
  };

  useEffect(() => {
    props.fetchFullSearch();
  }, []);

  useEffect(() => {
    if (props.searchResult) {
      if (props.searchResult.filters) {
        const newFilters = props.searchResult.filters.map((element) => ({
          title: element.name,
          slug: element.filter,
          enabled: true,
        }));

        setFilters([...newFilters]);
      }

      if (props.searchResult.modules) {
        let newModules = {};
        props.searchResult.modules.forEach((item) => {
          newModules = Object.assign({}, newModules, {
            [item.filter]: item.data.map((data) => {
              return {
                header: {
                  ...data.header,
                  image: data.image,
                },
                headline: data.headline,
                articletext: data.articletext,
              };
            }),
          });
        });

        setModules({ ...newModules });
      }
    }
  }, [props.searchResult]);

  return (
    <Container className="height-100">
      <div className="wrapper">
        <Header />
        <div>
          <Filter
            className="mt-1"
            filterIdx={filterIdx}
            filters={filters}
            onChange={(idx) => changeFilter(idx)}
          />
          <div>{modules && <RenderList modules={modules} />}</div>
        </div>
      </div>
    </Container>
  );
};

const mapState = (state) => {
  return {
    searchResult: state.searchModel.searchResult,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchFullSearch: dispatch.searchModel.fetchFullSearch,
  };
};

export default connect(mapState, mapDispatch)(Search);
