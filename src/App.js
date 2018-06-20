import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import './App.css';
import clients from './clients.json';

function searchingFor(term) {
  return function(x) {
    return x.general.firstName.toLowerCase().includes(term.toLowerCase()) || !term;
  }
}
function clientDetail (id)  {
  
  let client = clients.find(data => data.id == id)
  renderClient(client)
  
 
}
function renderClient(client) {
  const detail =  <div className='detail-client'>
  <div >
 <h1>General</h1>
 <img src={client.general.avatar}/>
 <h4>{client.general.firstName}</h4>
 <h4>{client.general.lastName}</h4>
</div>
<div>
<h1>Contact</h1>

<h4>{client.contact.email}</h4>
<h4>{client.contact.phone}</h4>
</div>
<div>
 <h1>Job</h1>
 
 <h4>{client.job.company}</h4>
 <h4>{client.job.title}</h4>
</div>
<div>
<h1>Address</h1>
<h4>{client.address.country}</h4>
<h4>{client.address.zipCode}</h4>
<h4>{client.address.city}</h4>
<h4>{client.address.street}</h4>
</div></div>;
ReactDOM.render(detail, document.getElementById('detail'))
}
  
  


class App extends Component {
  constructor(props){
    super(props);

      this.state = {
        clients: clients,
        term: '',
      }
      this.searchHandler = this.searchHandler.bind(this);
    }

    searchHandler(event) {
      this.setState({term: event.target.value})
    }
    
  render() {
    const {term, clients} = this.state;
    
    return (
      <div className="App">
      
      <form>
        
        <input type='text'
                onChange={this.searchHandler}
                value={term}
                className='input-b'
        />
       
      </form>
        {
                    clients.filter(searchingFor(term)).map(function(client, index){
                        client.id = Date.now() + index;
                        
                        return (
                            <div  key={client.id} onClick={(e)=> clientDetail(client.id)}>

                                 <img src={client.general.avatar} alt='s'/>
                                 <h3>{client.general.firstName}</h3>
                                 <h4>{client.job.company}</h4>
                                 <hr/> 
                            </div> 
                        )
                    })
                }
      </div>
    );
  }
}

export default App;
