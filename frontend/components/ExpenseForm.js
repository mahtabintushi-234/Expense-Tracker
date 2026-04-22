// StAuth10244: I Mahtabin Tushi, 000952184 certify that this material is my original work.
// No other person's work has been used without due acknowledgement.
// I have not made my work available to anyone else.

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

/**
 * This component provides a form for users to input expense details.
 * It collects title, amount, category, date, and description,
 * then sends the data to the parent component using the addExpense function.
 */
const ExpenseForm = ({ addExpense }) => {

  // State variables to store user input for each field
  const [title, setTitle] = useState('');       
  const [amount, setAmount] = useState('');     
  const [category, setCategory] = useState(''); 
  const [date, setDate] = useState('');         
  const [description, setDescription] = useState(''); 

  /**
   * Triggered when the user presses the "Add Expense" button.
   * Validates input fields, formats the data, and sends it to the parent component.
   * Resets the form after successful submission.
   */
  const handleSubmit = () => {

    // Basic validation to ensure required fields are not empty
    if (title && amount && category && date) {

      // Create expense object and send it to parent component
      addExpense({
        title,
        amount: parseFloat(amount),
        category,
        date,
        description
      });

      // Clear form after submission
      setTitle('');
      setAmount('');
      setCategory('');
      setDate('');
      setDescription('');

    } else {
      // Show alert if validation fails
      Alert.alert('Validation Error', 'Please fill in all required fields');
    }
  };

  return (
    <View>

      {/* Input field for expense title */}
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      {/* Input field for expense amount (numeric input) */}
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />

      {/* Input field for expense category */}
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />

      {/* Input field for expense date */}
      <TextInput
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
        style={styles.input}
      />

      {/* Input field for optional expense description */}
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      {/* Submit button to add expense */}
      <Button title="Add Expense" onPress={handleSubmit} />
    </View>
  );
};

/**
 * Defines basic styling for form input fields.
 */
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5
  }
});

export default ExpenseForm;