import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useUserContext from '../shared/UserContext';

const OrderConfirmationModal = ({ visible, onClose, orderSummary, totalPrice, restaurant_id }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const { user } = useUserContext();

  useEffect(() => {
    let timer;
    if (isSuccess) {
      timer = setTimeout(() => {
        handleClose();
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isSuccess]);

  const handleOrderConfirmation = async () => {
    setIsProcessing(true);
    setIsSuccess(null);

    console.log(user);
    console.log(restaurant_id);

    const orderDetails = {
      customer_id: user.customerID,
      restaurant_id: restaurant_id,
      products: orderSummary,
      total_cost: totalPrice,
    };

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      const responseData = await response.json(); // Parse response body
      console.log('Response status:', response.status); // Log response status
      console.log('Response data:', responseData); // Log response data
      console.log('Order details:', orderDetails); // Log order details

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Error confirming order:', error);
      setIsSuccess(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const resetState = () => {
    setIsSuccess(null);
    setIsProcessing(false);
  };

  const renderOrderSummary = () => {
    return orderSummary.map(item => (
      <View key={item.id} style={styles.orderItem}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>x{item.quantity}</Text>
        <Text style={styles.itemPrice}>${(item.cost / 100 * item.quantity).toFixed(2)}</Text>
      </View>
    ));
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Order Confirmation</Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.orderSummary}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            {renderOrderSummary()}
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>TOTAL:</Text>
              <Text style={styles.totalAmount}>${totalPrice}</Text>
            </View>
          </View>
          {isSuccess === null ? (
            <TouchableOpacity
              style={[styles.confirmButton, isProcessing && styles.disabledButton]}
              disabled={isProcessing}
              onPress={handleOrderConfirmation}
            >
              {isProcessing ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.confirmButtonText}>Confirm Order</Text>
              )}
            </TouchableOpacity>
          ) : isSuccess ? (
            <View style={styles.successContainer}>
              <Ionicons name="checkmark-circle" size={50} color="green" />
              <Text style={styles.successMessage}>Thank you! Your order has been received.</Text>
            </View>
          ) : (
            <View style={styles.failureContainer}>
              <Ionicons name="close-circle" size={50} color="red" />
              <Text style={styles.failureMessage}>Your order was not processed successfully. Please try again.</Text>
              <TouchableOpacity
                style={styles.tryAgainButton}
                onPress={resetState}
              >
                <Text style={styles.tryAgainButtonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    position: 'relative',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  orderSummary: {
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  itemName: {
    fontSize: 14,
  },
  itemQuantity: {
    fontSize: 14,
  },
  itemPrice: {
    fontSize: 14,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
  confirmButtonText: {
    fontSize: 16,
    color: 'white',
  },
  successContainer: {
    alignItems: 'center',
  },
  successMessage: {
    marginTop: 10,
    fontSize: 16,
    color: 'green',
  },
  failureContainer: {
    alignItems: 'center',
  },
  failureMessage: {
    marginTop: 10,
    fontSize: 16,
    color: 'red',
  },
  tryAgainButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  tryAgainButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default OrderConfirmationModal;
