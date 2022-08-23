import axios from 'axios'

class UegenioApi {

    api = axios.create({
        baseURL: 'http://localhost:5001'
    })


    async getClassrooms(filter: any) {


        const result = await this.api({
            method: 'get',
            url: '/classrooms',
            data: {
                ...filter
            }
        });

        return result;
    }

}

export { UegenioApi }