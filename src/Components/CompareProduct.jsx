import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'antd';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CompareProduct.css';

const CompareProducts = ({ compareList, setCompareList }) => {
  const navigate = useNavigate();

  const removeProduct = (id) => {
    const updatedList = compareList.filter((product) => product.id !== id);
    setCompareList(updatedList); 

    toast.success('Product removed from comparison list!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
    });
  };

  const columns = [
    {
      title: 'Attribute',
      dataIndex: 'attribute',
      render: (text) => <p className="attribute-header">{text}</p>,
    },
    ...compareList.map((product) => ({
      title: <p>{product.title}</p>,
      dataIndex: product.id,
      render: (text, record) => {
        const attribute = record.attribute;
        let attributeValue;

        switch (attribute) {
          case 'Price':
            attributeValue = `$${product.price}`;
            break;
          case 'Brand':
            attributeValue = product.brand;
            break;
          case 'Category':
            attributeValue = product.category;
            break;
          case 'Description':
            attributeValue = product.description;
            break;
          default:
            attributeValue = null;
        }

        return (
          <div className="product-attribute-box">
            <Button
              onClick={() => removeProduct(product.id)}
              className="remove-button"
            >
              Remove
            </Button>
            <p className="attribute-value">{attributeValue}</p>
          </div>
        );
      },
    })),
  ];

  const data = [
    { key: '1', attribute: 'Price' , className: "h1" },
    { key: '2', attribute: 'Brand' , className: "h1"  },
    { key: '3', attribute: 'Category' , className: "h1"  },
    { key: '4', attribute: 'Description' , className: "h1"  },
  ];

  return (
    <div className="compare-products-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Button onClick={() => navigate('/')}>Back to Products</Button>
      </motion.div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        rowClassName="animated-row"
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

export default CompareProducts;
