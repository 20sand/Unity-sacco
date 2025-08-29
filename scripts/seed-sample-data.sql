-- Sample data for Unity Trust SACCO
-- This script populates the database with sample data for testing

USE unity_trust_sacco;

-- Insert sample members
INSERT INTO members (member_number, full_name, email, phone, id_number, address, join_date, status) VALUES
('UT001001', 'John Doe', 'john@example.com', '+254700123456', '12345678', 'Nairobi, Kenya', '2023-01-15', 'active'),
('UT001002', 'Jane Smith', 'jane@example.com', '+254701234567', '23456789', 'Mombasa, Kenya', '2023-02-20', 'active'),
('UT001003', 'Peter Kamau', 'peter@example.com', '+254702345678', '34567890', 'Kisumu, Kenya', '2023-03-10', 'active'),
('UT001004', 'Mary Njeri', 'mary@example.com', '+254703456789', '45678901', 'Nakuru, Kenya', '2023-04-05', 'active'),
('UT001005', 'David Ochieng', 'david@example.com', '+254704567890', '56789012', 'Eldoret, Kenya', '2023-05-12', 'active');

-- Insert savings accounts
INSERT INTO savings_accounts (member_id, account_number, account_type, balance, available_balance, interest_rate) VALUES
(1, 'SA001', 'premium', 125000.00, 98000.00, 7.20),
(2, 'SA002', 'basic', 89000.00, 89000.00, 5.50),
(3, 'SA003', 'gold', 156000.00, 120000.00, 8.50),
(4, 'SA004', 'premium', 78000.00, 78000.00, 7.20),
(5, 'SA005', 'basic', 45000.00, 45000.00, 5.50);

-- Insert sample loans
INSERT INTO loans (member_id, loan_number, loan_type, principal_amount, interest_rate, term_months, monthly_payment, outstanding_balance, status, application_date, approval_date, disbursement_date, maturity_date, purpose) VALUES
(1, 'LN001', 'personal', 50000.00, 12.00, 24, 2500.00, 35000.00, 'active', '2023-06-15', '2023-06-20', '2023-06-25', '2025-06-25', 'Home improvement'),
(3, 'LN002', 'business', 100000.00, 10.00, 36, 3200.00, 75000.00, 'active', '2023-07-10', '2023-07-15', '2023-07-20', '2026-07-20', 'Business expansion'),
(4, 'LN003', 'emergency', 25000.00, 8.00, 12, 2300.00, 18000.00, 'active', '2023-08-05', '2023-08-06', '2023-08-07', '2024-08-07', 'Medical emergency');

-- Insert sample transactions
INSERT INTO transactions (member_id, account_id, transaction_type, amount, balance_after, description, reference_number, payment_method, status, transaction_date) VALUES
(1, 1, 'deposit', 5000.00, 125000.00, 'Monthly savings deposit', 'TXN001', 'mpesa', 'completed', '2025-01-20 10:30:00'),
(1, 1, 'loan_payment', -2500.00, 122500.00, 'Personal loan repayment', 'TXN002', 'bank_transfer', 'completed', '2025-01-18 14:15:00'),
(2, 2, 'deposit', 3000.00, 89000.00, 'Savings deposit', 'TXN003', 'cash', 'completed', '2025-01-19 09:45:00'),
(3, 3, 'withdrawal', -5000.00, 151000.00, 'Emergency withdrawal', 'TXN004', 'mpesa', 'completed', '2025-01-17 16:20:00'),
(1, 1, 'dividend', 1200.00, 123700.00, 'Quarterly dividend payment', 'TXN005', 'bank_transfer', 'completed', '2025-01-15 12:00:00');

-- Insert loan payments schedule
INSERT INTO loan_payments (loan_id, payment_number, due_date, amount_due, amount_paid, principal_amount, interest_amount, payment_date, status) VALUES
(1, 1, '2024-07-25', 2500.00, 2500.00, 2000.00, 500.00, '2024-07-25', 'paid'),
(1, 2, '2024-08-25', 2500.00, 2500.00, 2020.00, 480.00, '2024-08-25', 'paid'),
(1, 3, '2024-09-25', 2500.00, 2500.00, 2040.00, 460.00, '2024-09-25', 'paid'),
(1, 4, '2024-10-25', 2500.00, 2500.00, 2060.00, 440.00, '2024-10-25', 'paid'),
(1, 5, '2024-11-25', 2500.00, 2500.00, 2080.00, 420.00, '2024-11-25', 'paid'),
(1, 6, '2024-12-25', 2500.00, 2500.00, 2100.00, 400.00, '2024-12-25', 'paid'),
(1, 7, '2025-01-25', 2500.00, 2500.00, 2120.00, 380.00, '2025-01-25', 'paid'),
(1, 8, '2025-02-25', 2500.00, 0.00, 2140.00, 360.00, NULL, 'pending');

-- Insert sample dividends
INSERT INTO dividends (member_id, year, quarter, dividend_rate, eligible_balance, dividend_amount, payment_date, status) VALUES
(1, 2024, 4, 7.20, 120000.00, 2160.00, '2025-01-15', 'paid'),
(2, 2024, 4, 5.50, 85000.00, 1168.75, '2025-01-15', 'paid'),
(3, 2024, 4, 8.50, 150000.00, 3187.50, '2025-01-15', 'paid'),
(4, 2024, 4, 7.20, 75000.00, 1350.00, '2025-01-15', 'paid'),
(5, 2024, 4, 5.50, 42000.00, 577.50, '2025-01-15', 'paid');

-- Insert sample member applications
INSERT INTO member_applications (full_name, email, phone, id_number, address, initial_deposit, status, application_date, documents) VALUES
('Alice Wanjiku', 'alice@example.com', '+254701234567', '12345001', 'Thika, Kenya', 5000.00, 'pending', '2025-01-20 08:30:00', '["id_copy.jpg", "passport_photo.jpg"]'),
('Robert Mwangi', 'robert@example.com', '+254702345678', '12345002', 'Machakos, Kenya', 10000.00, 'pending', '2025-01-19 14:20:00', '["id_copy.pdf", "passport_photo.jpg", "payslip.pdf"]');

-- Insert sample loan applications
INSERT INTO loan_applications (member_id, full_name, email, phone, id_number, loan_type, requested_amount, monthly_income, purpose, status, application_date, credit_score, documents) VALUES
(2, 'Jane Smith', 'jane@example.com', '+254701234567', '23456789', 'business', 75000.00, 45000.00, 'Expand retail business', 'pending', '2025-01-18 11:15:00', 750, '["business_plan.pdf", "financial_statements.pdf"]'),
(5, 'David Ochieng', 'david@example.com', '+254704567890', '56789012', 'personal', 30000.00, 35000.00, 'Education expenses', 'under_review', '2025-01-17 16:45:00', 680, '["payslip.pdf", "school_fees_invoice.pdf"]');

-- Update member statistics based on inserted data
UPDATE members m 
SET 
    m.updated_at = CURRENT_TIMESTAMP
WHERE m.id IN (1,2,3,4,5);

-- Create some additional sample transactions for better testing
INSERT INTO transactions (member_id, account_id, transaction_type, amount, balance_after, description, reference_number, payment_method, status, transaction_date) VALUES
(2, 2, 'deposit', 2000.00, 91000.00, 'Weekly savings', 'TXN006', 'mpesa', 'completed', '2025-01-16 08:30:00'),
(3, 3, 'deposit', 8000.00, 159000.00, 'Bonus deposit', 'TXN007', 'bank_transfer', 'completed', '2025-01-14 11:20:00'),
(4, 4, 'withdrawal', -3000.00, 75000.00, 'Personal withdrawal', 'TXN008', 'cash', 'completed', '2025-01-13 15:45:00'),
(5, 5, 'deposit', 1500.00, 46500.00, 'Monthly contribution', 'TXN009', 'mpesa', 'completed', '2025-01-12 09:15:00'),
(1, 1, 'deposit', 10000.00, 133700.00, 'Salary deposit', 'TXN010', 'bank_transfer', 'completed', '2025-01-11 13:30:00');
