import React from 'react'
import "./Sidebar.css";
import { useNavigate } from 'react-router-dom';
const Sidebar = ({compareList}) => {

    const navigate = useNavigate();

    

  return (
    <>
 <div className="sidebar">
    <span onClick={() => navigate("/")}>Home</span>
      <span onClick={() => navigate('/')}>Product Details</span>
      <span onClick={() => navigate('/compare', { state: { compareList } })}>
        Compare Products 
      </span>
    </div>

    </>
  )
}

export default Sidebar