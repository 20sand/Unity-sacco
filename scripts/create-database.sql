-- Unity Trust SACCO Database Schema
-- Create database and tables for the SACCO management system

-- Create database
CREATE DATABASE IF NOT EXISTS unity_trust_sacco;
USE unity_trust_sacco;

-- Members table
CREATE TABLE members (
    id INT PRIMARY KEY AUTO_INCREMENT,
    member_number VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    id_number VARCHAR(20) UNIQUE NOT NULL,
    address TEXT,
    join_date DATE NOT NULL,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Savings accounts table
CREATE TABLE savings_accounts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT NOT NULL,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    account_type ENUM('basic', 'premium', 'gold') NOT NULL,
    balance DECIMAL(15,2) DEFAULT 0.00,
    available_balance DECIMAL(15,2) DEFAULT 0.00,
    interest_rate DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
);

-- Loans table
CREATE TABLE loans (
    id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT NOT NULL,
    loan_number VARCHAR(20) UNIQUE NOT NULL,
    loan_type ENUM('personal', 'business', 'emergency') NOT NULL,
    principal_amount DECIMAL(15,2) NOT NULL,
    interest_rate DECIMAL(5,2) NOT NULL,
    term_months INT NOT NULL,
    monthly_payment DECIMAL(15,2) NOT NULL,
    outstanding_balance DECIMAL(15,2) NOT NULL,
    status ENUM('pending', 'approved', 'active', 'completed', 'defaulted') DEFAULT 'pending',
    application_date DATE NOT NULL,
    approval_date DATE,
    disbursement_date DATE,
    maturity_date DATE,
    purpose TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
);

-- Transactions table
CREATE TABLE transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT NOT NULL,
    account_id INT,
    loan_id INT,
    transaction_type ENUM('deposit', 'withdrawal', 'loan_payment', 'loan_disbursement', 'dividend', 'transfer') NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    balance_after DECIMAL(15,2),
    description TEXT,
    reference_number VARCHAR(50) UNIQUE NOT NULL,
    payment_method ENUM('cash', 'mpesa', 'bank_transfer', 'card') NOT NULL,
    status ENUM('pending', 'completed', 'failed', 'cancelled') DEFAULT 'pending',
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_by INT,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
    FOREIGN KEY (account_id) REFERENCES savings_accounts(id) ON DELETE SET NULL,
    FOREIGN KEY (loan_id) REFERENCES loans(id) ON DELETE SET NULL
);

-- Loan payments table
CREATE TABLE loan_payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    loan_id INT NOT NULL,
    payment_number INT NOT NULL,
    due_date DATE NOT NULL,
    amount_due DECIMAL(15,2) NOT NULL,
    amount_paid DECIMAL(15,2) DEFAULT 0.00,
    principal_amount DECIMAL(15,2) NOT NULL,
    interest_amount DECIMAL(15,2) NOT NULL,
    penalty_amount DECIMAL(15,2) DEFAULT 0.00,
    payment_date DATE,
    status ENUM('pending', 'paid', 'overdue', 'partial') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (loan_id) REFERENCES loans(id) ON DELETE CASCADE
);

-- Dividends table
CREATE TABLE dividends (
    id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT NOT NULL,
    year INT NOT NULL,
    quarter INT NOT NULL,
    dividend_rate DECIMAL(5,2) NOT NULL,
    eligible_balance DECIMAL(15,2) NOT NULL,
    dividend_amount DECIMAL(15,2) NOT NULL,
    payment_date DATE,
    status ENUM('calculated', 'paid') DEFAULT 'calculated',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
);

-- Member applications table
CREATE TABLE member_applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    id_number VARCHAR(20) NOT NULL,
    address TEXT,
    initial_deposit DECIMAL(15,2) NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_by INT,
    review_date TIMESTAMP NULL,
    review_notes TEXT,
    documents JSON
);

-- Loan applications table
CREATE TABLE loan_applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    id_number VARCHAR(20) NOT NULL,
    loan_type ENUM('personal', 'business', 'emergency') NOT NULL,
    requested_amount DECIMAL(15,2) NOT NULL,
    monthly_income DECIMAL(15,2) NOT NULL,
    purpose TEXT NOT NULL,
    status ENUM('pending', 'under_review', 'approved', 'rejected') DEFAULT 'pending',
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_by INT,
    review_date TIMESTAMP NULL,
    review_notes TEXT,
    credit_score INT,
    documents JSON,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE SET NULL
);

-- System settings table
CREATE TABLE system_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Admin users table
CREATE TABLE admin_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'admin', 'loan_officer', 'accountant') NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_members_member_number ON members(member_number);
CREATE INDEX idx_members_email ON members(email);
CREATE INDEX idx_members_status ON members(status);

CREATE INDEX idx_savings_member_id ON savings_accounts(member_id);
CREATE INDEX idx_savings_account_number ON savings_accounts(account_number);

CREATE INDEX idx_loans_member_id ON loans(member_id);
CREATE INDEX idx_loans_loan_number ON loans(loan_number);
CREATE INDEX idx_loans_status ON loans(status);

CREATE INDEX idx_transactions_member_id ON transactions(member_id);
CREATE INDEX idx_transactions_type ON transactions(transaction_type);
CREATE INDEX idx_transactions_date ON transactions(transaction_date);
CREATE INDEX idx_transactions_reference ON transactions(reference_number);

CREATE INDEX idx_loan_payments_loan_id ON loan_payments(loan_id);
CREATE INDEX idx_loan_payments_due_date ON loan_payments(due_date);
CREATE INDEX idx_loan_payments_status ON loan_payments(status);

-- Insert default system settings
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('minimum_savings_deposit', '1000', 'Minimum amount for savings deposit'),
('maximum_loan_multiplier', '3', 'Maximum loan amount as multiple of savings'),
('default_interest_rate', '12', 'Default loan interest rate percentage'),
('dividend_rate', '8.5', 'Annual dividend rate percentage'),
('basic_savings_rate', '5.5', 'Basic savings account dividend rate'),
('premium_savings_rate', '7.2', 'Premium savings account dividend rate'),
('gold_savings_rate', '8.5', 'Gold savings account dividend rate'),
('loan_processing_fee', '2', 'Loan processing fee percentage'),
('penalty_rate', '5', 'Late payment penalty rate percentage'),
('grace_period_days', '7', 'Grace period for loan payments in days');

-- Insert default admin user (password should be hashed in real implementation)
INSERT INTO admin_users (username, email, password_hash, full_name, role) VALUES
('admin', 'admin@unitytrustsacco.co.ke', '$2b$10$example_hash', 'System Administrator', 'super_admin');
