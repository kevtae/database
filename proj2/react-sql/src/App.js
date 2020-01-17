import React, {Component} from 'react';
import { Icon, Label, Menu, Table, Tab } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';



class App extends Component{
  state = {
    CD: [],
    producer:[],
    // supplier:[],
    customer:[],
    vip:[],
    rent:[],
    customerDue:[],
    producerDue:[],
    producer_add:{
      name:'',
      address:''
    },
    CD_add:{
      title: '',
      year: '',
      type: '',
      name_producer:'',
      supplier:''
    },
    customer_add:{
      SSN: '',
      name: '',
      telephone: '',
      title:'',
      date:'',
      period:''
    },
    vip_add:{
      ssn: '',
      startinDate: '',
      discount: '',
      title:'',
      date:'',
      period:''
    },
    customerDue_search:{
      title:'',
      date:''
    },
    producerDue_search:{
      artist:'',
      year:''
    }

  }

  componentDidMount(){
    this.getProducer();
    // this.getSupplier();
    this.getCD();
    // this.getRent();
    this.getCustomer();
    this.getVip();
    this.CustomerDue();
    this.producerDue();
  }

  getProducer = _ => {
    fetch('http://localhost:4000/producer')
      .then(response => response.json())
      .then(response => this.setState({producer:response.data}))
      .catch(err => console.error(err))
  }

  // getSupplier = _ => {
  //   fetch('http://localhost:4000/supplier')
  //     .then(response => response.json())
  //     .then(response => this.setState({supplier:response.data}))
  //     .catch(err => console.error(err))
  // }

  getCD = _ => {
    fetch('http://localhost:4000/CD')
      .then(response => response.json())
      .then(response => this.setState({CD:response.data}))
      .catch(err => console.error(err))
  }

  getCustomer = _ => {
    fetch('http://localhost:4000/customer')
      .then(response => response.json())
      .then(response => this.setState({customer:response.data}))
      .catch(err => console.error(err))
  }

  getVip = _ => {
    fetch('http://localhost:4000/vip')
      .then(response => response.json())
      .then(response => this.setState({vip:response.data}))
      .catch(err => console.error(err))
  }

  CustomerDue = _ => {
    const {customerDue_search} = this.state
    fetch(`http://localhost:4000/customerDue?title=${customerDue_search.title}&date=${customerDue_search.date}`)
      .then(response => response.json())
      .then(response => this.setState({customerDue:response.data}))
      .catch(err => console.error(err))
  }

  producerDue = _ => {
    const {producerDue_search} = this.state
    fetch(`http://localhost:4000/producerDue?artist=${producerDue_search.artist}&year=${producerDue_search.year}`)
      .then(response => response.json())
      .then(response => this.setState({producerDue:response.data}))
      .catch(err => console.error(err))
  }

  addCD = () =>{
    const {CD_add} = this.state;
    fetch(`http://localhost:4000/addCD?title=${CD_add.title}&year=${CD_add.year}&type=${CD_add.type}&name_producer=${CD_add.name_producer}&supplier=${CD_add.supplier}`)
      .then(this.getCD)
      .catch(err => console.error(err))
  }

  addCustomer = () =>{
    const {customer_add} = this.state;
    fetch(`http://localhost:4000/addCustomer?ssn=${customer_add.ssn}&name=${customer_add.name}&telephone=${customer_add.telephone}&title=${customer_add.title}&date=${customer_add.date}&period=${customer_add.period}`)
      .then(this.getCustomer)
      .catch(err => console.error(err))
  }


  addproducer = () =>{
    const {producer_add} = this.state;
    fetch(`http://localhost:4000/addProducer?name=${producer_add.name}&address=${producer_add.address}`)
      .then(this.getProducer)
      .catch(err => console.error(err))
  }

  addVip = () =>{
    const {vip_add} = this.state;
    fetch(`http://localhost:4000/addVip?ssn=${vip_add.ssn}&startingDate=${vip_add.startinDate}&discount=${vip_add.discount}&title=${vip_add.title}&date=${vip_add.date}&period=${vip_add.period}`)
      .then(this.getVip)
      .catch(err => console.error(err))
  }

  // renderProducer = ({CD_id, title, year, type, name_producer}) => <div key={CD_id}>{title} {year} {type} {name_producer}</div>
  // renderProducer= ({producer_id, name, address}) => <div key={producer_id}>{name}   {address}</div>
  // renderProducer= ({supplier_id, name, address}) => <div key={supplier_id}>{name}   {address}</div>
r
  renderProducerPagination(){
    const {producer,producer_add} = this.state;
      return(
        <div>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Address</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
        
          <Table.Body>
          {producer.map(row => (
            <Table.Row key={row.name}>
              <Table.Cell align ="center" component="th" scope="row">
                {row.name}
              </Table.Cell>
              <Table.Cell align="center">{row.address}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        
          </Table>
          </div>
      )}

    // renderSupplier(){
    //     const {supplier,supplier_add} = this.state;
    //       return(
    //         <div>
    //           <Table celled>
    //             <Table.Header>
    //               <Table.Row>
    //                 <Table.HeaderCell>Name</Table.HeaderCell>
    //                 <Table.HeaderCell>Address</Table.HeaderCell>
    //               </Table.Row>
    //             </Table.Header>
            
    //           <Table.Body>
    //           {supplier.map(row => (
    //             <Table.Row key={row.name}>
    //               <Table.Cell align ="center" component="th" scope="row">
    //                 {row.name}
    //               </Table.Cell>
    //               <Table.Cell align="center">{row.address}</Table.Cell>
    //             </Table.Row>
    //           ))}
    //         </Table.Body>
            
    //           </Table>
    //           </div>
    //       )}

          renderCD(){
            const {CD,CD_add} = this.state;
              return(
                <div>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Year</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>producer</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                
                  <Table.Body>
                  {CD.map(row => (
                    <Table.Row key={row.title}>
                      <Table.Cell align ="center">
                        {row.title}
                      </Table.Cell>
                      <Table.Cell align="center">{row.year}</Table.Cell>
                      <Table.Cell align="center">{row.type}</Table.Cell>
                      <Table.Cell align="center">{row.name_producer}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
                
                  </Table>
                  </div>
              )}


              renderCustomer(){
                const {customer,customer_add} = this.state;
                  return(
                    <div>
                      <Table celled>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>SSN</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Telephone</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                    
                      <Table.Body>
                      {customer.map(row => (
                        <Table.Row key={row.ssn}>
                          <Table.Cell align ="center">
                            {row.ssn}
                          </Table.Cell>
                          <Table.Cell align="center">{row.name}</Table.Cell>
                          <Table.Cell align="center">{row.telephone}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                    
                      </Table>
                      </div>
                  )}

                  renderVip(){
                    const {vip,vip_add} = this.state;
                      return(
                        <div>
                          <Table celled>
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell>SSN</Table.HeaderCell>
                                <Table.HeaderCell>startingDate</Table.HeaderCell>
                                <Table.HeaderCell>discount</Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>
                        
                          <Table.Body>
                          {vip.map(row => (
                            <Table.Row key={row.vip_ssn}>
                              <Table.Cell align ="center">
                                {row.vip_ssn}
                              </Table.Cell>
                              <Table.Cell align="center">{row.startingDate}</Table.Cell>
                              <Table.Cell align="center">{row.discount}</Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                        
                          </Table>
                          </div>
                      )}

                      renderCustomerDue(){
                        const {customerDue} = this.state;
                          return(
                            <div>
                              <Table celled>
                                <Table.Header>
                                  <Table.Row>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Telephone</Table.HeaderCell>
                                  </Table.Row>
                                </Table.Header>
                            
                              <Table.Body>
                              {customerDue.map(row => (
                                <Table.Row key={row.name}>
                                  <Table.Cell align ="center">
                                    {row.name}
                                  </Table.Cell>
                                  <Table.Cell align="center">{row.telephone}</Table.Cell>
                                </Table.Row>
                              ))}
                            </Table.Body>
                            
                              </Table>
                              </div>
                          )}

                          renderProducerDue(){
                            const {producerDue} = this.state;
                              return(
                                <div>
                                  <Table celled>
                                    <Table.Header>
                                      <Table.Row>
                                        <Table.HeaderCell>Name</Table.HeaderCell>
                                        <Table.HeaderCell>address</Table.HeaderCell>
                                      </Table.Row>
                                    </Table.Header>
                                
                                  <Table.Body>
                                  {producerDue.map(row => (
                                    <Table.Row key={row.name}>
                                      <Table.Cell align ="center">
                                        {row.name}
                                      </Table.Cell>
                                      <Table.Cell align="center">{row.address}</Table.Cell>
                                    </Table.Row>
                                  ))}
                                </Table.Body>
                                
                                  </Table>
                                  </div>
                              )}

  
  

  
  render(){
    const {CD,CD_add} = this.state;
    const {producer,producer_add} = this.state;
    const {supplier, supplier_add} = this.state;
    const{customer, customer_add} = this.state;
    const{vip, vip_add } = this.state;
    const{customerDue_search} = this.state;
    const{producerDue_search}= this.state;

    return(
    <div>
      <div>
      <h1 id='title' align='center'>Producer</h1>
          {' '}
          {this.renderProducerPagination()}
          {' '}
      </div>
        

        <div align='center'> 
          <div class="ui input focus">
          <input 
            type="text" placeholder="name"
            value ={producer_add.name} 
            onChange={e=>this.setState({producer_add:{...producer_add, name: e.target.value}})}></input>
          </div>
          <div class="ui input focus">
          <input 
            type="text" placeholder="address"
            value ={producer_add.address}
            onChange={e=>this.setState({producer_add:{...producer_add, address: e.target.value}})}></input>
          </div>
          <button class="ui primary basic button" onClick = {this.addproducer}>Add Producer</button>
        </div>

        <div>
          {''}
        </div>

        <div>
        {/* {this.renderPagination()} */}
      </div>

      {/* <div>
      <h1 id='title' align='center'>Supplier</h1>
          {' '}
          {this.renderSupplier()}
          {' '}
      </div> */}

      <div>
      <h1 id='title' align='center'>CD</h1>
          {' '}
          {this.renderCD()}
          {' '}
      </div>

      <div align='center'> 
          <div class="ui input focus">
          <input 
            type="text" placeholder="title"
            value ={CD_add.title} 
            onChange={e=>this.setState({CD_add:{...CD_add, title: e.target.value}})}></input>
          <input 
            type="text" placeholder="year"
            value ={CD_add.year} 
            onChange={e=>this.setState({CD_add:{...CD_add, year: e.target.value}})}></input>
             <input 
            type="text" placeholder="type"
            value ={CD_add.type} 
            onChange={e=>this.setState({CD_add:{...CD_add, type: e.target.value}})}></input>
             <input 
            type="text" placeholder="producer"
            value ={CD_add.name_producer} 
            onChange={e=>this.setState({CD_add:{...CD_add, name_producer: e.target.value}})}></input>
             <input 
            type="text" placeholder="supplier"
            value ={CD_add.supplier} 
            onChange={e=>this.setState({CD_add:{...CD_add, supplier: e.target.value}})}></input>
          </div>
  
          <button class="ui primary basic button" onClick = {this.addCD}>Add CD</button>
        </div>

      <div>
      <h1 id='title' align='center'>Customer</h1>
          {' '}
          {this.renderCustomer()}
          {' '}
      </div>
      
      <div align='center'> 
          <div class="ui input focus">
          <input 
            type="text" placeholder="ssn"
            value ={customer_add.ssn} 
            onChange={e=>this.setState({customer_add:{...customer_add, ssn: e.target.value}})}></input>
          <input 
            type="text" placeholder="name"
            value ={customer_add.name} 
            onChange={e=>this.setState({customer_add:{...customer_add, name: e.target.value}})}></input>
             <input 
            type="text" placeholder="telephone"
            value ={customer_add.telephone} 
            onChange={e=>this.setState({customer_add:{...customer_add, telephone: e.target.value}})}></input>
             <input 
            type="text" placeholder="title"
            value ={customer_add.title} 
            onChange={e=>this.setState({customer_add:{...customer_add, title: e.target.value}})}></input>
             <input 
            type="text" placeholder="date(xxxx-xx-xx) DUE"
            value ={customer_add.date} 
            onChange={e=>this.setState({customer_add:{...customer_add, date: e.target.value}})}></input>
             <input 
            type="text" placeholder="period"
            value ={customer_add.period} 
            onChange={e=>this.setState({customer_add:{...customer_add, period: e.target.value}})}></input>
          </div>
  
          <button class="ui primary basic button" onClick = {this.addCustomer}>Add Customer</button>
        </div>

        <div>
      <h1 id='title' align='center'>VIP</h1>
          {' '}
          {this.renderVip()}
          {' '}
      </div>
      
      <div align='center'> 
          <div class="ui input focus">
          <input 
            type="text" placeholder="ssn"
            value ={vip_add.ssn} 
            onChange={e=>this.setState({vip_add:{...vip_add, ssn: e.target.value}})}></input>
          <input 
            type="text" placeholder="startingDate"
            value ={vip_add.startinDate} 
            onChange={e=>this.setState({vip_add:{...vip_add, startinDate: e.target.value}})}></input>
             <input 
            type="text" placeholder="discount"
            value ={vip_add.discount} 
            onChange={e=>this.setState({vip_add:{...vip_add, discount: e.target.value}})}></input>
             <input 
            type="text" placeholder="title"
            value ={vip_add.title} 
            onChange={e=>this.setState({vip_add:{...vip_add, title: e.target.value}})}></input>
             <input 
            type="text" placeholder="date(xxxx-xx-xx) borrowed"
            value ={vip_add.date} 
            onChange={e=>this.setState({vip_add:{...vip_add, date: e.target.value}})}></input>
             <input 
            type="text" placeholder="period"
            value ={vip_add.period} 
            onChange={e=>this.setState({vip_add:{...vip_add, period: e.target.value}})}></input>
          </div>
  
          <button class="ui primary basic button" onClick = {this.vip_add}>Add VIP</button>
        </div>

        <div>
       <h1 id='title' align='center'>Customer Due</h1>
          {' '}
          {this.renderCustomerDue()}
          {' '}
      </div>

      <div align='center'> 
          <div class="ui input focus">
          <input 
            type="text" placeholder="title"
            value ={customerDue_search.title} 
            onChange={e=>this.setState({customerDue_search:{...customerDue_search, title: e.target.value}})}></input>
          <input 
            type="text" placeholder="date"
            value ={customerDue_search.date} 
            onChange={e=>this.setState({customerDue_search:{...customerDue_search, date: e.target.value}})}></input>
          </div>
  
          <button class="ui primary basic button" onClick = {this.CustomerDue}>Search customer</button>
        </div>

        <div>
       <h1 id='title' align='center'>producer info</h1>
          {' '}
          {this.renderProducerDue()}
          {' '}
      </div>

      <div align='center'> 
          <div class="ui input focus">
          <input 
            type="text" placeholder="artist"
            value ={producerDue_search.artist} 
            onChange={e=>this.setState({producerDue_search:{...producerDue_search, artist: e.target.value}})}></input>
          <input 
            type="text" placeholder="year"
            value ={producerDue_search.year} 
            onChange={e=>this.setState({producerDue_search:{...producerDue_search, year: e.target.value}})}></input>
          </div>
  
          <button class="ui primary basic button" onClick = {this.producerDue}>Search producer</button>
        </div>





      </div>
    );
  }
}

export default App;
