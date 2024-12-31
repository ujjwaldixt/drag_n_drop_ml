from model.component_block import Block

class GroupBlocks:
    def __init__(self, list_of_blocks, list_of_links):
        self.list_of_blocks = list_of_blocks
        self.list_of_links = list_of_links
    
    def group(self) -> Block:
        pass

    def ungroup(self):
        pass
    