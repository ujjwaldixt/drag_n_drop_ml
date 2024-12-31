
import {getTypes, getConfig } from "../getFromConfig";
import Components from "./Components";


function ToolBox() {
    let sources:string[] = getTypes();
    
    return (
        <div className="Components">
            <ul>
                    {sources.map(
                        (source, index) => (
                            <Components key={index} source_heading={source as keyof typeof getConfig}/>
                        )
                    )}
            </ul>
             
        </div>
    );
}
export default ToolBox;