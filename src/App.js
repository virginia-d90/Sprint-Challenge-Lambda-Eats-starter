import React, {useState, useEffect} from "react";
import Home from './components/Home'
import Form from './components/Form'
import {Route, Switch, Link} from 'react-router-dom'
import axios from 'axios'
import * as yup from 'yup'
import formSchema from './validation/formSchema'




const initialFormValues = {
  //text input
  first_name: '',
  //dropdown
  size:'',

  //checkbox
  toppings:{
    pepperoni: false,
    blackOlives: false,
    sausage: false,
    greenChile: false,

  },
  substitute: false,
  //text input
  instructions:'',
}

const initialFormErrors = {
  first_name:'',
  size:'',
  instructions:'',
}
const initialDisabled = true 

const App = () => {

  const[orders, setOrders]=useState([])
  const[formValues, setFormValues]= useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)
  
  // const getOrders = () => {
  //   axios.get('https://reqres.in/api/users')
  //     .then(res => {
  //       console.log(res)
  //       setOrders(res.data.data)
  //     })
  //     .catch(err => {
  //       console.log(err)  
  //     })
  // }

  const postNewOrder = newOrder => {
    axios.post('https://reqres.in/api/users', newOrder)
      .then(res => {
        console.log(orders, res.data)
        setOrders([...orders, res.data])
      })
      .catch(err => {
        console.log('post is broken')
      })
      .finally(() => {
        setFormValues(initialFormValues)
      })
  }


 

  const onInputChange = evt => {
    const name = evt.target.name
    const value = evt.target.value

    yup 
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: ''
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        })
      })
    setFormValues({
      ...formValues, 
      [name]: value
    })
  }

  const onCheckboxChange = evt => {
    const {name} = evt.target
    const {checked} = evt.target

    setFormValues({
      ...formValues,
      toppings: {
        ...formValues.toppings,
        [name]: checked,
      }
    })
  }
  
  const onSubmit = evt => {
    evt.preventDefault()

    const newOrder = {
      first_name: formValues.first_name.trim(),
      size: formValues.size,
      toppings: Object.keys(formValues.toppings)
        .filter(topping => formValues.toppings[topping] === true),
      instructions: formValues.instructions.trim()
    }

    postNewOrder(newOrder)
    console.log(newOrder)
  }

  // useEffect(() => {
  //   getOrders()
  // },[])


  useEffect(() => {
    formSchema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid)
      })
  },[formValues])


  return (
    <div className="App">
      <header className="App Header">
        <h1>Lambda Eats</h1>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/pizza'>Order</Link>
        </nav>
      </header>
      <Switch>
        <Route path='/pizza'>
          <Form 
            values={formValues} 
            onInputChange={onInputChange}
            onCheckboxChange={onCheckboxChange}
            onSubmit={onSubmit}
            errors={formErrors}
            disabled={disabled}
          />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
      {
        orders.map(order =>{
          return (
            <div key={order.id} className='order container'>
              <h4>{order.first_name} your order has been recieved</h4>
              
            </div>
          )
        })
      }
    </div>
  );
};
export default App;
