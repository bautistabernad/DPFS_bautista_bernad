USE tempo_db;

INSERT INTO categories (name) VALUES
('Guitarra'),
('Piano'),
('Canto'),
('Batería');

INSERT INTO users (first_name, last_name, email, password, category, image) VALUES
('Bautista', 'Bernad', 'bauti@tempo.com', '$2a$10$123456789abcdefghijklmnopqrstuv', 'admin', 'default-user.png'),
('Sofia', 'Ruiz', 'sofia@tempo.com', '$2a$10$123456789abcdefghijklmnopqrstuv', 'teacher', 'default-user.png'),
('Martin', 'Lopez', 'martin@tempo.com', '$2a$10$123456789abcdefghijklmnopqrstuv', 'teacher', 'default-user.png');

INSERT INTO products (name, description, image, level, price, category_id) VALUES
('Clase de Guitarra Inicial', 'Aprendé acordes, ritmo, postura y canciones simples desde cero.', 'guitarra.jpg', 'Principiante', 12000.00, 1),
('Pack de Piano Moderno', 'Curso completo de piano moderno para mejorar técnica y armonía.', 'piano.jpg', 'Intermedio', 25000.00, 2),
('Clase de Técnica Vocal', 'Mejorá tu respiración, afinación y proyección vocal.', 'canto.jpg', 'Todos los niveles', 15000.00, 3),
('Clase de Batería para Principiantes', 'Aprendé ritmos básicos, coordinación y técnica inicial.', 'bateria.jpg', 'Principiante', 14000.00, 4);