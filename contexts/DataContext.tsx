
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { 
  CompanyInfo, Transaction, Partner, Product, Account, LegalDocument,
  DataContextType, TransactionType 
} from '../types';
import { 
  INITIAL_COMPANY_INFO, MOCK_TRANSACTIONS, MOCK_PARTNERS, 
  MOCK_PRODUCTS, MOCK_ACCOUNTS, MOCK_LEGAL_DOCUMENTS
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

// Keys for LocalStorage
const STORAGE_KEYS = {
  COMPANY: 'ketoan_company_info',
  TRANSACTIONS: 'ketoan_transactions',
  PARTNERS: 'ketoan_partners',
  PRODUCTS: 'ketoan_products',
  ACCOUNTS: 'ketoan_accounts',
  LEGAL_DOCS: 'ketoan_legal_docs'
};

// Helper to load data from localStorage or fall back to mock data
const loadFromStorage = <T,>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.error(`Error loading key ${key} from storage`, error);
    return fallback;
  }
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  // Initialize state from LocalStorage
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => 
    loadFromStorage(STORAGE_KEYS.COMPANY, INITIAL_COMPANY_INFO)
  );
  const [transactions, setTransactions] = useState<Transaction[]>(() => 
    loadFromStorage(STORAGE_KEYS.TRANSACTIONS, MOCK_TRANSACTIONS)
  );
  const [partners, setPartners] = useState<Partner[]>(() => 
    loadFromStorage(STORAGE_KEYS.PARTNERS, MOCK_PARTNERS)
  );
  const [products, setProducts] = useState<Product[]>(() => 
    loadFromStorage(STORAGE_KEYS.PRODUCTS, MOCK_PRODUCTS)
  );
  const [accounts, setAccounts] = useState<Account[]>(() => 
    loadFromStorage(STORAGE_KEYS.ACCOUNTS, MOCK_ACCOUNTS)
  );
  const [legalDocuments, setLegalDocuments] = useState<LegalDocument[]>(() => 
    loadFromStorage(STORAGE_KEYS.LEGAL_DOCS, MOCK_LEGAL_DOCUMENTS)
  );

  // Effects to save data whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPANY, JSON.stringify(companyInfo));
  }, [companyInfo]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(partners));
  }, [partners]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LEGAL_DOCS, JSON.stringify(legalDocuments));
  }, [legalDocuments]);


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

  // --- Legal Documents ---
  const addLegalDocument = (data: Omit<LegalDocument, 'id'>) => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newDoc: LegalDocument = { ...data, id: newId };
    setLegalDocuments(prev => [...prev, newDoc]);
    return newId;
  };

  const updateLegalDocument = (id: string, data: Partial<LegalDocument>) => {
    setLegalDocuments(prev => prev.map(d => d.id === id ? { ...d, ...data } : d));
  };

  const deleteLegalDocument = (id: string) => {
    setLegalDocuments(prev => prev.filter(d => d.id !== id));
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
    deleteAccount,

    legalDocuments,
    addLegalDocument,
    updateLegalDocument,
    deleteLegalDocument
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
