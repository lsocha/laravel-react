import React, { Component } from "react";

class EditProduct extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props);
    this.state = {
      product: null
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleReturn = this.handleReturn.bind(this);
  }

  /*
   *componentWillMount() is invoked just before mounting occurs. It is called before render(), therefore calling 
   *setState() synchronously in this method will not trigger an extra rendering. Generally, we recommend using the constructor() instead.
   */
  componentWillMount() {
    this.setState({ product: this.props.product, editButtonClicked: this.props.editButtonClicked });
  }

  handleInput(key, e) {
    let state = Object.assign({}, this.state.product);
    state[key] = e.target.value;
    this.setState({ product: state });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.update(this.state.product);
    this.editForm.reset();
  }

  render() {
    const divStyle = {
      display: 'flex',
      flexDirection: 'column',
      width: '65%',
      margin: '30px 10px 10px 30px',
      height: '100%'
    }
    const product = this.state.product;

    return (
      <div className="card" style={divStyle}>
        <div className="card-body">  
          <h2> Edit product </h2>
          <form onSubmit={this.handleSubmit} ref={input => (this.editForm = input)}>

            <div className="form-group">
              <label> Title: </label>
              <input type="text" value={product.title} className="form-control" onChange={(e)=>this.handleInput('title',e)} required />
            </div>
            
            <div className="form-group">
              <label> Description: </label>
              <textarea value={product.description} className="form-control" onChange={(e)=>this.handleInput('description',e)} rows="5" required></textarea>
            </div>

            <div className="form-group">
              <label> Price: </label>
              <input type="number" value={product.price} className="form-control" onChange={(e)=>this.handleInput('price',e)} required />
            </div>

            <input type="submit" className="btn btn-primary float-right" value="Save" />
            <button type="button" className="btn btn-default float-left" onClick={(e)=>this.props.handleReturn()}>Return</button>

          </form>
        </div>
      </div>
    );
  }
}

export default EditProduct;
