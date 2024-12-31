from Exceptions.NoDataAvailable import NoDataAvailable

class Block:
    def __init__(self, type = None, data_in_stream = None):
        self.__type = type
        self.__data_in_stream = data_in_stream
        self.__data_out_stream = None
    
    # This is a placeholder method that should be overridden by any subclass.
    def inStream(self):
        doc = f"The input stream for this block. Named {self.__data_in_stream}"
        return None
   
   # This is a placeholder method that should be overridden by any subclass.
    def action(self):
        doc = """Perform the action of this block."""
        return None
        
    # This is a placeholder method that should be overridden by any subclass.
    def outStream(self):
        if self.__data_out_stream is None:
            raise NoDataAvailable
        else:
            return self.__data_out_stream
    
    def getType(self):
        return self.__type

    def setType(self, source):
        self.__type = source

    def getData_in_stream(self):
        return self.__data_in_stream
    
    def setData_in_stream(self, data):
        self.__data_in_stream = data
    
    def _saveToOutstream(self, data):
        self.__data_out_stream = {"source": self.__type, "data":data}
     
