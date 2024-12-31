from model.component_block import Block
from model.input_block.data_import.handleDataImport import HandleDataImport
import pandas as pd

class InputData(Block):
    def __init__(self, type, data_in_stream):
        super().__init__(type, data_in_stream)
    
    def inStream(self):
        file = self.getData_in_stream()
        data_import = HandleDataImport(file)
        file_extension = data_import.getFileType()

        ## this method can be used to call function based on returned value from getFileType
        # read_data = getattr(pd, f"read_{file_extension}")
        # df = read_data(self.data_in_stream)

        if file_extension == '.csv':
            df = pd.read_csv(file)
        else:
            df = pd.read_excel(file)
        
        self._saveToOutstream(df) 
        
