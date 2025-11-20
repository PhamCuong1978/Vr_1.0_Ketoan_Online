
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { 
  CompanyInfo, Transaction, Partner, Product, Account, 
  DataContextType, TransactionType 
} from '../types';
import { 
  INITIAL_COMPANY_INFO, MOCK_TRANSACTIONS, MOCK_PARTNERS, 
  MOCK_PRODUCTS, MOCK_ACCOUNTS 
} from '../constants';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(INITIAL_COMPANY_INFO);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [partners, setPartners] = useState<Partner[]>(MOCK_PARTNERS);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [accounts, setAccounts] = useState<Account[]>(MOCK_ACCOUNTS);

  const updateCompanyInfo = (info: Partial<CompanyInfo>) => {
    setCompanyInfo(prev => ({ ...prev, ...info }));
  };

  // --- Transactions ---
  const addTransaction = (data: Omit<Transaction, 'id'>) => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newTransaction: Transaction = { ...data, id: newId };
    setTransactions(prev => [newTransaction, ...prev]);
    return newId;
  };

  const updateTransaction = (id: string, data: Partial<Transaction>) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...data } : t));
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // --- Partners ---
  const addPartner = (data: Omit<Partner, 'id'>) => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newPartner: Partner = { ...data, id: newId };
    setPartners(prev => [...prev, newPartner]);
    return newId;
  };

  const updatePartner = (id: string, data: Partial<Partner>) => {
    setPartners(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const deletePartner = (id: string) => {
    setPartners(prev => prev.filter(p => p.id !== id));
  };

  // --- Products ---
  const addProduct = (data: Omit<Product, 'id'>) => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newProduct: Product = { ...data, id: newId };
    setProducts(prev => [...prev, newProduct]);
    return newId;
  };

  const updateProduct = (id: string, data: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // --- Accounts ---
  const addAccount = (data: Account) => {
    setAccounts(prev => [...prev, data]);
  };

  const updateAccount = (code: string, data: Partial<Account>) => {
    setAccounts(prev => prev.map(a => a.code === code ? { ...a, ...data } : a));
  };

  const deleteAccount = (code: string) => {
    setAccounts(prev => prev.filter(a => a.code !== code));
  };

  const value = {
    companyInfo,
    updateCompanyInfo,
    
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    
    partners,
    addPartner,
    updatePartner,
    deletePartner,

    products,
    addProduct,
    updateProduct,
    deleteProduct,

    accounts,
    addAccount,
    updateAccount,
    deleteAccount
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
