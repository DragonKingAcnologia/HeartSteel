    DROP TABLE IF EXISTS accounts;
    DROP TABLE IF EXISTS assets;
    DROP TABLE IF EXISTS transactions;

    CREATE TABLE accounts (
        accountID INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL
    );

    CREATE TABLE assets (
        assetID INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        owner INT,
        img VARCHAR(255),
        price DECIMAL(10,4),
        tokenID VARCHAR(255),
        contract_address VARCHAR(255),
        FOREIGN KEY (owner) REFERENCES accounts(accountID)
    );

    CREATE TABLE transactions (
        transID INT AUTO_INCREMENT PRIMARY KEY,
        accountID INT,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,4),
        mode VARCHAR(50),
        date DATE,
        tokenID VARCHAR(255),
        FOREIGN KEY (accountID) REFERENCES accounts(accountID)
    );


    INSERT INTO accounts (username, password, first_name, last_name) VALUES
    ('Yasuo', '123', 'Phong', 'Luu'),
    ('Yone', '123', 'Huy', 'Nguyen'),
    ('Yi', '123', 'Thinh', 'Pham'),
    ('Zed', '123', 'Khai', 'Do'),
    ('Leesin', '123', 'Tri', 'Nguyen'),
    ('Nautilus', '123', 'Hai', 'Nguyen'),
    ('Ryze', '123', 'Nhat', 'Nguyen'),
    ('Ahri', '123', 'Huong', 'Le'),
    ('Akali', '123', 'Thao', 'Luu'),
    ('Ashe', '123', 'Nhi', 'Pham');

    INSERT INTO assets (assetID, name, owner, img, price, tokenID, contract_address) VALUES
    (DEFAULT, 'Yellow Bear', NULL, '/image/bear.png', 0.25, '0xF1E2D3C4B5A', '0x5F4E3D2C1A0'),
    (DEFAULT, 'Blue Dog', NULL, '/image/blue-dog.png', 0.35, '0xA1B2C3D4E5F', '0xC1D2E3F4A5B'),
    (DEFAULT, 'Blue Elephant', NULL, '/image/blue-elephant.png', 0.65, '0xB1A2C3D4E5F', '0x6F5E4D3C2B1'),
    (DEFAULT, 'Cool Dog', NULL, '/image/cool-dog.png', 0.45, '0x1F2E3D4C5B6', '0xA0B1C2D3E4F'),
    (DEFAULT, 'Glasses Elephant', NULL, '/image/glasses-elephant.png', 0.75, '0xF2E1D0C9B8A', '0x2F3E4D5C6B7'),
    (DEFAULT, 'Green Dog', NULL, '/image/green-dog.png', 0.85, '0xCBA987654321', '0xFEDCBA987654'),
    (DEFAULT, 'Monster', NULL, '/image/monster.png', 0.55, '0xF0E1D2C3B4A', '0x9E8F7D6C5B4'),
    (DEFAULT, 'One eye Dog', NULL, '/image/one-eye-dog.png', 0.65, '0x4E5F6D7C8B9', '0x2A1B3C4D5E6'),
    (DEFAULT, 'Pink Dog', NULL, '/image/pink-dog.png', 0.45, '0x6B5A4C3D2E1', '0xE7F8D9A0B1C'),
    (DEFAULT, 'Pink Penguin', NULL, '/image/pink-penguin.png', 0.55, '0x1A2B3C4D5E6', '0x6F7E8D9A0B1'),
    (DEFAULT, 'Red Penguin', NULL, '/image/red-penguin.png', 0.75, '0xA0B1C2D3E4F5', '0x9A8B7C6D5E4'),
    (DEFAULT, 'White one eye Dog', NULL, '/image/white-one-eye-dog.png', 0.85, '0xA9876543210F', '0x0E1D2C3B4A5');

    INSERT INTO transactions (accountID, name, price, mode, date, tokenID)
    VALUES
        (1, 'Yellow Bear', 0.25, 'Buy', '2024-01-01', '0xF1E2D3C4B5A'),
        (2, 'Blue Dog', 0.35, 'Buy', '2024-01-15', '0xA1B2C3D4E5F'),
        (6, 'Blue Elephant', 0.65, 'Sell', '2024-01-30', '0xB1A2C3D4E5F'),
        (4, 'Cool Dog', 0.45, 'Buy', '2024-01-01', '0x1F2E3D4C5B6'),
        (5, 'Glasses Elephant', 0.75, 'Buy', '2024-02-01', '0xF2E1D0C9B8A'),
        (7, 'Green Dog', 0.85, 'Sell', '2024-02-03', '0xCBA987654321'),
        (8, 'One eye Dog', 0.65, 'Buy', '2024-02-04', '0x4E5F6D7C8B9'),
        (10, 'Monster', 0.55, 'Sell', '2024-02-06','0xF0E1D2C3B4A'),
        (9, 'Pink Dog', 0.45, 'Buy', '2024-02-14', '0x6B5A4C3D2E1'),
        (3, 'White one eye Dog', 0.85, 'Buy', '2024-02-24', '0xA9876543210F');
