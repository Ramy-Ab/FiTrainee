import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import NameCustomComponent from "./NameCustomComponent ";
import { listUsers, deleteUser } from "../actions/userActions";
import Loader from "./Loader";
import Message from "./Message";
import {
  listProducts,
  deleteProduct,
  createProduct,
  listProductDetails,
  updateProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import FormProductEdit from "./FormProductEdit";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { Form, Modal } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Icon from "@material-ui/core/Icon";

export const ProductsList = ({ history, match }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDetails = useSelector((state) => state.productDetails);
  const {
    error: errorDetails,
    loading: loadingDetails,
    product,
  } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [showForm, setShowForm] = useState(false);

  const [productId, setProductId] = useState("");

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(listProducts());

      console.log("updated");
      // history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== Number(productId)) {
        dispatch(listProductDetails(productId));
      } else {
      }
    }

    console.log("useeffect 1");
  }, [dispatch, productId, history, successUpdate]);

  useEffect(() => {
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setDescription(product.description);
    console.log("rerender dispatch ");
  }, [product]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", productId);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/products/upload/",
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      setProductId(createdProduct._id);
      setOpen(true);
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  // let keyword = history.location.search

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
      console.log("useeffect:", productList["products"]);
    } else {
      history.push("/login");
    }
  }, [dispatch, successDelete, userInfo]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    dispatch(createProduct());
    setOpen(true);
  };

  const handleCloseChange = () => {
    setOpen(false);
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [show, setShow] = useState(false);

  const handleShowClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShowCloseDelete = () => {
    setShow(false);
    dispatch(deleteProduct(productId));
  };

  const columns = [
    {
      title: "ID",
      field: "_id",
    },

    {
      title: "Name",
      field: "username",
      render: (row) => <NameCustomComponent name={row.name} />,
    },
    {
      title: "Price",
      field: "price",
    },
    {
      title: "Left",
      field: "countInStock",
    },

    {
      title: "Preview",
      field: "image",
      render: (row) => <img src={row.image} style={{ height: "50px" }}></img>,
    },
  ];

  return (
    <div>
      <Modal show={show} onHide={handleShowClose} className="mt-5">
        <Modal.Header closeButton>
          <Modal.Title>
            Delete Product{" "}
            <i
              style={{ color: "#ff7676" }}
              class="fas fa-exclamation-triangle"
            ></i>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure , you want to delete this Product !
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShowClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleShowCloseDelete}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Button variant="fab" color="primary" mini onClick={handleClickOpen}>
            <Icon style={{ fontSize: 40 }} color="primary">
              add_circle
            </Icon>
          </Button>
          {/* <FormAddProduct/> */}
          {/* <Button variant='fab' color='primary' mini onClick={handleClickOpen}>
            <Icon style={{ fontSize: 40 }} color="primary">add_circle</Icon>

        </Button> */}
          <MaterialTable
            title="Material Table"
            title="All Products"
            data={productList["products"]}
            columns={columns}
            actions={[
              (rowData) => ({
                icon: "edit",
                tooltip: "Edit User",
                onClick: () => {
                  console.log(rowData._id);
                  setProductId(rowData._id);
                  setOpen(true);
                },
              }),
              (rowData) => ({
                icon: "delete",
                tooltip: "Delete User",
                onClick: () => {
                  setShow(true);
                  console.log("rowdata : ", rowData._id);
                  setProductId(rowData._id);
                  console.log("product id : ", productId);

                  //   if (
                  //     window.confirm(
                  //       "Are you sure you want to delete this Product?"
                  //     )
                  //   ) {
                  //     dispatch(deleteProduct(rowData._id));
                  //     console.log(rowData._id);
                  //   }
                },
                disabled: rowData.isAdmin == true,
              }),
            ]}
            options={{
              filtering: true,
              exportButton: true,
              actionsColumnIndex: -1,
              addRowPosition: "first",
            }}
          />
        </div>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {console.log("dialog open ", open)}
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          {/* <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="email"
                  fullWidth
                /> */}
          <FormContainer>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

            {loading ? (
              <Loader />
            ) : errorDetails ? (
              <Message variant="danger">{errorDetails}</Message>
            ) : (
              <Form>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>

                  <Form.File
                    id="image-file"
                    label="Choose File"
                    custom
                    onChange={uploadFileHandler}
                  ></Form.File>
                  {uploading && <Loader />}
                </Form.Group>

                <Form.Group controlId="brand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="countinstock">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter stock"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Form>
            )}
          </FormContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseChange} color="primary" variant="raised">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ProductsList;
