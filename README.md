# Expenses Tracker

A robust, offline-first Expenses Tracker mobile application built with React Native (Expo) and TypeScript.

## Features
- **Track Expenses**: Add, edit, and remove daily expenses.
- **Offline First**: Data is persisted locally using Async Storage.
- **Insights**: View total expenses and summaries (Income vs Expense).
- **Date Management**: Sort transactions by date.

## Application Structure
- **Screens**:
  - `HomeScreen`: Dashboard showing total balance, income/expense breakdown, and recent transactions.
  - `AddEditExpenseScreen`: Form to creating new expenses or editing existing ones.
- **State Management**:
  - `Zustand` store with `persist` middleware for Async Storage.
- **Navigation**:
  - `React Navigation` Native Stack.

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- Expo Go (on mobile) or Android/iOS Simulator

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```

### Usage
- To **Add** an expense, tap the "+" (FAB) button on the Home Screen.
- To **Edit** an expense, tap on any item in the list.
- To **Delete** an expense, open the edit screen and tap "Delete Expense".
