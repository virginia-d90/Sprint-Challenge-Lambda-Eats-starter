import React from 'react'

const Form = (props) => {
    const {
        values,
        onInputChange,
        onCheckboxChange,
        onSubmit,
        errors,
        disabled,
    } = props

    return (
        <>
            <h2>Build Your Own Pizza</h2>
            <div className='order container' onSubmit={onSubmit}>
                <h3>Bulid Your Own Pizza</h3>
                <label>Name:&nbsp;
                    <input
                        type='text'
                        placeholder='name'
                        maxLength='30'
                        name='name'
                        value={values.name}
                        onChange={onInputChange}
                    />
                </label>  
                <label>Size:&nbsp;
                    <select name='size' value={values.size} onChange={onInputChange}>
                        <option value=''> Select a Size</option>
                        <option value='Small'>Small</option>
                        <option value='Medium'>Medium</option>
                        <option value='Large'>Large</option>
                    </select>
                </label>
                <div className='form-group checkboxes'>
                    <label>Pepperoni&nbsp;
                        <input
                            type='checkbox'
                            name='pepperoni'
                            checked={values.toppings.pepperoni}
                            onChange={onCheckboxChange}
                        />
                    </label>
                    <label>Black Olives&nbsp;
                        <input
                            type='checkbox'
                            name='blackOlives'
                            checked={values.toppings.blackOlives}
                            onChange={onCheckboxChange}
                        />
                    </label>
                    <label>sausage&nbsp;
                        <input
                            type='checkbox'
                            name='sausage'
                            checked={values.toppings.sausage}
                            onChange={onCheckboxChange}
                        />
                    </label>
                    <label>Green Chile&nbsp;
                        <input
                            type='checkbox'
                            name='greenChile'
                            checked={values.toppings.greenChile}
                            onChange={onCheckboxChange}
                        />
                    </label>
                </div>
                <label>Additional Instructions:&nbsp;
                    <input
                        type='text'
                        placeholder='instructions'
                        maxLength='200'
                        name='instructions'
                        value={values.instructions}
                        onChange={onInputChange}
                    />
                </label> 
                <div className='errors'>{errors.name}</div>
                <button disabled={disabled}>Submit</button>
            </div>
        </>

    )
}
export default Form