class ApiResponse{
    constructor(success, message = "Ok", data ){
        this.success = success;
        this.message = message;
        this.data = data;

    }
}

export default ApiResponse;