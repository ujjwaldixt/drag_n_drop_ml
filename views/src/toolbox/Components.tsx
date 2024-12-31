import React from 'react';
import {getConfig } from "../getFromConfig";
import Component from './Component';

interface Props{
    source_heading: keyof typeof getConfig;
}


const Components: React.FC<Props> = ({source_heading}) => {
    let subheading:String[] = getConfig()[source_heading];
    
    return (
        <li>
            <div className="Component">
                <span className="Component-Heading"> {source_heading} </span>
                <hr/>
                <div className="Component-Content">
                    
                        {subheading.map(
                            (subheading, index) => (
                                <Component key={index} source_subheading={subheading}/>
                            )
                        )}
                </div>             
            </div>
        </li>
    );
}

export default Components;