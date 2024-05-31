import { Link, useParams } from "react-router-dom";
import {
  Col,
  Row,
  Button,
  ListGroup,
  Image,
  Card,
  Container,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
} from "../../slices/ordersApiSlice";

// import { userApiSlice } from "../../slices/usersApiSlice";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId);

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order delivered");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  //   console.log(order);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" />
  ) : (
    <>
      <Container>
        <h1>Order: {order._id}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Destination</h2>
                <p>
                  <strong>Name: </strong> {order.user.name}
                </p>
                <p>
                  <strong>Email: </strong> {order.user.email}
                </p>
                <p>
                  <strong>Address: </strong>{" "}
                  {order.shippingAddress.emailAddress}
                </p>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not Delivered</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant="success">Paid on {order.PaidAt}</Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index} style={{ border: "none" }}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link
                          to={`/product/${item.product}`}
                          style={{ color: "#fff" }}
                        >
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} X {item.price}= ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Items:</Col>
                    <Col>${order.itemsPrice}</Col>
                  </Row>

                  <Row>
                    <Col>Shipping:</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>

                  <Row>
                    <Col>Tax:</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>

                  <Row>
                    <Col>Total:</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>

                {/*Pay order placeHolder  */}

                {/*mark as delivered placeHolder  */}
                {loadingDeliver && <Loader />}

                {userInfo && userInfo.isAdmin && !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverOrderHandler}
                    >
                      Mark as delivered
                    </Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrderScreen;
