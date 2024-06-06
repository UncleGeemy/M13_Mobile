import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OrderConfirmationModal = ({ visible, onClose, orderSummary, totalPrice }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);

  const handleOrderConfirmation = () => {
    setIsProcessing(true);
    setIsSuccess(null);

    // Simulate an API call
    setTimeout(() => {
      // Simulate success or failure
      const success = Math.random() > 0.5;
      setIsProcessing(false);
      setIsSuccess(success);
    }, 2000);
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
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Order Confirmation</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
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
                <Text style={styles.confirmButtonText}>Processing Order...</Text>
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
});

export default OrderConfirmationModal;
