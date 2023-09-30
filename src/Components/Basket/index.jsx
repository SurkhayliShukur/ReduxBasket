import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Card } from "react-bootstrap"
import ListGroup from "react-bootstrap/ListGroup";
import {
  filterProduct,
  sortData,
  clearBasket,
  removeFromCart,
  increament,
  decrement
} from "../../slices/basketSlice";
import { Button } from "react-bootstrap";


const Basket = () => {
  const [sortBy, setSortBY] = useState("")
  const [search, setSearch] = useState("")
  const products = useSelector((state) => state.persistReducers.basket.basket);
  // const totalPrice = useSelector((state) => state.persistReducers.basket.basket )
  const dispatch = useDispatch();
  const filteredProducts = useSelector((state) => state.persistReducers.basket.filteredBasket)
  


  const searchProduct = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    dispatch(filterProduct(searchTerm));
  }
  const sortProduct = (e) => {
    const sortValue = e.target.value;
    setSortBY(sortValue)
    dispatch(sortData(sortValue))
  }
  return (
    <>
      <nav className="navBar" style={{ backgroundColor: "orange" }}>
        <button
          className="btn btn-danger text-white px-3"
          onClick={() => dispatch(clearBasket())}
        >
          Clear
        </button>

        <Link to="/" className="linkStyle">
          Home
        </Link>

        <select className="py-2 px-1 border rounded ms-2"
          value={sortBy} onChange={sortProduct}>
          <option value="title">Sort by Title</option>
          <option value="category">Sort by Category</option>
          <option value="price">Sort by Price</option>
          <option value="rating">Sort by Rating</option>
        </select>


        <input type="text" value={search} onChange={searchProduct} />

      </nav>
      <div className="d-flex justify-content-around align-items-center flex-wrap">
        {
          search === "" ? (products.map((item) => (
            <div className="m-3 px-4x" key={item.id}>
              <Card style={{
                width: "18rem",
                height: "40rem"
              }} className="card">
                <Card.Img src={item.images} style={{
                  width: "18rem",
                  height: "15rem",
                  objectFit: "cover"
                }} className="img"></Card.Img>
                <Card.Body>
                  <Card.Title>Title:{item.title}</Card.Title>
                  <Card.Text>
                    Desc:{item.description.slice(0, 20)}
                  </Card.Text>
                </Card.Body>

                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Price:{item.price}</ListGroup.Item>
                  <ListGroup.Item>
                    DisCount:{item.discountPercentage}
                  </ListGroup.Item>
                  <ListGroup.Item>Rating:{item.rating}</ListGroup.Item>
                  <ListGroup.Item>Brand:{item.brand}</ListGroup.Item>
                  <ListGroup.Item>Category:{item.category}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  <div className="d-flex justify-content-center align-items-center ms-5">
                  <Button
                      variant="danger"
                      className="me-2"
                      onClick={() => dispatch(removeFromCart(item))}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => dispatch(decrement(item))}
                    >
                      -
                    </Button>
                    <p className="mx-2 mt-3">{item.amount}</p>
                    <Button
                      variant="success"
                      onClick={() => dispatch(increament(item))}
                    >
                      +
                    </Button> 
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))) : filteredProducts.length === 0 ? (
            <p>No matching products found</p>
          ) : (
            filteredProducts.map((item) => (
              <div className="m-3 px-4x" key={item.id}>
                <Card style={{
                  width: "18rem",
                  height: "40rem"
                }} className="card">
                  <Card.Img src={item.images} style={{
                    width: "18rem",
                    height: "15rem",
                    objectFit: "cover"
                  }} className="img"></Card.Img>
                  <Card.Body>
                    <Card.Title>Title:{item.title}</Card.Title>
                    <Card.Text>
                      Desc:{item.description.slice(0, 20)}
                    </Card.Text>
                  </Card.Body>

                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>Price:{item.price}</ListGroup.Item>
                    <ListGroup.Item>
                      DisCount:{item.discountPercentage}
                    </ListGroup.Item>
                    <ListGroup.Item>Rating:{item.rating}</ListGroup.Item>
                    <ListGroup.Item>Brand:{item.brand}</ListGroup.Item>
                    <ListGroup.Item>Category:{item.category}</ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                  <div className="d-flex justify-content-center align-items-center ms-5">
                    <Button
                      variant="danger"
                      className="me-2"
                      onClick={() => dispatch(removeFromCart(item))}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => dispatch(decrement(item))}
                    >
                      -
                    </Button>
                    <p className="mx-2 mt-3">{item.amount}</p>
                    <Button
                      variant="success"
                      onClick={() => dispatch(increament(item))}
                    >
                      +
                    </Button>
                  </div>
                </Card.Body>
                </Card>
              </div>
            ))
          )
        }
      </div>
    </>
  )
}

export default Basket