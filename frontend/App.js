// StAuth10244: I Mahtabin Tushi, 000952184 certify that  this material is my original work. 
// No other person's work has been used without due acknowledgement. I have not made my work available 
// to anyone else.

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  Text,
  TouchableOpacity
} from 'react-native';

import ExpenseForm from './components/ExpenseForm';
import ExpenseItem from './components/ExpenseItem';
import api from './services/api';

export default function App() {
  // State to store all expenses fetched from backend
  const [expenses, setExpenses] = useState([]);

  /**
   * Fetch all expenses from backend API
   * Updates the local state to reflect latest data
   */
  const fetchExpenses = async () => {
    try {
      const response = await api.get('/');
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch expenses');
    }
  };

  /**
   * Add a new expense to backend
   * Then refresh the list to keep UI in sync
   */
  const addExpense = async (expense) => {
    try {
      await api.post('/', expense);
      await fetchExpenses();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add expense');
    }
  };

  /**
   * Update an existing expense by ID
   */
  const updateExpense = async (id, updatedExpense) => {
    try {
      await api.put(`/${id}`, updatedExpense);
      await fetchExpenses();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update expense');
    }
  };

  /**
   * Delete a single expense by ID
   */
  const deleteExpense = async (id) => {
    try {
      await api.delete(`/${id}`);
      await fetchExpenses();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to delete expense');
    }
  };

  /**
   * Delete all expenses from database
   */
  const deleteAllExpenses = async () => {
    try {
      await api.delete('/');
      await fetchExpenses();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to delete all expenses');
    }
  };

  /**
   * Replace current data with predefined sample data
   * Uses PUT to overwrite the entire collection
   */
  const resetWithSampleData = async () => {
  const sample = [
    { 
      title: 'Coffee', 
      amount: 3.5, 
      category: 'Food', 
      date: '2023-10-10',
      description: 'Morning coffee at Tim Hortons'
    },
    { 
      title: 'Bus Ticket', 
      amount: 2.5, 
      category: 'Transport', 
      date: '2023-10-11',
      description: 'Daily commute'
    },
    { 
      title: 'Gym Membership', 
      amount: 20.0, 
      category: 'Health', 
      date: '2023-10-12',
      description: 'Monthly gym fee'
    }
  ];

    try {
      await api.put('/', sample);
      await fetchExpenses();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to reset collection');
    }
  };

  /**
   * Load expenses once when app starts
   */
  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <View style={styles.container}>
      {/* App Title */}
      <Text style={styles.title}>💰 Expense Tracker</Text>

      {/* Expense Input Form */}
      <View style={styles.card}>
        <ExpenseForm addExpense={addExpense} />
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.deleteBtn} onPress={deleteAllExpenses}>
          <Text style={styles.btnText}>Delete All</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetBtn} onPress={resetWithSampleData}>
          <Text style={styles.btnText}>Reset Data</Text>
        </TouchableOpacity>
      </View>

      {/* Expense List */}
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExpenseItem
            item={item}
            updateExpense={updateExpense}
            deleteExpense={deleteExpense}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}

        // Display message when no data exists
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No expenses found. Add a new one above.
          </Text>
        }
      />
    </View>
  );
}

// Styles for UI layout 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFB'
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#111827'
  },

  // Card container for form
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3
  },

  // Row for action buttons
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },

  // Delete all button style
  deleteBtn: {
    backgroundColor: '#EF4444',
    padding: 12,
    borderRadius: 10,
    flex: 0.48,
    alignItems: 'center'
  },

  // Reset sample data button style
  resetBtn: {
    backgroundColor: '#4F46E5',
    padding: 12,
    borderRadius: 10,
    flex: 0.48,
    alignItems: 'center'
  },

  // Text inside buttons
  btnText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  // Empty list message style
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#6B7280'
  }
});