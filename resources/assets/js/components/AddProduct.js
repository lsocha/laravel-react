import React, { Component } from 'react';

class AddProduct extends Component {
 
  constructor(props) {
    super(props);
       /* Initialize the state. This is default state for new product. */
       this.state = {
          newProduct: {
              title: '',
              description: '',
              price: 0,
              availability: 1
          }
        }
     
    //Boilerplate code for binding methods with `this`
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
   
  /* This method dynamically accepts inputs and stores it in the state */
  handleInput(key, e) {
     
    /*Duplicating and updating the state */
    var state = Object.assign({}, this.state.newProduct); 
    state[key] = e.target.value;
    this.setState({newProduct: state });
  }

  /* This method is invoked when submit button is pressed */
  handleSubmit(e) {
    //preventDefault prevents page reload   
    e.preventDefault();
    /*A call back to the onAdd props. The current
     *state is passed as a param
     */
    this.props.onAdd(this.state.newProduct);
    // reset form after form is submitted
    e.target.reset();
  }
 
  render() {
    const divStyle = {
      display: 'flex',
      flexDirection: 'column',
      // width: '65%',
      // margin: '0px 10px 10px 30px',
      height: '100%'
    }
    
    const inputStyle = {
      margin: '0px 10px 10px 30px'
    }
     
    return(
      <div className="card col-sm-9" style={divStyle}>
        <div className="card-body">  
          <h2> Add new </h2>
          {/*when Submit button is pressed, the control is passed to 
           * handleSubmit method 
           */}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label> Title: </label>
              { /*On every keystroke, the handeInput method is invoked */ }
              <input type="text" className="form-control" onChange={(e)=>this.handleInput('title',e)} required />
            </div>
            
            <div className="form-group">
              <label> Description: </label>
              <textarea className="form-control" onChange={(e)=>this.handleInput('description',e)} rows="5" required></textarea>
            </div>

            <div className="form-group">
              <label> Price: </label>
              <input type="number" className="form-control" onChange={(e)=>this.handleInput('price',e)} required />
            </div>

            {/*<div className="form-check">
              <input type="checkbox" className="form-check-input" value='1' onChange={(e)=>this.handleInput('availability',e)} />
              <label className="form-check-label">In stock</label>
            </div>*/}
             
           { /* Input fields for Price and availability omitted for brevity */}
            <input type="submit" className="btn btn-primary float-right" value="Submit" />
            <button type="button" className="btn btn-default float-left" onClick={(e)=>this.props.handleReturn()}>Return</button>
          </form>
        </div>
    </div>)
  }
}
 
export default AddProduct;