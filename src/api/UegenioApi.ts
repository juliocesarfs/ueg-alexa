import axios from 'axios'

class UegenioApi {

    api = axios.create({
        baseURL: 'http://localhost:8081/modelo-api/api/v1'
    })


    async getClassrooms(filter: any) {
        let result;

        try {
            result = await this.api({
                method: 'get',
                url: '/classroom/filtro',
                params: {
                    ...filter
                },
                validateStatus: () => true
            });
        } catch (e) {

        }

        return result.data;
    }

    async getStudent(alexaID: string) {
        let result;
        try {
            result = await this.api({
                method: 'get',
                url: `/student/`,
                data: {
                    alexaID
                }
            });
        } catch (e) {

        }

        return result.data;
    }

    async registerUsersClassrooms(dataToSave: any) {
        let result;
        try {
            result = await this.api({
                method: 'put',
                url: `/student/addClass/`,
                data: {
                    ...dataToSave
                }
            });
        } catch (e) {
            console.log(e)
            throw new Error('Disciplina não encontrada');

        }

        return result.data;
    }




    async registerUser(alexaID: string) {
        const result = await this.api({
            method: 'post',
            url: '/student/',
            data: {
                alexaID
            }
        });

        return result;
    }

    async deleteClass(filter: any) {
        let result;
        try {
            result = await this.api({
                method: 'delete',
                url: '/studentsClassrooms/',
                data: {
                    ...filter
                }
            });
        } catch (e) {
            throw new Error('Disciplina não encontrada');
        }

        return result.data;
    }

    async getSubjectSolicitation(filter: any) {
        const result = await this.api({
            method: 'get',
            url: "/users",
            data: {
                ...filter
            }
        });

        return result;
    }

}

export { UegenioApi }