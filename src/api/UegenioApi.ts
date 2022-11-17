import axios from 'axios'

class UegenioApi {

    api = axios.create({
        baseURL: 'http://localhost:4444'
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

    async registerClass(filter: any) {
        const result = await this.api({
            method: 'post',
            url: '/users',
            data: {
                ...filter
            }
        });

        return result;
    }

}

export { UegenioApi }