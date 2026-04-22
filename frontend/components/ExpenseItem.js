// StAuth10244: I Mahtabin Tushi, 000952184 certify that this material is my original work.
// No other person's work has been used without due acknowledgement.
// I have not made my work available to anyone else.

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

/**
 * This component displays a single expense item in a list.
 * It shows all expense details and provides options to update or delete the item.
 */
const ExpenseItem = ({ item, updateExpense, deleteExpense }) => {

  /**
   * Performs a simple update operation by modifying the title of the expense.
   */
  const handleQuickUpdate = () => {

    const updated = {
      title: item.title + ' (updated)',
      amount: item.amount,
      category: item.category,
      date: item.date,
      description: item.description 
    };

    updateExpense(item.id, updated);
  };

  return (
    <View style={styles.item}>

      {/* Display expense details */}
      <Text style={styles.text}>
        {item.title} - ${item.amount} - {item.category} - {item.date}
      </Text>

      {/* Optional description field display */}
      {item.description ? (
        <Text style={styles.text}>
          Description: {item.description}
        </Text>
      ) : null}

      {/* Action buttons */}
      <View style={styles.buttons}>
        <Button title="Update" onPress={handleQuickUpdate} />
        <Button title="Delete" onPress={() => deleteExpense(item.id)} />
      </View>
    </View>
  );
};

/**
 * Defines styling for each expense item in the list.
 */
const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  text: {
    marginBottom: 5
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default ExpenseItem;