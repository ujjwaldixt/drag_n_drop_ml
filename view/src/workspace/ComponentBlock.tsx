
import React from "react";
import ButtonModal from "./Modals/buttonModal";
import { getExpandables } from "../getFromConfig";
import 'bootstrap/dist/css/bootstrap.min.css'


interface Props{
    component_and_coordinate: { [key: string]: [number, number] };
}

const ComponentBlock: React.FC<Props> = ({component_and_coordinate}) =>  {

    const [modalShow, setModalShow] = React.useState(false);

    const name = Object.keys(component_and_coordinate)[0];
    const [x, y]= Object.values(component_and_coordinate)[0];

    const EXPANDABLES:string[] = getExpandables();
    let isModalButtonNeccessary = false; //if the button should be shown or not 


    function handleOnDrag(e:React.DragEvent, dragged_component:String){
        e.stopPropagation(); // Stop the propagation of the event
        e.dataTransfer.setData("dragged_component", dragged_component as string);
        e.dataTransfer.setData("type", "on-screen_component"); 
    }


    function handleOnClick(){
        setModalShow(true);
    }
    function handleOnHide(){
        setModalShow(false);
    }

    if (EXPANDABLES.includes(name.split("_")[0])){
        isModalButtonNeccessary = true;
    }

    return(
            <div 
                draggable 
                onDragStart={(e) => handleOnDrag(e, name)} 
                className={`Component-Block`} 
                style={{ left: x, top: y}} 
            >

                <span id={`${name}-span`}>{name.split("_")[0]}</span>


                {isModalButtonNeccessary ?
                <>
                    <button className="Expand-Component-Button" 
                        onClick={handleOnClick}
                    > 
                        ^ 
                    
                    </button> 

                    <ButtonModal
                    name = {name}
                    show={modalShow}
                    onHide={() => handleOnHide()}
                    />
                </>
                    : 
                    <></>
                }
                

                

            </div>
            
    );
}

export default ComponentBlock;