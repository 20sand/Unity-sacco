-- Update member numbers to use a more unique format
-- This script updates existing member numbers to follow the pattern UT001XXX

USE unity_trust_sacco;

-- Update member numbers to be more unique and sequential
UPDATE members SET member_number = 'UT001001' WHERE member_number = 'UT001';
UPDATE members SET member_number = 'UT001002' WHERE member_number = 'UT002';
UPDATE members SET member_number = 'UT001003' WHERE member_number = 'UT003';
UPDATE members SET member_number = 'UT001004' WHERE member_number = 'UT004';
UPDATE members SET member_number = 'UT001005' WHERE member_number = 'UT005';

-- Create a function to generate unique member numbers
DELIMITER //
CREATE FUNCTION generate_member_number() 
RETURNS VARCHAR(20)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE next_number INT;
    DECLARE new_member_number VARCHAR(20);
    
    -- Get the highest existing member number
    SELECT COALESCE(MAX(CAST(SUBSTRING(member_number, 6) AS UNSIGNED)), 1000) + 1 
    INTO next_number 
    FROM members 
    WHERE member_number LIKE 'UT001%';
    
    -- Format the new member number
    SET new_member_number = CONCAT('UT001', LPAD(next_number, 3, '0'));
    
    RETURN new_member_number;
END //
DELIMITER ;

-- Create a trigger to automatically assign unique member numbers
DELIMITER //
CREATE TRIGGER before_member_insert 
BEFORE INSERT ON members
FOR EACH ROW
BEGIN
    IF NEW.member_number IS NULL OR NEW.member_number = '' THEN
        SET NEW.member_number = generate_member_number();
    END IF;
END //
DELIMITER ;

-- Update system settings to include member number format
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('member_number_prefix', 'UT001', 'Prefix for member numbers'),
('member_number_length', '7', 'Total length of member numbers including prefix'),
('next_member_number', '1006', 'Next available member number sequence')
ON DUPLICATE KEY UPDATE 
setting_value = VALUES(setting_value);

-- Add indexes for better performance on member number lookups
CREATE INDEX idx_members_member_number_unique ON members(member_number);
