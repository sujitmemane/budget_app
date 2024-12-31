export interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  description: string;
  date: Number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}
