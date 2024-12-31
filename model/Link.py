from model.component_block import Block

class Link:
    def __init__(self, fromBlock:Block, toBlock:Block):
        self.fromBlock = fromBlock
        self.toBlock = toBlock
        self.linked_blocks = {"from": None, "to": None}
    
    def connect(self, source, data):
        self.toBlock.setType(source)
        self.toBlock.setData_in_stream(data)
        self.linked_blocks["from"] = self.fromBlock
        self.linked_blocks["to"] =  self.toBlock
    
    def disconnect(self):
        self.linked_blocks = {}
    
    