export type UserDetail = {
  id: string;
  fullname: string;
  email: string;
  google_id: string;
  profile_picture: string;
  created_at: string;
  updated_at: string;
};

export type Genre = {
  id: string;
  title: string;
  photo: string;
  created_at: string;
  updated_at: string;
};

export type GenrePost = {
  title: string;
  photo: string;
};

export type BookAdmin = {
  id: string;
  title: string;
  author: string;
  photos: string[];
  synopsis: string;
  price: number;
  active: boolean;
  created_at: string;
  updated_at: string;
  genre: Genre;
  file_url: string;
};

export type BookCustomer = BookAdmin & {
  saved: boolean;
  buyed: boolean;
};

export type BookPost = {
  title: string;
  author: string;
  synopsis: string;
  photos?: string[];
  price: string;
  genre: string;
  file_url: string;
};

export type Profile = {
  id: string;
  fullname: string;
  email: string;
  google_id: string;
  profile_picture: string;
  created_at: string;
  updated_at: string;
};
