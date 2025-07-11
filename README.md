# 📱 Reddit-Style Mobile App (Expo + Supabase + Express)

This project is a **Reddit-style social feed app** built using **React Native (Expo)** for the frontend and **Express + PostgreSQL (via Supabase)** for the backend. It demonstrates full-stack capabilities including navigation, API handling, relational data, and dynamic rendering of posts and followers.

---

## 🧠 Features

- 🔧 Built with **Expo Go** for rapid development.
- 🌐 **Express.js** backend with **TypeScript** setup.
- 🧾 SQL schema includes `users`, `posts`, and `user_follows` tables.
- 📬 Fetches post data with user info using a SQL **PostgreSQL function**.
- 🧠 Highlights when a post is by the **auth user** or a **followed user**.
- 💅 Styled with `react-native` components and **Google Fonts**.
- 📅 Human-readable timestamps using `date-fns`.

---

## 📸 ER Diagram
![ER Diagram](./assets/er-diagram.png)

---

## 🛠️ Tech Stack

### Frontend
- [React Native]
- [Expo Go]
- `react-navigation/native`
- `@expo-google-fonts/inter`
- `date-fns`

### Backend
- [Express]
- [Supabase]
- PostgreSQL
- TypeScript (`ts-node-dev`, `tsconfig`)
- `dotenv` and `cors`

---

### SQL Schema
- [Users]
CREATE TABLE users (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
- [Posts]
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

- [Userfollows]
CREATE TABLE user_follows (
  follower_id UUID NOT NULL,
  following_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT pk_follow PRIMARY KEY (follower_id, following_id),
  CONSTRAINT fk_follower FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_following FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE
);

### SQL Queries
- [PostsWithUserName]
- [CreatedAnSqlFunction]

CREATE OR REPLACE FUNCTION get_all_posts_with_user()
RETURNS TABLE (
  name TEXT,
  id UUID,
  title TEXT,
  created_at TIMESTAMPTZ,
  content TEXT,
  user_id UUID,
  tags TEXT[]
)
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    users.name,
    posts.id,
    posts.title,
    posts.created_at,
    posts.content,
    posts.user_id,
    posts.tags
  FROM posts
  JOIN users ON posts.user_id = users.id;
END;
$$ LANGUAGE plpgsql;

- "AuthUserFollowingList"
SELECT following_id
FROM user_follows
WHERE follower_id = 'dummy auth user'

### Conclusion
- Add your own .env file just [SupabaseAuthentication]


