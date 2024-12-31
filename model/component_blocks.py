from model.component_block import Block

class Blocks:
    def __init__(self):
        self.__list_of_blocks = []
    
    def addBlocks(self, block : Block) -> None:
        self.__list_of_blocks.append(block)
    
    def getNumberOfBlocks(self) -> int:
        return len(self.__list_of_blocks)
    
    def removeBlocks(self, block: Block) -> None:
        self.__list_of_blocks.remove(block)
    
    def removeBlocksByIndex(self, index) -> None:
        self.__list_of_blocks.pop(index)
        
    # Returns the list of blocks in this class
    def getListOfBlocks(self)->list:
        return self.__list_of_blocks
    
    
    