import React, {useState, useEffect} from "react";
import Home from './components/Home'
import Form from './components/Form'
import {Route, Switch, Link} from 'react-router-dom'
import {v4 as uuid} from 'uuid'
import * as yup from 'yup'
import formSchema from './validation/formSchema'

const initialOrder = [
  {
    id: uuid(),
    name:'Virginia',
    size:'small',
    toppings:[
      "pepperoni",
      "blackOlives",
      "sausage",
      "greenChile",
    ],
    substitute: false,
    instructions: ''
  }

]

function fetchOrder(){
  return Promise.resolve({success:true, initialOrder})
}

const initialFormValues = {
  //text input
  name: '',
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
  name:'',
}
const initialDisabled = true 

const App = () => {

  const[order, setOrder]=useState(initialOrder)
  const[formValues, setFormValues]= useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)
  

  useEffect(() => {
    fetchOrder().then(res => setOrder(res.initialOrder))
  })

  const onInputChange = evt => {
    const {name} = evt.target.name
    const {value} = evt.target.value

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
    setFormValues({...formValues, [name]: value})
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
      name: formValues.name.trim(),
      size: formValues.size,
      toppings: Object.keys(formValues.toppings)
        .filter(topping => formValues.toppings[topping] === true)
    }
    //postNewOrder(newOrder)
  }


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
    </div>
  );
};
export default App;
