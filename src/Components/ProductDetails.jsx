import React, { useState, useEffect } from 'react';
import { Table, Button, Image, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Text } = Typography;

const ProductDetails = ({ compareList, setCompareList }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCompare = (product) => {
    if (compareList.length >= 4) {
      toast.error('You have exceeded your limit of 4 products for comparison!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
      });
    } else if (!compareList.some((item) => item.id === product.id)) {
      setCompareList([...compareList, product]);
      toast.success('Product added successfully!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
      });
    }
  };

  const goToComparePage = () => {
    navigate("/compare", { state: { compareList } });
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'thumbnail',
      render: (thumbnail) => <Image src={thumbnail} width={100} alt="Product" />,
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Compare Products',
      render: (_, record) => (
        <Button
          onClick={() => handleCompare(record)}
          disabled={compareList.some((item) => item.id === record.id)}
        >
          {compareList.some((item) => item.id === record.id) ? 'Added' : 'Compare'}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={goToComparePage} disabled={compareList.length === 0}>
        Compare Now ({compareList.length})
      </Button>
      <Table
        columns={columns}
        dataSource={products}
        rowKey={(record) => record.id}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default ProductDetails;
