import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import clsx from "clsx";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";
import Filter from "../base/Filter/Filter";
import RenderList from "./RenderList";
import "./search.scss";

const Search = (props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [filters, setFilters] = useState([]);
  const [modules, setModules] = useState(null);
  const [filterIdx, setFilterIdx] = useState(null);
  const [filter, setFilter] = useState(null);
  const [isFull, setIsFull] = useState(false);
  const [query, setQuery] = useState("");

  const changeFilter = (idx) => {
    setFilterIdx(idx);
  };

  const showMore = (filter) => {
    var index = filters.map((item) => item.slug).indexOf(filter);
    changeFilter(index);
    setFilter(filter);
    props.fetchRefinedSearch({ query, filter, isReset: true });
  };

  const fetchMoreRefinedData = (filter) => {
    props.fetchRefinedSearch({ query, filter });
  };

  useEffect(() => {
    const query = location.state ? location.state.query : "";
    setQuery(query);
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
              const content = data && data.content;
              const { header, image, headline, contentarticletext } = content;
              return {
                contentId: data.content_id,
                header: {
                  ...header,
                  image,
                },
                headline,
                articletext: contentarticletext,
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
          const content = data && data.content;
          const { header, image, headline, contentarticletext } = content;
          return {
            contentId: data.contentId,
            header: {
              ...header,
              image: image,
            },
            headline,
            articletext: contentarticletext,
          };
        }),
      };

      setModules({ ...newModules });
      setIsFull(false);
    }
  }, [props.modules]);

  const handleToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <Container className="height-100">
      <div className="wrapper">
        <Header onToggle={handleToggle} />
        <div className={clsx("search--content", mobileMenuOpen && "open")}>
          <Filter
            className="mt-1"
            filterIdx={filterIdx}
            filters={filters}
            onChange={(idx) => {
              changeFilter(idx);
              showMore(filters[idx]["slug"]);
            }}
          />
          <div className="mt-3">
            {modules && (
              <RenderList
                connectUser={props.connectUser}
                changeReaction={props.changeReaction}
                disconnectUser={props.disconnectUser}
                fetchMoreRefinedData={fetchMoreRefinedData}
                filters={filters}
                invalidateFeed={props.invalidateFeed}
                isFull={isFull}
                localConnectedUsers={props.localConnectedUsers}
                modules={modules}
                moreData={props.moreData}
                reactions={props.reactions}
                showMore={showMore}
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
    localConnectedUsers: state.userModel.localConnectedUsers,
    modules: state.searchModel.modules,
    moreData: state.searchModel.moreData,
    reactions: state.reactionModel.reactions,
    searchResult: state.searchModel.searchResult,
  };
};

const mapDispatch = (dispatch) => {
  return {
    changeReaction: dispatch.reactionModel.changeReaction,
    connectUser: dispatch.userModel.connectUser,
    disconnectUser: dispatch.userModel.disconnectUser,
    fetchFullSearch: dispatch.searchModel.fetchFullSearch,
    fetchRefinedSearch: dispatch.searchModel.fetchRefinedSearch,
    invalidateFeed: dispatch.networkModel.invalidateFeed,
  };
};

export default connect(mapState, mapDispatch)(Search);
