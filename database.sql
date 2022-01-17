Create database groupomania;

use groupomania;

CREATE TABLE Users (
    id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    lastName VARCHAR(50) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    statut VARCHAR(5) NOT NULL DEFAULT 'user',

    avatar VARCHAR(200),
    description LONGTEXT,

    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    lastRefreshDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Posts (
    id INTEGER NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    userId INTEGER NOT NULL,

    text LONGTEXT,
    imageURL VARCHAR(200),

    likes INTEGER DEFAULT 0,

    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
ALTER TABLE Posts
ADD CONSTRAINT fk_post_user  FOREIGN KEY (userId)
REFERENCES users(id)
ON DELETE CASCADE;

CREATE TABLE Commentaires (
    id INTEGER NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    postId INTEGER NOT NULL,
    userId INTEGER NOT NULL,

    text LONGTEXT,

    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
ALTER TABLE commentaires
ADD CONSTRAINT fk_commentaire_user FOREIGN KEY (userId)
 REFERENCES users(id)
ON DELETE CASCADE;
ALTER TABLE commentaires
ADD CONSTRAINT fk_commentaire_post FOREIGN KEY (postId)
 REFERENCES posts(id)
ON DELETE CASCADE;

CREATE TABLE Likes (
    id INTEGER NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    postId INTEGER NOT NULL,
    userId INTEGER NOT NULL,

    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
ALTER TABLE Likes
ADD CONSTRAINT uniqueLikes UNIQUE KEY(postId,userId);
ALTER TABLE likes
ADD CONSTRAINT fk_like_user FOREIGN KEY (userId)
 REFERENCES users(id)
ON DELETE CASCADE;
ALTER TABLE likes
ADD CONSTRAINT fk_like_post FOREIGN KEY (postId)
 REFERENCES posts(id)
ON DELETE CASCADE;

show tables;