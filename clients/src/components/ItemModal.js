import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
} from "reactstrap";
import { addItem } from "../action/itemAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ItemModal = (props) => {
  const [modal, setModal] = useState(false);
  const [itemname, setName] = useState("");

  const handleToggle = () => setModal(!modal);

  const handleChangeName = (e) => setName(e.target.value);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const newData = {
      itemname,
    };
    props.addItem(newData);
    handleToggle();
  };

  return (
    <Container>
      {props.isAutenticated ? (
        <Button
          color="primary"
          className="mt-2"
          style={{ marginBottom: "2rem" }}
          onClick={handleToggle}
          block
        >
          Add Item
        </Button>
      ) : null}

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add item To List"
                onChange={handleChangeName}
              />
              <Button color="primary" style={{ marginTop: "2rem" }} block>
                Add
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

ItemModal.propTypes = {
  addItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  isAutenticated: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
  isAutenticated: state.auth.isAutenticated,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
