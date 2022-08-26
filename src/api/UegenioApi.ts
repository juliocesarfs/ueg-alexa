import axios from 'axios'

class UegenioApi {

    api = axios.create({
        baseURL: 'https://uegenio-api.herokuapp.com'
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