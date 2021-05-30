import  React from 'react';
import axios from 'axios';
import './FoodTable.css'


class Basket extends React.Component {
  
    
  state = {
    items: [],
    term: '',
  };

  componentDidMount() {
    console.clear();
    let term = this.state.term;
    axios
      .get(`https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(term)}`, {
        headers: {
          "X-Api-Key": "9AWK9Jt/hdW4RBKFSPPApQ==zDIOA8e7Ci1fw8hJ"
        }
      })
      .then((response) => {
       console.log(response.data.items);
       this.setState({
          ...this.state,
          items: response.data.items
        });
       })
      .catch((error) => console.log(error.message));
    console.log(this.state.items);
    
  }
  
  fetchItems = () => {
    console.clear();
    let term = this.state.term;
    axios
      .get(`https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(term)}`, {
        headers: {
          "X-Api-Key": "9AWK9Jt/hdW4RBKFSPPApQ==zDIOA8e7Ci1fw8hJ"
        }
      })
      .then((response) => {
       console.log(response.data.items);
       this.setState({
          ...this.state,
          items: response.data.items
        });
       })
      .catch((error) => console.log(error.message));
    console.log(this.state.items);
  }
  
  getItems = () => {
    let items = [];
    this.state.items.map(item => {
      items.push(<Item 
                   result={this.props.result}
                   name={item.name}
                   calories={item.calories}
                   carbs={item.carbohydrates_total_g}
                   serve={item.serving_size_g}
                   cholesterol={item.cholesterol_mg}
                   fat_saturated={item.fat_saturated_g}
                   fat_total={item.fat_total_g}
                   fiber={item.fiber_g}
                   potassium={item.potassium_mg}
                   protein={item.protein_g}
                   sodium={item.sodium_mg}
                   sugar={item.sugar_g}
                   />);
    });
    
    return items;
  }
  
  storeValue = (searchValue) => {
    this.setState({
      ...this.state,
      term: searchValue
    });
    this.fetchItems();
    console.log(this.state.term)
  }
  
  storeClick = () => {
    this.fetchItems();
    console.log('click')
  }
  
  handleKeyDown = () => {
    
  }
  

  render() {
    console.log("im gonna update");
    const {result} = this.props;
    console.log(result)
    
      
    let allItems = this.getItems();
    return (
      <div className="basket">
        {console.log("im in child",this.result)}
        <Search result={result} sendValue={this.storeValue} sendEnter={this.storeClick} sendClick={this.storeClick} />
        
        <div className='items'>
          { allItems.length === 0 ? <div className='error'>No food found... <i class="fas fa-pizza-slice"></i></div> : allItems }
        </div>
        
      </div>
    );
  }
}

// Search component
class Search extends React.Component {
  
  handleChange = (e) => {
    this.props.sendValue(e.target.value);
  }
  keyDown = (event) => {
    if (event.key === 'Enter') {
      this.props.sendEnter();
      console.log('Enter')
    }
  }
  handleClick = () => {
    this.props.sendClick();
  }
  
  render() {
    
    
    return (
      <div className="search">
        <div className='search-box'>
          <input type='text' onChange={this.handleChange} onKeyDown={this.keyDown} placeholder='Enter food...' />
          <button onClick={this.handleClick} ><i class="fas fa-search"></i></button>
        </div>
      </div>
     )
  }
}


// Item component 
class Item extends React.Component {
  
  render() {
    const {result} = this.props;
    console.log("result in iTEM !!!",result)
    console.log("Item component updated");
    return (
      <div className='item'>
        <div className='item-top'>
          <div className='item-head'>
            <h4>{this.props.name}</h4>
          </div>
          
          <div className='item-content'>
            
            <div className='item-info'>
              <span className='item-info-a'>{this.props.calories}</span>
              <span className='item-info-b'>Calories</span>
            </div>
            
            <div className='item-info'>
              <span className='item-info-a'>{this.props.carbs}</span>
              <span className='item-info-b'>Carbs</span>
            </div>
            
            <div className='item-info'>
              <span className='item-info-a'>{this.props.serve}</span>
              <span className='item-info-b'>Serve (grams)</span>
            </div>
            
          </div>
        </div>
        
        <div className='item-bottom'>
          
          <div className='item-row'>
            <div className='item-row-a'>Per serving</div>
            <div className='item-row-b'>{this.props.serve}g</div>
          </div>
          
          <div className='item-row'>
            <div className='item-row-a'>Calories</div>
            <div className='item-row-b'>{this.props.calories}</div>
          </div>
          
          <div className='item-row'>
            <div className='item-row-a'>Carbs</div>
            <div className='item-row-b'>{this.props.carbs}g</div>
          </div>
          
          <div className='item-row'>
            <div className='item-row-a'>Cholesterol</div>
            <div className='item-row-b'>{this.props.cholesterol}mg</div>
          </div>
          
          <div className='item-row'>
            <div className='item-row-a'>Saturated fats</div>
            <div className='item-row-b'>{this.props.fat_saturated}g</div>
          </div>
          
          <div className='item-row'>
            <div className='item-row-a'>Total fats</div>
            <div className='item-row-b'>{this.props.fat_total}g</div>
          </div>
          
          <div className='item-row'>
            <div className='item-row-a'>Fiber</div>
            <div className='item-row-b'>{this.props.fiber}g</div>
          </div>
          
          <div className='item-row'>
            <div className='item-row-a'>Protein</div>
            <div className='item-row-b'>{this.props.protein}g</div>
          </div>
          
          <div className='item-row'>
            <div className='item-row-a'>Potassium</div>
            <div className='item-row-b'>{this.props.potassium}mg</div>
          </div>
          
          <div className='item-row'>
            <div className='item-row-a'>Sodium</div>
            <div className='item-row-b'>{this.props.sodium}mg</div>
          </div>
          
          <div className='item-row'>
            <div className='item-row-a'>Sugar</div>
            <div className='item-row-b'>{this.props.sugar}g</div>
          </div>
          
        </div>
      </div>
    )
  }
}

export default Basket;