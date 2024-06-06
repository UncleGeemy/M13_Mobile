import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OrderHistoryModal = ({ visible, order, onClose }) => {
  if (!order) return null;

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
            <Text style={styles.modalTitle}>{order.name}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalText}>Order Date:</Text>
          <Text style={styles.modalText}>Status: {order.status}</Text>
          <Text style={styles.modalText}>Courier:</Text>
          <View style={styles.modalItems}>
            {order.items.map((item, index) => (
              <View key={index} style={styles.itemRow}>
                <Text style={[styles.itemText, { flex: 2 }]}>{item.name}</Text>
                <Text style={[styles.itemText, { flex: 1, textAlign: 'center' }]}>x1</Text>
                <Text style={[styles.itemText, { flex: 1, textAlign: 'right' }]}>${item.price.toFixed(2)}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.modalTotal}>
            TOTAL: ${order.items.reduce((total, item) => total + item.price, 0).toFixed(2)}
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
