from model.component_block import Block
import pickle

class HandleModelImport(Block):
    def __init__(self, type=None, data_in_stream=None):
        super().__init__(type, data_in_stream)
    
    def inStream(self):
        location = self.getData_in_stream()
        loaded_model = pickle.load(open(location,"rb")) 
        
        self._saveToOutstream(loaded_model)
        return super().inStream()