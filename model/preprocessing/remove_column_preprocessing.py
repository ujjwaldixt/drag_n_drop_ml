from model.component_block import Block

class RemoveColumns(Block):
    def __init__(self, type=None, data_in_stream=None):
        super().__init__(type, data_in_stream)
        # self.columns = list(self.__data_in_stream.columns)
    
    def action(self, col_to_be_removed):
        df = self.getData_in_stream()["data"]
        df.drop(col_to_be_removed, axis=1, inplace=True)
        self._saveToOutstream(df)
        
        return super().action()
    
