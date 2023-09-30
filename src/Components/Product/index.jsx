import { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { addToCart } from "../../slices/basketSlice";
import { Link } from "react-router-dom";

const Product = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortTitle, setSortTitle] = useState("");
  const filteredProduct = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    )
  });
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue)
  }
  const sortData = (e) => {
    const sortBy = e.target.value;
    const sortedData = [...filteredProduct];
    sortedData.sort((a, b) => {
      if (sortBy === "title" || sortBy === "category") {
        return a[sortBy].localCompare(b[sortBy])

      }
      else if (sortBy === "price" || sortBy === "rating") {
        return a[sortBy] - b[sortBy]
      }
      return 0;
    })
    setSortTitle(sortBy)
    setProducts(sortedData)
  }

  const getProduct = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products")
      if (res.status === 400) {
        alert("Wrong")
      }
      else {
        setProducts(res.data.products)
      }

    }
    catch (error) {
      alert(error.message)
    }
  }
  useEffect(() => {
    getProduct()
  }, [])
  const card = useSelector((state) => state.persistReducers.basket.basket)

  const isExistCard = (productId) => {
    return card.some((product) => product.id === productId)
  }

  return (
    <>
      <nav className="navBar" style={{ backgroundColor: "orange" }}>
        <Link to="/basket" className="linkStyle">
          Basket
        </Link>

        <select className="py-2 px-1 border rounded ms-2"
          value={sortTitle} onChange={sortData}>
          <option value="title">Sort by Title</option>
          <option value="category">Sort by Category</option>
          <option value="price">Sort by Price</option>
          <option value="rating">Sort by Rating</option>
        </select>


        <input type="text" value={search} onChange={handleSearch} />

      </nav>
      <div className="d-flex justify-content-around align-items-center flex-wrap">
        {
          filteredProduct.map((product) => {
            const isAlreadyCard = isExistCard(product.id)
            return (
              <div className="m-3 px-4" key={product.id}>
                <Card style={{
                  width: "18rem",
                  height: "40rem"
                }} className="card">
                  <Card.Img src={product.images[0]} style={{
                    width: "18rem",
                    height: "15rem",
                    objectFit: "cover"
                  }} className="img"></Card.Img>
                  <Card.Body>
                    <Card.Title>Title:{product.title}</Card.Title>
                    <Card.Text>
                      Desc:{product.description.slice(0, 20)}
                    </Card.Text>
                  </Card.Body>

                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>Price:{product.price}</ListGroup.Item>
                    <ListGroup.Item>
                      DisCount:{product.discountPercentage}
                    </ListGroup.Item>
                    <ListGroup.Item>Rating:{product.rating}</ListGroup.Item>
                    <ListGroup.Item>Brand:{product.brand}</ListGroup.Item>
                    <ListGroup.Item>Category:{product.category}</ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    <Button
                      onClick={() =>
                        dispatch(addToCart({
                          id: product.id,
                          price: product.price,
                          amount: product.amount,
                          images: product.images[0],
                          totalPrice: product.price,
                          description: product.description,
                          rating: product.rating,
                          brand: product.brand,
                          category: product.category,
                          discountPercentage: product.discountPercentage
                        }))}>
                      {isAlreadyCard ? "Added" : "AddToCard"}
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            )
          }

          )
        }
      </div>
    </>
  )
}

export default Product