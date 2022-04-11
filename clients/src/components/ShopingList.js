import React, { useEffect, useState } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../App.css";
import { getItems, deleteItem, clearList } from "../action/itemAction";
import Skeleton from "@material-ui/lab/Skeleton";

const ShopingList = (props) => {
  const list = props.item;
  const onDeleteClick = (id) => {
    props.deleteItem(id);
  };
  useEffect(() => {
    props.getItems();
  }, [props.isAutenticated]);
  console.log(props.itemloading);

  function skel() {
    return (
      <>
        <ListGroupItem>
          <Skeleton animation="wave" />
        </ListGroupItem>
        <ListGroupItem>
          <Skeleton animation="wave" />
        </ListGroupItem>
        <ListGroupItem>
          <Skeleton animation="wave" />
        </ListGroupItem>
        <ListGroupItem>
          <Skeleton animation="wave" />
        </ListGroupItem>
        <ListGroupItem>
          <Skeleton animation="wave" />
        </ListGroupItem>
        <ListGroupItem>
          <Skeleton animation="wave" />
        </ListGroupItem>
      </>
    );
  }
  return (
    <>
      <Container>
        {props.isAutenticated ? (
          <ListGroup>
            <TransitionGroup className="shopping-list">
              {list.map((item) => (
                <CSSTransition key={item._id} timeout={500} classNames="fade">
                  <ListGroupItem key={item._id}>
                    {item.itemname}
                    <Button
                      className="remove-btn"
                      color="danger"
                      className="float-right bg-white text-danger"
                      size="sm"
                      onClick={() => {
                        onDeleteClick(item._id);
                      }}
                    >
                      Remove
                    </Button>
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
        ) : (
          <div class="p-3 mb-2 bg-danger  text-white text-center">
            Log In First To Create List
          </div>
        )}
        {props.itemloading && props.isAutenticated ? skel() : ""}
      </Container>
    </>
  );
};

ShopingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  isAutenticated: PropTypes.object.isRequired,
  clearList: PropTypes.func.isRequired,
  itemloading: PropTypes.object.isRequired,
  itemLength: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item.items,
  itemloading: state.item.loading,
  itemLength: state.item.items.length,
  isAutenticated: state.auth.isAutenticated,
});

export default connect(mapStateToProps, { getItems, deleteItem, clearList })(
  ShopingList
);
