import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, 
  Typography, 
  Paper, 
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Chip,
  Divider,
  Box
} from '@mui/material';
import { 
  Pending as PendingIcon, 
  LocalShipping as ShippedIcon, 
  CheckCircle as DeliveredIcon, 
  Cancel as CancelledIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import './Order.css';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { useAuth } from '../../contexts/AuthContext';




const Order = () => {
  const [groupedOrders, setGroupedOrders] = useState({
    recent: {},
    cancelled: {}
  });
  const [selectedTab, setSelectedTab] = useState('recent');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [productDetails, setProductDetails] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const {userId} = useAuth()
  const user_id = userId;

  useEffect(() => {
    fetchOrders();
    const statusProgressInterval = setInterval(progressOrderStatuses, 15000);
    return () => clearInterval(statusProgressInterval);
  }, []);

  const fetchOrders = async () => {
    try {
      // Fetch unique orders for the user
      const uniqueOrdersResponse = await axios.get(`${import.meta.env.VITE_API_URL}/order/by_userid/${user_id}`);
      
      // Create a map to store unique orders
      const uniqueOrders = {};
      const productPromises = [];

      // Group products by unique order_id
      uniqueOrdersResponse.data.forEach(order => {
        if (!uniqueOrders[order.order_id]) {
          uniqueOrders[order.order_id] = {
            details: [],
            status: order.order_status,
            created_at: order.created_at
          };
        }
        uniqueOrders[order.order_id].details.push(order);

        // Fetch product details for each order
        const productPromise = axios.get(`${import.meta.env.VITE_API_URL}/product/get_product/${order.product_id}`)
          .then(response => {
            setProductDetails(prevDetails => ({
              ...prevDetails,
              [order.product_id]: response.data
            }));
          })
          .catch(error => console.error(`Error fetching product ${order.product_id}:`, error));
        
        productPromises.push(productPromise);
      });

      // Wait for all product details to be fetched
      await Promise.all(productPromises);

      // Separate recent and cancelled orders
      const recentOrdersData = {};
      const cancelledOrdersData = {};

      Object.keys(uniqueOrders).forEach(orderId => {
        const order = uniqueOrders[orderId];
        if (order.status !== 'Cancelled') {
          recentOrdersData[orderId] = order;
        } else {
          cancelledOrdersData[orderId] = order;
        }
      });

      setGroupedOrders({
        recent: recentOrdersData,
        cancelled: cancelledOrdersData
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };


const progressOrderStatuses = async () => {
    try {
      const ordersToUpdate = [];
      const currentOrders = {...groupedOrders.recent};
  
      // Determine which orders need status update
      Object.entries(currentOrders).forEach(([orderId, orderData]) => {
        // Add a check to skip cancelled orders
        if (orderData.status === 'Cancelled') {
          return; // Skip this iteration if order is cancelled
        }
  
        const orderCreationTime = new Date(orderData.created_at);
        const currentTime = new Date();
        const timeDiff = currentTime - orderCreationTime;
  
        // Progress status based on time
        if (orderData.status === 'Pending' && timeDiff >= 30000) {
          ordersToUpdate.push({
            order_id: orderId,
            current_status: 'Pending',
            new_status: 'Shipped'
          });
        } else if (orderData.status === 'Shipped' && timeDiff >= 60000) {
          ordersToUpdate.push({
            order_id: orderId,
            current_status: 'Shipped',
            new_status: 'Delivered'
          });
        }
      });
  
      // Update statuses on backend
      for (const orderUpdate of ordersToUpdate) {
        await axios.put(`${import.meta.env.VITE_API_URL}/order/change_order_status`, {
          order_id: orderUpdate.order_id,
          order_status: orderUpdate.new_status
        });
      }
  
      // Refetch orders to reflect changes
      fetchOrders();
    } catch (error) {
      console.error('Error progressing order statuses:', error);
    }
  };

  const getStatusIcon = (status) => {
    const iconMap = {
      'Pending': <PendingIcon color="warning" />,
      'Shipped': <ShippedIcon color="primary" />,
      'Delivered': <DeliveredIcon color="success" />,
      'Cancelled': <CancelledIcon color="error" />
    };
    return iconMap[status];
  };

  const handleOrderDetails = (orderId) => {
    const order = selectedTab === 'recent' 
      ? groupedOrders.recent[orderId] 
      : groupedOrders.cancelled[orderId];
    
    setSelectedOrderDetails({
      orderId,
      ...order
    });
    setOpenModal(true);
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/order/change_order_status`, {
        order_id: orderId,
        order_status: 'Cancelled'
      });
      fetchOrders();
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  const calculateTotalPrice = (orderDetails) => {
    return orderDetails.reduce((total, item) => {
      const product = productDetails[item.product_id] || {};
      return total + (product.discounted_price || 0) * item.quantity;
    }, 0);
  };

  const renderOrderCard = (orderId, orderData) => {
    const totalProducts = orderData.details.length;
    const firstProduct = orderData.details[0];
    const productInfo = productDetails[firstProduct.product_id] || {};
    const totalPrice = calculateTotalPrice(orderData.details);

    return (
      
      <Card key={orderId} className="order-card" elevation={3}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              {productInfo.img_url ? (
                <CardMedia
                  component="img"
                  height="140"
                  image={productInfo.img_url}
                  alt={productInfo.product_name}
                  className="order-product-image"
                />
              ) : (
                <Box className="placeholder-image">No Image</Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">
                Order #{orderId}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(orderData.created_at).toLocaleString()}
              </Typography>
              <Chip 
                icon={getStatusIcon(orderData.status)} 
                label={orderData.status} 
                className={`status-chip ${orderData.status.toLowerCase()}`}
              />
              <Typography variant="body1" className="product-summary">
                {totalProducts} Product{totalProducts !== 1 ? 's' : ''} | 
                Total Quantity: {orderData.details.reduce((sum, item) => sum + item.quantity, 0)} |
                Total Price: ₹{totalPrice.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} className="order-actions">
              <Button 
                variant="outlined" 
                color="primary" 
                startIcon={<InfoIcon />}
                onClick={() => handleOrderDetails(orderId)}
              >
                View Details
              </Button>
              {selectedTab === 'recent' && (
                <Button 
                  variant="outlined" 
                  color="error"
                  onClick={() => handleCancelOrder(orderId)}
                >
                  Cancel Order
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
    );
  };

  const renderOrderDetailsModal = () => {
    if (!selectedOrderDetails) return null;

    return (
      <Dialog 
        open={openModal} 
        onClose={() => setOpenModal(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>Order #{selectedOrderDetails.orderId} Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {selectedOrderDetails.details.map((orderItem) => {
              const product = productDetails[orderItem.product_id] || {};
              return (
                <Grid item xs={12} key={orderItem.product_id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={3}>
                          {product.img_url ? (
                            <CardMedia
                              component="img"
                              height="140"
                              image={product.img_url}
                              alt={product.product_name}
                            />
                          ) : (
                            <Box className="placeholder-image">No Image</Box>
                          )}
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <Typography variant="h6">{product.product_name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {product.short_description}
                          </Typography>
                          <Divider sx={{ my: 1 }} />
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <Typography variant="body2">
                                <strong>Quantity:</strong> {orderItem.quantity}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Market Price:</strong> ₹{product.market_price}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2">
                                <strong>Discounted Price:</strong> ₹{product.discounted_price}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Subtotal:</strong> ₹{(product.discounted_price * orderItem.quantity).toFixed(2)}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h6">
                  Total Order Value: ₹{calculateTotalPrice(selectedOrderDetails.details).toFixed(2)}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <>
      <Header/>
    <Container className="order-management">
      <Typography variant="h4" className="page-title">
        My Orders
      </Typography>
      
      <Box className="tab-buttons">
        <Button 
          variant={selectedTab === 'recent' ? 'contained' : 'outlined'}
          onClick={() => setSelectedTab('recent')}
        >
          Recent Orders
        </Button>
        <Button 
          variant={selectedTab === 'cancelled' ? 'contained' : 'outlined'}
          onClick={() => setSelectedTab('cancelled')}
        >
          Cancelled Orders
        </Button>
      </Box>

      <Grid container spacing={3}>
        {selectedTab === 'recent'
          ? Object.entries(groupedOrders.recent || {}).map(([orderId, orderData]) => 
              renderOrderCard(orderId, orderData)
            )
          : Object.entries(groupedOrders.cancelled || {}).map(([orderId, orderData]) => 
              renderOrderCard(orderId, orderData)
            )
        }
      </Grid>

      {renderOrderDetailsModal()}
    </Container>
    <Footer/>
    </>
  );
};

export default Order;