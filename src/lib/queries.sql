CREATE TABLE IF NOT EXISTS user_profile(
  id SERIAL PRIMARY KEY,
  clerk_id TEXT UNIQUE,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  bio TEXT,
  username TEXT,
  image_src TEXT
);

CREATE TABLE IF NOT EXISTS comments3(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  comment TEXT,
  user_posts_id INTEGER REFERENCES user_posts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_posts (
  id SERIAL PRIMARY KEY,
  clerk_id TEXT REFERENCES user_profile(clerk_id) ON DELETE CASCADE,
  topic TEXT,
  content TEXT NOT NULL,
  date DATE,
  image_src TEXT
)

SELECT clerk_id FROM user_posts WHERE id=1
SELECT first_name FROM user_profile WHERE clerk_id = 'user_2nwzkL6FtVyC07gLpWVOZ5CtNU8'

CREATE TABLE IF NOT EXISTS follows (
  following_clerk_id TEXT REFERENCES user_profile(clerk_id),
  followed_clerk_id TEXT REFERENCES user_profile(clerk_id), 
  PRIMARY KEY (following_clerk_id,followed_clerk_id)
  
);

-- SELECT * FROM follows WHERE following_clerk_id='user_2o1aJin2YlorRv1MFuUZWoWntGm'
-- JOIN user_profile ON user_profile.clerk_id=follows.following_clerk_id


-- SELECT * 
-- FROM follows 
-- JOIN user_profile 
-- ON user_profile.clerk_id = follows.followed_clerk_id
-- WHERE follows.following_clerk_id = 'user_2o1aJin2YlorRv1MFuUZWoWntGm';


-- (following_clerk_id,followed_clerk_id)

-- SELECT * 
-- FROM follows 
-- JOIN user_posts 
-- ON user_posts.clerk_id = follows.followed_clerk_id
-- JOIN user_profile 
-- ON user_profile.clerk_id = follows.followed_clerk_id
-- WHERE follows.following_clerk_id = 'user_2o1aJin2YlorRv1MFuUZWoWntGm';

SELECT * 
FROM follows 
JOIN user_posts 
ON user_posts.clerk_id = follows.followed_clerk_id

WHERE follows.following_clerk_id = 'user_2o1aJin2YlorRv1MFuUZWoWntGm';