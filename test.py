from model.input_block.data_import.inputData import InputData
from model.data_split.train_test_split import TrainTestSplit
from model.ml_model.create_model import BuildModel
from model.preprocessing.remove_column_preprocessing import RemoveColumns
from model.Link import Link
from model.output_block.save import SaveOutput
from model.input_block.import_model.handleModelImport import HandleModelImport
import json
if __name__ == "__main__":
    with open("config.json") as f:
        config = json.load(f)
        
    IMPORT = config["types"][0]
    DATASET_FILE_LOCATION = "/Users/bhavanasamudrala/Documents/Ujjwal/drag_n_drop_ml/sample_dataset.xlsx"
    input_data = InputData(IMPORT, DATASET_FILE_LOCATION)
    input_data.inStream()

    
    DATASET = input_data.outStream()
    SOURCE = config["types"][1]
    pre_processing_remove_column = RemoveColumns()

    link_dataset_to_removeColumns_block = Link(input_data, pre_processing_remove_column)
    link_dataset_to_removeColumns_block.connect(SOURCE, DATASET)

    pre_processing_remove_column.action(["X1"])

    DATASET = pre_processing_remove_column.outStream()
    SOURCE = config["types"][2]
    train_test_split = TrainTestSplit()

    link_dataset_block_split_block = Link(pre_processing_remove_column, train_test_split)
    link_dataset_block_split_block.connect(SOURCE, DATASET)

    train_test_split.action(output_col="Y", split_size=0.1)

    NEW_DATASET = train_test_split.outStream()
    splitted_data = NEW_DATASET["data"]
    X_train, y_train, X_test, y_test = splitted_data["X_train"], splitted_data["y_train"], splitted_data["X_test"], splitted_data["y_test"]
    
    DATASET = {"source": NEW_DATASET["source"], "data": (X_train, y_train)}
    SOURCE = config["types"][-2]
    ml_model = BuildModel()

    link_training_dataset_to_model = Link(train_test_split, ml_model)
    link_training_dataset_to_model.connect(SOURCE, DATASET)

    MODEL_NAME = config["models"][-1]
    ml_model.action(MODEL_NAME)

    DATASET = ml_model.outStream()
    SOURCE = config["types"][-1]
    output = SaveOutput()

    # link_dataset_to_output = Link(input_data, output)
    # link_dataset_to_output.connect("import", DATASET)

    # output.action("training set")

    link_dataset_to_output = Link(DATASET, output)
    link_dataset_to_output.connect(SOURCE, DATASET)

    output.action("ml_model")

    DATASET = "/Users/bhavanasamudrala/Documents/Ujjwal/drag_n_drop_ml/ml_model.sav"
    SOURCE = config["types"][0]
    model_import = HandleModelImport(SOURCE, DATASET)
    model_import.inStream()

    DATASET = model_import.outStream()
    print(DATASET)

    








    
    

    
    