// https://github.com/blizzerand/Laravel5.5_And_React_demo
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Product from './Product';
 
/* An example React component */
class Main extends Component {

	constructor() {
    	super();
    	//Initialize the state in the constructor
    	/* currentProduct keeps track of the product currently
     	 * displayed 
     	 */
    	this.state = {
        	products: [],
        	currentProduct: null
    	}
  	}

	/*componentDidMount() is a lifecycle method
	* that gets called after the component is rendered
	*/
	componentDidMount() {
		/* fetch API in action */
		fetch('/api/products')
		    .then(response => {
		        return response.json();
		    })
		    .then(products => {
		        //Fetched product is stored in the state
		        this.setState({ products });
		    });
	}
 
	renderProducts() {
		return this.state.products.map(product => {
		    return (
		        /* When using list you need to specify a key
		         * attribute that is unique for each list item
		        */
		        //this.handleClick() method is invoked onClick.
	            <li onClick={() =>this.handleClick(product)} key={product.id} >
	                { product.title } 
	            </li>      
		    );
		})
	}

	handleClick(product) {
	    //handleClick is used to set the state
	    this.setState({currentProduct:product});  
	}

	render() {
		/* Some css code has been removed for brevity */
		return (
			<div>
				<div>
				all products
				</div>
			    <div>
		          <ul>
		            { this.renderProducts() }
		          </ul> 
		        </div>
		        <Product product={this.state.currentProduct} />
		    </div> 
		);
	}
}
 
export default Main;
 
/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";  
*/
 
if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}