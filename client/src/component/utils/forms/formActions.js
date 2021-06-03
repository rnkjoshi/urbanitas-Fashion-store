
export const validate = (element,formdata=[]) => {

    let error = [true,''];

    if(element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = `${!valid ? 'must be a valid email' : ''}`;
        error = !valid ? [valid,message] : error;
    }

    if(element.validation.confirm){
        const valid = element.value.trim() === formdata[element.validation.confirm].value;
        const message = `${!valid ? 'Password do not match' : ''}`;
        error = !valid ? [valid,message] : error;
    }

    if(element.validation.required){
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'this field is required' : ''}`;
        error = !valid ? [valid,message] : error;
    }
    return error
}

export const update = (element,formdata,formName) =>{
    const newFormdata = {
        ...formdata
    }
    const newElements = {
        ...newFormdata[element.id]
    }
    //console.log(newElements);
    newElements.value = element.event.target.value;

    if(element.blur){
        let validData = validate(newElements,formdata);
        newElements.valid = validData[0];
        newElements.validationMessage = validData[1];
    }
    newElements.touched = element.blur;
    newFormdata[element.id] = newElements;

    return newFormdata
}

export const generateData = (formdata,formName) => {
    let dataToSubmit = {};
    for(let key in formdata){
        if(key !== 'confirmPassword')
            dataToSubmit[key]=formdata[key].value;
    }
    return dataToSubmit;
}
export const isFormValid = (formdata,formName) => {
    let formIsValid = true;
    //console.log(formdata)
    for(let key in formdata){
        console.log(formdata[key].config.name + "="+formdata[key].valid)
        formIsValid = formdata[key].valid && formIsValid
    }
    return formIsValid
}