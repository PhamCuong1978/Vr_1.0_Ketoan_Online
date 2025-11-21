

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { 
  CompanyInfo, Transaction, Partner, Product, Account, LegalDocument, BankAccount, Project,
  Currency, Unit, VoucherType, Warehouse, ExpenseItem,
  DataContextType, TransactionType 
} from '../types';
import { 
  INITIAL_COMPANY_INFO, MOCK_TRANSACTIONS, MOCK_PARTNERS, 
  MOCK_PRODUCTS, MOCK_ACCOUNTS, MOCK_LEGAL_DOCUMENTS, MOCK_BANK_ACCOUNTS, MOCK_PROJECTS,
  MOCK_CURRENCIES, MOCK_UNITS, MOCK_VOUCHER_TYPES, MOCK_WAREHOUSES, MOCK_EXPENSE_ITEMS
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
  LEGAL_DOCS: 'ketoan_legal_docs',
  BANKS: 'ketoan_banks',
  PROJECTS: 'ketoan_projects',
  CURRENCIES: 'ketoan_currencies',
  UNITS: 'ketoan_units',
  VOUCHER_TYPES: 'ketoan_voucher_types',
  WAREHOUSES: 'ketoan_warehouses',
  EXPENSE_ITEMS: 'ketoan_expense_items'
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
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(() => 
    loadFromStorage(STORAGE_KEYS.BANKS, MOCK_BANK_ACCOUNTS)
  );
  const [projects, setProjects] = useState<Project[]>(() => 
    loadFromStorage(STORAGE_KEYS.PROJECTS, MOCK_PROJECTS)
  );
  const [legalDocuments, setLegalDocuments] = useState<LegalDocument[]>(() => 
    loadFromStorage(STORAGE_KEYS.LEGAL_DOCS, MOCK_LEGAL_DOCUMENTS)
  );
  // New States
  const [currencies, setCurrencies] = useState<Currency[]>(() => loadFromStorage(STORAGE_KEYS.CURRENCIES, MOCK_CURRENCIES));
  const [units, setUnits] = useState<Unit[]>(() => loadFromStorage(STORAGE_KEYS.UNITS, MOCK_UNITS));
  const [voucherTypes, setVoucherTypes] = useState<VoucherType[]>(() => loadFromStorage(STORAGE_KEYS.VOUCHER_TYPES, MOCK_VOUCHER_TYPES));
  const [warehouses, setWarehouses] = useState<Warehouse[]>(() => loadFromStorage(STORAGE_KEYS.WAREHOUSES, MOCK_WAREHOUSES));
  const [expenseItems, setExpenseItems] = useState<ExpenseItem[]>(() => loadFromStorage(STORAGE_KEYS.EXPENSE_ITEMS, MOCK_EXPENSE_ITEMS));

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
    localStorage.setItem(STORAGE_KEYS.BANKS, JSON.stringify(bankAccounts));
  }, [bankAccounts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LEGAL_DOCS, JSON.stringify(legalDocuments));
  }, [legalDocuments]);

  // New Effects
  useEffect(() => localStorage.setItem(STORAGE_KEYS.CURRENCIES, JSON.stringify(currencies)), [currencies]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.UNITS, JSON.stringify(units)), [units]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.VOUCHER_TYPES, JSON.stringify(voucherTypes)), [voucherTypes]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.WAREHOUSES, JSON.stringify(warehouses)), [warehouses]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.EXPENSE_ITEMS, JSON.stringify(expenseItems)), [expenseItems]);


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

  // --- Bank Accounts ---
  const addBankAccount = (data: Omit<BankAccount, 'id'>) => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newBank: BankAccount = { ...data, id: newId };
    setBankAccounts(prev => [...prev, newBank]);
    return newId;
  };

  const updateBankAccount = (id: string, data: Partial<BankAccount>) => {
    setBankAccounts(prev => prev.map(b => b.id === id ? { ...b, ...data } : b));
  };

  const deleteBankAccount = (id: string) => {
    setBankAccounts(prev => prev.filter(b => b.id !== id));
  };

  // --- Projects ---
  const addProject = (data: Omit<Project, 'id'>) => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newProject: Project = { ...data, id: newId };
    setProjects(prev => [...prev, newProject]);
    return newId;
  };

  const updateProject = (id: string, data: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
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

  // --- Currencies ---
  const addCurrency = (data: Omit<Currency, 'id'>) => {
    const newId = Math.random().toString(36).substr(2, 9);
    setCurrencies(prev => [...prev, { ...data, id: newId }]);
    return newId;
  };
  const updateCurrency = (id: string, data: Partial<Currency>) => setCurrencies(prev => prev.map(i => i.id === id ? { ...i, ...data } : i));
  const deleteCurrency = (id: string) => setCurrencies(prev => prev.filter(i => i.id !== id));

  // --- Units ---
  const addUnit = (data: Omit<Unit, 'id'>) => {
    const newId = Math.random().toString(36).substr(2, 9);
    setUnits(prev => [...prev, { ...data, id: newId }]);
    return newId;
  };
  const updateUnit = (id: string, data: Partial<Unit>) => setUnits(prev => prev.map(i => i.id === id ? { ...i, ...data } : i));
  const deleteUnit = (id: string) => setUnits(prev => prev.filter(i => i.id !== id));

  // --- Voucher Types ---
  const addVoucherType = (data: Omit<VoucherType, 'id'>) => {
    const newId = Math.random().toString(36).substr(2, 9);
    setVoucherTypes(prev => [...prev, { ...data, id: newId }]);
    return newId;
  };
  const updateVoucherType = (id: string, data: Partial<VoucherType>) => setVoucherTypes(prev => prev.map(i => i.id === id ? { ...i, ...data } : i));
  const deleteVoucherType = (id: string) => setVoucherTypes(prev => prev.filter(i => i.id !== id));

  // --- Warehouses ---
  const addWarehouse = (data: Omit<Warehouse, 'id'>) => {
    const newId = Math.random().toString(36).substr(2, 9);
    setWarehouses(prev => [...prev, { ...data, id: newId }]);
    return newId;
  };
  const updateWarehouse = (id: string, data: Partial<Warehouse>) => setWarehouses(prev => prev.map(i => i.id === id ? { ...i, ...data } : i));
  const deleteWarehouse = (id: string) => setWarehouses(prev => prev.filter(i => i.id !== id));

  // --- Expense Items ---
  const addExpenseItem = (data: Omit<ExpenseItem, 'id'>) => {
    const newId = Math.random().toString(36).substr(2, 9);
    setExpenseItems(prev => [...prev, { ...data, id: newId }]);
    return newId;
  };
  const updateExpenseItem = (id: string, data: Partial<ExpenseItem>) => setExpenseItems(prev => prev.map(i => i.id === id ? { ...i, ...data } : i));
  const deleteExpenseItem = (id: string) => setExpenseItems(prev => prev.filter(i => i.id !== id));


  // --- Data Management ---
  const importData = (data: any) => {
    if (!data) return;

    try {
        if (data.companyInfo) setCompanyInfo(data.companyInfo);
        if (Array.isArray(data.transactions)) setTransactions(data.transactions);
        if (Array.isArray(data.partners)) setPartners(data.partners);
        if (Array.isArray(data.products)) setProducts(data.products);
        if (Array.isArray(data.accounts)) setAccounts(data.accounts);
        if (Array.isArray(data.bankAccounts)) setBankAccounts(data.bankAccounts);
        if (Array.isArray(data.projects)) setProjects(data.projects);
        if (Array.isArray(data.legalDocuments)) setLegalDocuments(data.legalDocuments);
        if (Array.isArray(data.currencies)) setCurrencies(data.currencies);
        if (Array.isArray(data.units)) setUnits(data.units);
        if (Array.isArray(data.voucherTypes)) setVoucherTypes(data.voucherTypes);
        if (Array.isArray(data.warehouses)) setWarehouses(data.warehouses);
        if (Array.isArray(data.expenseItems)) setExpenseItems(data.expenseItems);
    } catch (e) {
        console.error("Import error:", e);
        throw new Error("Dữ liệu không hợp lệ");
    }
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

    bankAccounts,
    addBankAccount,
    updateBankAccount,
    deleteBankAccount,

    projects,
    addProject,
    updateProject,
    deleteProject,

    legalDocuments,
    addLegalDocument,
    updateLegalDocument,
    deleteLegalDocument,

    currencies, addCurrency, updateCurrency, deleteCurrency,
    units, addUnit, updateUnit, deleteUnit,
    voucherTypes, addVoucherType, updateVoucherType, deleteVoucherType,
    warehouses, addWarehouse, updateWarehouse, deleteWarehouse,
    expenseItems, addExpenseItem, updateExpenseItem, deleteExpenseItem,

    importData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};