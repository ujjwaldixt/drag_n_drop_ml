from model.component_block import Block
import xgboost as xgb

class BuildModel(Block):
    def __init__(self, type=None, data_in_stream=None):
        super().__init__(type, data_in_stream)
    
    def action(self, model_name):
        X_train, y_train = self.getData_in_stream()["data"]
        #TODO: write if statements to pick a model based on a precurated list of models
        
        model = None
        if model_name == "Random Forest":
            model = xgb.XGBRegressor(n_estimators=1000, max_depth=7, eta=0.1, subsample=0.7, colsample_bytree=0.8)
            model.fit(X_train, y_train)
        
        self._saveToOutstream(model)

    