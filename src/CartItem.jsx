import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart，这里的cost是字符串$10，要转换为数字
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach((item)=>{
      totalAmount += item.quantity * parseFloat(item.cost.replace("$", ""));
    });
    return totalAmount;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // item.quantity是只读的，不能用++修改其自身
  const handleIncrement = (item) => {
    const newQuantity = item.quantity+1;
    const newItem = {...item, quantity: newQuantity};
    dispatch(updateQuantity(newItem));
  };

  // 若quantity<0，调用remove
  const handleDecrement = (item) => {
    const newQuantity = item.quantity-1;
    if(newQuantity>=0){
      const newItem = {...item, quantity: newQuantity};
      dispatch(updateQuantity(newItem));
    }else{
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    // console.log("targetItem: "+item);
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    let totalAmount = item.quantity * parseFloat(item.cost.replace("$", ""));
    return totalAmount;
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


