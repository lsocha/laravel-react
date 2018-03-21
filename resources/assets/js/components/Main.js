// https://github.com/blizzerand/Laravel5.5_And_React_demo
// https://github.com/amritms/Laravel5.5_And_React_demo/blob/react-crud/resources/assets/js/components/Main.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Product from './Product';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import '../../css/app.css';
 
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
        	currentProduct: null,
        	editButtonClicked: false
    	}
    	// bind the handleProduct method to the class
    	this.handleAddProduct = this.handleAddProduct.bind(this);
    	this.handleDelete = this.handleDelete.bind(this);
    	this.handleDeleteConfirmation = this.handleDeleteConfirmation.bind(this);
    	this.handleEdit = this.handleEdit.bind(this);
    	this.handleUpdate = this.handleUpdate.bind(this);
    	this.handleReturn = this.handleReturn.bind(this);
  	}

	/* componentDidMount() is a lifecycle method
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
	            <li 
	            	className="list-group-item d-flex justify-content-between align-items-center" 
	            	onClick={() =>this.handleClick(product)} key={product.id} >
	                { product.title }
	                <span class="badge badge-primary badge-pill">{product.price}</span> 
	            </li>      
		    );
		})
	}

	handleClick(product) {
	    //handleClick is used to set the state
	    this.setState({currentProduct:product});
	    window.scrollTo(0, 0);  
	}

	handleAddProduct(product) {
	   product.price = Number(product.price);
	   /*Fetch API for post request */
	   fetch( 'api/products/', {
	       method:'post',
	       /* headers are important*/
	       headers: {
	         'Accept': 'application/json',
	         'Content-Type': 'application/json'
	       },
	        
	       body: JSON.stringify(product)
	   })
	   .then(response => {
	       return response.json();
	   })
	   .then( data => {
	       //update the state of products and currentProduct
	       this.setState((prevState)=> ({
	           products: prevState.products.concat(data),
	           currentProduct : data
	       }))
	   })
 	}

 	handleDelete() {
	  const currentProduct = this.state.currentProduct;
	  fetch( 'api/products/' + this.state.currentProduct.id, 
	      { method: 'delete' })
	      .then(response => {
	        /* Duplicate the array and filter out the item to be deleted */
	        var array = this.state.products.filter(function(item) {
	        return item !== currentProduct
	      });
	    
	      this.setState({ products: array, currentProduct: null});
	 
	  });
	}

	handleDeleteConfirmation(event) {
		if (confirm("Are you sure you want to delete it?")) {
		  this.handleDelete();
		}
	}

	handleEdit() {
		this.setState({ editButtonClicked: true });
	}

	handleUpdate(product) {
		const currentProduct = this.state.currentProduct;
		fetch( 'api/products/' + currentProduct.id, {
		    method:'put',
		    headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify(product)
		})
		.then(response => {
		    return response.json();
		})
		.then( data => {
		    /* Updating the state */
		    var array = this.state.products.filter(function(item) {
		      return item !== currentProduct
		  })
		    this.setState((prevState)=> ({
		        products: array.concat(product),
		        currentProduct : product,
		        editButtonClicked: false
		    }))
		}) 
	}

	handleReturn() {
		this.setState({ editButtonClicked: false });
	}


	render() {
		/* Some css code has been removed for brevity to css/app.css file */
		return (
			<div>
				<div className='mainDivStyle pull-left'>
					<div className='divStyle col-sm-2 pull-left'>
						<h3> All products </h3>
						<ul>{ this.renderProducts() }</ul> 
					</div>

					{this.state.editButtonClicked === true ? (
            			<EditProduct
              				product={this.state.currentProduct}
              				update={this.handleUpdate}
              				handleReturn={this.handleReturn}
            			/>
          			) : (
          			<React.Fragment>
						<Product 
							product={this.state.currentProduct}
							handleDelete={this.handleDelete}
							handleDeleteConfirmation={this.handleDeleteConfirmation}
							handleEdit={this.handleEdit}
							// handleReturn={this.handleReturn} 
						/>
						<AddProduct onAdd={this.handleAddProduct} />
					</React.Fragment>
					)}
				</div>
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