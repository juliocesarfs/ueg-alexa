import axios from "axios";

class ApiService {

    private api = axios.create({
        baseURL: 'http://localhost:5001'
    })

    async getSubjectByFilter(filter: any) {
        const result = await this.api.post('/classrooms', {
            ...filter
        });

        console.log(result);

        return result;
    }

}

export { ApiService };