import { useState } from 'react';
import { validar } from '../../helpers/validations';
import './form.css'

function Form() {


    const [input, setInput] = useState({
       name:"",
       lastName:"",
       description:"",
       image:"",
       nationality:"",
       birthDate: "",
    })

    const [errors, setErrors] = useState({
        name:"",
        lastName:"",
        description:"",
        image:"",
        nationality:"",
        birthDate: "",
     })


function handleChange(event) {
    setInput({
        ...input,
        [event.target.name]: event.target.value,
        });
    setErrors(validar({...input, [event.target.name]: event.target.value}))
    };



  return (
    <div className='form-container'>
      <form>
        <div>
            <label>Name</label>
            <input type="name" name='name' placeholder='Name' />
        </div>
        <div>
            <label>Last Name</label>
            <input type="lastName" name='lastName' placeholder='Last Name' />
        </div>
        <div>
            <label>Description</label>
            <input type="description" name='description' placeholder='Description' />
        </div>
        <div>
            <label>Image</label>
            <input type="text" name='image' placeholder='URL' />
        </div>
        <div>
            <label>Nationality</label>
            <input type="nationality" name='nationality' placeholder='Nationality' />
        </div>
        <div>
            <label>Birth Date</label>
            <input type="birthDate" name='birthDate' placeholder='Birth Date' />
        </div>
      </form>
    </div>
  )
}

export default Form;