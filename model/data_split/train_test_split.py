from model.component_block import Block
from sklearn.model_selection import train_test_split

class TrainTestSplit(Block):
    def __init__(self, type=None, data_in_stream=None):
        super().__init__(type, data_in_stream)
        # self.columns = []
    
    def action(self, output_col, split_size):
        data = self.getData_in_stream()["data"]
        # self.columns = list(data.columns)

        y = data[output_col]
        df = data
        df.drop(output_col, axis=1, inplace=True)
        
        X = df
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=split_size, random_state=42)
        self._saveToOutstream({"X_train": X_train, "X_test": X_test, "y_train": y_train, "y_test": y_test})
        
        return super().action()
    