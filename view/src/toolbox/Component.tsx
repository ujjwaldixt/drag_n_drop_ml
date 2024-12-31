import React from 'react';
import ComponentButton from './ComponentButton';

interface Props{
    source_subheading: String;
}


const Component: React.FC<Props> = ({source_subheading}) => {
    
    return (
            <div className="Component">
                <div className="Component-Buttons"> <ComponentButton button_name={source_subheading}/> </div>        
            </div>
    );
}

export default Component;