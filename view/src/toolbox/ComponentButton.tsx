

interface Props{
    button_name: String;
}

const ComponentButton: React.FC<Props> = ({button_name}) => {
    
    function handleOnDrag(e:React.DragEvent, dragged_component:String){
        e.dataTransfer.setData("dragged_component", dragged_component as string);
        e.dataTransfer.setData("type", "new_component"); 
    }
    

    return(
        <div className="component-button"> 
            <button draggable onDragStart={(e) => handleOnDrag(e, button_name)}>  
                <span className="component-button-span"> {button_name} </span>
            </button> 
        </div>
    );

}

export default ComponentButton;