import http from "../http-common";

const getAll = () => {
    return http.get("/recettes");
};


const create = data => {
    return http.post("/receipts", data);
};




const ReceiptsService = {
    getAll,
    create,
};

export default ReceiptsService;