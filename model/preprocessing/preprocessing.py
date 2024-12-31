from model.component_block import Block
import sklearn as sk
import pandas as pd
from pandas.api.types import is_string_dtype
from pandas.api.types import is_numeric_dtype

class PreProcessing(Block):
    def __init__(self, type, data_in_stream):
        super().__init__(type, data_in_stream)
        # self.numeric_columns = []
        # self.categorical_columns = []


""" redo this, what if we get multiple datasets such as train, test sets """
    
    # def inStream(self):
    #     df = self.data_in_stream
    #     columns = df.columns

    #     for column in columns:
    #         if is_string_dtype(df[column]):
    #             self.categorical_columns.append(column)

    #         elif is_numeric_dtype(df[column]):
    #             self.numeric_columns.append(column)
        
    #     return df
    
    