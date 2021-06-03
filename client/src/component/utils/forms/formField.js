import React from 'react';

const FormField = ({id,formdata,change}) => {
    
    const showError = () => {
        let errorMessage = null;
        if(formdata.validation && !formdata.valid){
            errorMessage=(
                <div className="error_label">
                    {formdata.validationMessage}
                </div>
            )
        }
        return errorMessage
    }
    const renderTemplate=()=>{
        let formtemplate='';
        switch(formdata.element){
            case 'input':
                formtemplate = (
                    <div className="formBlock">
                        <input
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={(event)=>change({event,id,blur:true})}
                            onChange ={(event)=>change({event,id})}
                        />
                        {showError()}
                    </div>
                )
                break;
                case 'select':
                    formtemplate = (
                        <div className="formBlock">
                            <select 
                                value={formdata.value}
                                onBlur={(event)=>change({event,id,blur:true})}
                                onChange ={(event)=>change({event,id})}
                                name = {formdata.config.name}
                            >
                                {formdata.config.options.map((item,i)=>(
                                    <option key={i} value={item.val}>
                                        {item.text}
                                    </option>
                                ))}

                            </select>
                        </div>
                    )
                break;
            default:
                formtemplate ='';
        }
        return formtemplate;
    }
    
    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

export default FormField;