import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";
import Filter from "../base/Filter/Filter";
import RenderList from "./RenderList";
import "./search.css";

const Search = (props) => {
  const location = useLocation();
  const [filters, setFilters] = useState([]);
  const [modules, setModules] = useState(null);
  const [filterIdx, setFilterIdx] = useState(null);
  const [filter, setFilter] = useState(null);
  const [isFull, setIsFull] = useState(false);

  const changeFilter = (idx) => {
    setFilterIdx(idx);
  };

  const showMore = (filter) => {
    var index = filters.map((item) => item.slug).indexOf(filter);
    changeFilter(index);
    setFilter(filter);
    props.fetchRefinedSearch(filter);
  };

  const fetchMoreRefinedData = (filter) => {
    props.fetchRefinedSearch(filter);
  };

  useEffect(() => {
    const { query } = location.state;
    props.fetchFullSearch(query);
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
        setIsFull(true);
      }
    }
  }, [props.searchResult]);

  useEffect(() => {
    if (props.modules.length > 0) {
      let newModules = {};
      newModules = {
        [filter]: props.modules.map((data) => {
          return {
            header: {
              ...data.header,
              image: data.image,
            },
            headline: data.headline,
            articletext: data.articletext,
          };
        }),
      };

      setModules({ ...newModules });
      setIsFull(false);
    }
  }, [props.modules]);

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
          <div>
            {modules && (
              <RenderList
                modules={modules}
                filters={filters}
                showMore={showMore}
                moreData={props.moreData}
                isFull={isFull}
                fetchMoreRefinedData={fetchMoreRefinedData}
              />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

const mapState = (state) => {
  return {
    searchResult: state.searchModel.searchResult,
    modules: state.searchModel.modules,
    moreData: state.searchModel.moreData,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchFullSearch: dispatch.searchModel.fetchFullSearch,
    fetchRefinedSearch: dispatch.searchModel.fetchRefinedSearch,
  };
};

export default connect(mapState, mapDispatch)(Search);
