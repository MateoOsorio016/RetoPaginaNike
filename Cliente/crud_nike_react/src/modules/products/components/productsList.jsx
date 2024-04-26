import { getProductsList } from "../api/apiProducts";
import { useEffect, useState } from "react";
import {Table} from "./../../../components/Table/table"
export function ProductsList () {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      console.log("entre");
      const res = await getProductsList();
      console.log(res.data ,"estoy aqui");
      setProducts(res.data);
    }
    loadProducts();
  }, [])

  const columns = [
    'ID', 'Name', 'Price', 'Quantity', 'Description', 'Category', 'State'
  ];	
  const dbcolumns =[
    'id', 'name', 'price', 'quantity', 'description', 'category', 'state'
  ]
    const data = products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        category: product.category,
        state: product.state,
      }));
  
  return (
    <>
    <Table data={data} columns={columns} dbColumns={dbcolumns} title='Products' createLink='/products/create' createText='Create New' />
    </>
  );
};