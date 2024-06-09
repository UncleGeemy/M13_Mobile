import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OrderHistoryModal = ({ visible, order, onClose }) => {
  if (!order) return null;

  const calculateTotal = () => {
    if (!order.products) return '0.00';
    const total = order.products.reduce((total, item) => total + (item.unit_cost * item.quantity), 0);
    return (total / 100).toFixed(2);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{order.restaurant_name}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalText}>Order Date: {order.order_date}</Text>
          <Text style={styles.modalText}>Status: {order.status}</Text>
          <Text style={styles.modalText}>Courier: {order.courier_name}</Text>
          <View style={styles.modalItems}>
            {order.products && order.products.map((item, index) => (
              <View key={index} style={styles.itemRow}>
                <Text style={[styles.itemText, { flex: 2 }]}>{item.product_name}</Text>
                <Text style={[styles.itemText, { flex: 1, textAlign: 'center' }]}>x{item.quantity}</Text>
                <Text style={[styles.itemText, { flex: 1, textAlign: 'right' }]}>${(item.unit_cost / 100).toFixed(2)}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.modalTotal}>
            TOTAL: ${calculateTotal()}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D35400',
  },
  modalText: {
    fontSize: 14,
    marginBottom: 5,
  },
  modalItems: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 10,
    paddingTop: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 14,
  },
  modalTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});

export default OrderHistoryModal;
