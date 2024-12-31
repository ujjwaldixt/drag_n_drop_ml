
import {useState} from "react";
import ComponentBlock from "./ComponentBlock";
import { getHirearchy } from "../getFromConfig";
import Line from "./Line";


interface StrIntObj{
    [key: string]: number;
}
interface StrCordObj{
    [key: string]: [number, number];
}

class Component{
    constructor(name:string){
        
    }
}


function Workspace(){

    const [componentTypeOnScreenCount, setComponentTypeOnScreenCount] = useState<StrIntObj>({});
    const [componentCoordinateList, setComponentCoordinateList] = useState<StrCordObj[]>([]);
    
    const [link, setLink] = useState<StrCordObj[]>([]);
    const [links, setLinks] = useState<StrCordObj[][]>([]);

    let previous_Selected_item = "";

    function handleOnDrop(e: React.DragEvent) { 
        let  componentCoordinate:StrCordObj = {};

        let dragged_component:string = e.dataTransfer.getData("dragged_component");
        let type = e.dataTransfer.getData("type");

        if (type === "new_component"){
            dragged_component = dragged_component + "_on-screen";

            if(dragged_component in componentTypeOnScreenCount){
                setComponentTypeOnScreenCount({
                    ...componentTypeOnScreenCount,
                    [dragged_component]: componentTypeOnScreenCount[dragged_component] + 1
                  });
                
                  dragged_component = dragged_component + `_${componentTypeOnScreenCount[dragged_component]+1}`;
                
            }
            else{
                setComponentTypeOnScreenCount({...componentTypeOnScreenCount,[dragged_component]: 1});
                dragged_component = dragged_component + "_" + 1;
            }
            
            componentCoordinate[dragged_component] = [e.clientX, e.clientY]; 
            setComponentCoordinateList(prev => [...prev , componentCoordinate]);
        }
        
        else if (type === "on-screen_component") {
            const draggedComponent = e.dataTransfer.getData("dragged_component");
            const indexToRemove = componentCoordinateList.findIndex(
                (item) => Object.keys(item)[0] === draggedComponent
            );

            let copy_of_links = links;
            for (let index = 0; index < copy_of_links.length; index++) {
                const element = copy_of_links[index];
                for(let i = 0; i < element.length; i++){
                    if(Object.keys(element[i])[0] === draggedComponent){
                       element[i][draggedComponent] = [e.clientX, e.clientY];
                       break;
                    }
                }
                
            }
        
            if (indexToRemove !== -1) {
                const updatedComponentCoordinateList = [...componentCoordinateList];
                updatedComponentCoordinateList[indexToRemove] = {
                    [draggedComponent]: [e.clientX, e.clientY]
                };
                setComponentCoordinateList(updatedComponentCoordinateList);
            }
        }
        
        

    }

    function handleDragOver(e: React.DragEvent){
        e.preventDefault();
    }

    function isCoordinatesOnBlock(X:number, Y:number, x:number, y:number): boolean {
        const block_width = 100;
        const block_hieght = 50;

        const X1 = X;
        const Y1 = Y;
        const X3 = X1 + block_width;
        const Y3 = Y1+block_hieght;

        return x > X1 && x < X3 && y > Y1 && y < Y3; 
    }

    function detectComponentBlock(x:number, y:number):number{
        for(let i = 0; i < componentCoordinateList.length; i++){
            const component_coordinate_info = componentCoordinateList[i];
            const [X, Y] = Object.values(component_coordinate_info)[0];
            if (isCoordinatesOnBlock(X, Y, x, y)) {
                return i;
            }
        }
        return -1; // not found
    }

    function handleOnClick(event : React.MouseEvent) {
        const [x, y] = [event.clientX, event.clientY];
        const clicked_block_index = detectComponentBlock(x, y);

        // when a block is detected
        if(clicked_block_index > -1 && event.shiftKey){
            let name = Object.keys(componentCoordinateList[clicked_block_index])[0];

            if(link.length === 1){
                
                let hirearchy = getHirearchy();
                let allowed_connections:string[] = hirearchy[previous_Selected_item as keyof typeof getHirearchy]; 
                let component_to_be_connected = name.split("_")[0];
                console.log(previous_Selected_item);
                console.log(component_to_be_connected);
                let isConnectionAllowed = false;
                if(previous_Selected_item === component_to_be_connected){
                    setLink([]);
                    alert(`Cannot self link`);
                    previous_Selected_item = "";
                    return;
                }
                for(let i = 0; i < allowed_connections.length; i++){
                    if(allowed_connections[i] === component_to_be_connected){
                        isConnectionAllowed = true;
                        link.push(componentCoordinateList[clicked_block_index]);
                        break;
                    }
                }

                if(!isConnectionAllowed){
                    setLink([]);
                    alert(`Information cannot flow from ${component_to_be_connected} down to ${previous_Selected_item} `);
                }
                previous_Selected_item = "";
            }

            if(link.length === 0 ){
                console.log(0);
                previous_Selected_item = name.split("_")[0];
                link.push(componentCoordinateList[clicked_block_index]);
            }
            // link.push(componentCoordinateList[clicked_block_index]);

            if(link.length === 2 ){
                setLinks(prev => [...prev, link]);
                setLink([]);
            }
        }

    }

    function isLinked(component_name:string):number[]{
        let indexs:number[] = []
        for (let i = 0; i < links.length; i++) {
           let linked_pair = links[i];
           for (let j = 0; j < linked_pair.length; j++){
            let  key = Object.keys(linked_pair[j])[0];
            if (key === component_name) {
                indexs.push(i);
            }
           }
            
        }
        return indexs
    }

    function handleOnDelete(e: React.DragEvent){
        const draggedComponent:string = e.dataTransfer.getData("dragged_component");
        if(e.dataTransfer.getData("type") === "on-screen_component"){

            const isComponentLinked = isLinked(draggedComponent);
            console.log(isComponentLinked);

            // if isComponentLinked is empty list then it is not attached to any item
            // if there is one or more indexs in the list we will delete elements at all those indexs.
            if (isComponentLinked.length > 0){
                let links_copy = links;

                for(let i = 0; i < isComponentLinked.length; i++){
                    const linkIndex = isComponentLinked[i] - i;
                    links_copy.splice(linkIndex, 1);
                }
                setLinks(links_copy);

            }
            
            const indexToRemove = componentCoordinateList.findIndex(
                (item) => Object.keys(item)[0] === draggedComponent
            );

            setComponentTypeOnScreenCount({
                ...componentTypeOnScreenCount,
                [draggedComponent]: componentTypeOnScreenCount[draggedComponent] - 1
            });

            let componentCoordinateList_copy = componentCoordinateList;
            componentCoordinateList_copy.splice(indexToRemove, 1);
            setComponentCoordinateList(componentCoordinateList_copy);
            
        }
        
    }

    return(
        <>
        <div className="DeleteComponent" onDrop={handleOnDelete} onDragOver={handleDragOver}> Delete </div>
        <div className="Canvas" onDrop={handleOnDrop} onDragOver={handleDragOver} onClick={(e) => handleOnClick(e)}>

            
            {
                componentCoordinateList.map((value, index) => (<ComponentBlock key={index} component_and_coordinate={value}/>))
            }

            { 
                links.map((value, index) => (
                        <Line key={index} 
                        x1={Object.values(value[0])[0][0]}
                        y1={Object.values(value[0])[0][1]}
                        x2={Object.values(value[1])[0][0]}
                        y2={Object.values(value[1])[0][1]} 
                        />
                    ))
            }

        </div>
        </>
        
    );

}

export default Workspace;
