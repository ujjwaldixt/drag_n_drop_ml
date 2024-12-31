from model.component_block import Block
import os
import json
import pickle

class SaveOutput(Block):
    def __init__(self, type=None, data_in_stream=None):
        super().__init__(type, data_in_stream)
    
    def action(self, file_name, location = None):
        with open("config.json") as f:
            config = json.load(f)

        to_save = self.getData_in_stream()["data"]
        source = self.getData_in_stream()["source"]

        if type(to_save) is tuple:
            j = 0
            for i in to_save:
                if source == config["types"][-2]:
                    if location is not None:
                        final_location = (os.path.join(location, f"{file_name}_{j}.sav"))
                        pickle.dump(i, open(final_location, 'wb'))
                    else:
                        pickle.dump(i, open(f"{file_name}_{j}", 'wb'))
                else:
                    if location is not None:
                        final_location = (os.path.join(location, f"{file_name}_{j}.csv"))
                        i.to_csv(final_location)
                    else:
                        i.to_csv(f"{file_name}_{j}.csv")
                j+=1

        else:
            if source == config["types"][-2]:
                if location is not None:
                    final_location = (os.path.join(location, f"{file_name}.sav"))
                    pickle.dump(to_save, open(final_location, 'wb'))
                else:
                    pickle.dump(to_save, open(f"{file_name}.sav", 'wb'))
            else:
                if location is not None:
                    final_location = (os.path.join(location, f"{file_name}.csv"))
                    to_save.to_csv(final_location)
                else:
                    to_save.to_csv(f"{file_name}.csv")