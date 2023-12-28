export type Genre = {
  id: string;
  title: string;
  photo: string;
  created_at: string;
  updated_at: string;
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
};

export type BookCustomer = BookAdmin & {
  cutsomers_who_saving: [];
  cutsomers_who_buying: [];
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

export type GenrePost = {
  title: string;
  photo: string;
};
