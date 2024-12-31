from model.Link import Link

class Links:
    def __init__(self):
        self.__links = []
    
    def addLink(self, link : Link) -> None:
        self.__links.append(link)
    
    def removeLink(self, link: Link) -> None:
        self.__links.remove(link)
    
    def removeLinksByIndex(self, index):
        self.__links.pop(index)
    
    def getListofLinks(self):
        return self.__links
    
    def getNumberOfLinks(self):
        return len(self.__links)