class NoDataAvailable(Exception):
    def __init__(self, message="There is no data available to send through the output stream") -> None:
        super().__init__(message)