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
  genre: {
    id: string;
    title: string;
    created_at: string;
    updated_at: string;
  };
};
