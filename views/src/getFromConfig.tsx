import {default as config} from "./config.json";

let expandables:string[] = [];

export function getConfig(){
    return config;
}

export function getTypes(){
    return config["types"];
}

export function getImports(){
    return config["Imports"];
}

export function getMLModels(){
    return config["ML Models"];
}

export function getDataSpliters(){
    return config["Data Spliters"];
}

export function getMergeData(){
    return config["Merge Data"];
}

export function getHyerparameterTuners(){
    return config["Hyerparameter Tuners"];
}

export function getDataCleaners(){
    return config["Data Cleaners"];
}

export function getDataPreProcessers(){
    return config["Data PreProcessers"];
}

export function getOutputs(){
    return config["Outputs"];
}

function writeToExpandable(){
    
    // "Expandables": ["Dataset", "Trained Model", "Train-Test Split", "Remove Column", "Remove Row"]
    
    // we want everything from imports to be an expandable
    let imports = getImports();
    for(let i = 0; i<imports.length; i++){
        let item = imports[i];
        expandables.push(item);
    }

    // at the time of writing this code we want all the items from DataSpliters to be an expandable
    let traintestspilts = getDataSpliters();
    for(let i = 0; i<traintestspilts.length; i++){
        let item = traintestspilts[i];
        expandables.push(item);
    }

    // at the time of writing this code we want Remove rows and column to be an expandable
    expandables.push(getSpecificItemRemoveColumn());
    expandables.push(getSpecificItemRemoveRow());

}
export function getExpandables(){
    writeToExpandable();
    return expandables;
}

export function getSpecificItemRemoveColumn(){
    return getDataCleaners()[0];
}

export function getSpecificItemRemoveRow(){
    return getDataCleaners()[1];
}

export function getSpecificItemTrainTestSpilt(){
    return getDataSpliters()[0];
}

export function getHirearchy(){
    return config["Hirearchy"];
}


