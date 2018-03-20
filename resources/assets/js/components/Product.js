import React, { Component } from 'react';
 
/* Stateless component or pure component
 * { product } syntax is the object destructing
 */

// why this  changed????
// const Product = ({product}) => {
// because earlier we had only one property in Product object product={this.state.currentProduct}, now we have two
const Product = props => {
  const {
    product,
    handleDeleteConfirmation,
    handleDelete,
    handleEdit,
    update
  } = props;
    
  const divStyle = {
      display: 'flex',
      flexDirection: 'column',
      width: '65%',
      margin: '30px 10px 10px 30px',
      height: '100%'
  }

  var prodAvailable = React.createElement(
    'span',
    {className: 'badge badge-success'},
    'Available'
  );

  var prodUnavailable = React.createElement(
    'span',
    {className: 'badge badge-danger'},
    'Out of stock'
  );
 
  //if the props product is null, return Product doesn't exist
  if(!product) {
    return(<div style={divStyle}>No product was selected.</div>);
  }
     
  //Else, display the product data
  return(  
    <div className="card" style={divStyle}>
      <div className="card-body"> 
        <h2 className="card-title"> {product.title} </h2>
        <p> {product.description} </p>
        <h4>Status {product.availability ? prodAvailable : prodUnavailable} </h4>
        <h4> Price : {product.price} </h4>
        <input className="btn btn-primary" type="button" value="edit" onClick={e => handleEdit()} />
        <button className="btn btn-danger float-right" value="delete" onClick={ e => handleDeleteConfirmation()}> Delete</button>
      </div>
    </div>
  )
}
 
export default Product ;